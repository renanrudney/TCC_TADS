import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  form: FormGroup = {} as FormGroup;
  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  searchText: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      nome: new FormControl(''),
      sobrenome: new FormControl(''),
      sexo: new FormControl(''),
      nivelSintoma: new FormControl(''),
      realizado: new FormControl('', [this.realizadoValidator]),
      realizadoAte: new FormControl('', [this.realizadoValidator])
    });
  }

  private realizadoValidator(control: AbstractControl) {
    if (control.parent) {
      let _fromDate = (<FormGroup>control.parent).get("realizado")?.value;
      let _toDate = (<FormGroup>control.parent).get("realizadoAte")?.value;

      if (_fromDate && _toDate) {
        if (_fromDate >= _toDate) {
          control.parent.get("realizado")?.setErrors({ Datecompare: true });
          control.parent.get("realizadoAte")?.setErrors({ Datecompare: true });
          return { Datecompare: true };
        }
        control.parent.get("realizado")?.setErrors(null);
        control.parent.get("realizadoAte")?.setErrors(null);
        return null;
      }

      control.parent.get("realizado")?.setErrors(null);
      control.parent.get("realizadoAte")?.setErrors(null);
      return null
    }
    return null
  }

  search(filters: any): void {
    if(!this.form.valid) {
      return
    }

    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }
}
