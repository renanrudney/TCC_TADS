import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ResultadoService } from '../../../../services/resultado/resultado.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../../../pipes/filter.pipe';

@Component({
  selector: 'app-list-resultado',
  imports: [CommonModule, FilterPipe],
  templateUrl: './list-resultado.component.html',
  styleUrl: './list-resultado.component.css'
})
export class ListResultadoComponent implements OnChanges {
  @Input() groupFilters: Object = {};
  @Input() searchByKeyword: string = '';

  resultados: any[] = [];
  filteredResultados: any[] = [];
  constructor(private resultadoService: ResultadoService, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadResultados();
  }
  ngOnChanges(): void {
    if (this.groupFilters) this.filterResultadoList(this.groupFilters);
  }

  filterResultadoList(filters: any): void {
    // if (Object.keys(filters).length === 0)
    //   return
    
    console.log('filtrando')
    console.log(filters)
    // if (filters)
    // this.loadResultados()
    const filteredParams = {
      nome: filters.nome, sobrenome: filters.sobrenome, sexo: filters.sexo,
      nivelSintoma: filters.nivelSintoma,
      data: filters.realizado, dataAte: filters.realizadoAte,
    }

    this.loadResultados(filteredParams)
  }

  loadResultados(params?: {}): void {
    const filterParams = params || {}
    this.resultadoService.fetchResultados(filterParams)
      .subscribe(data => {
        if (data != null && data.records != null) {
          var resultData = data.records;
          if (resultData) {
            this.resultados = resultData;
            this.filteredResultados = resultData;
            console.log(resultData)
          }
        }
      },
      (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.resultados = [];
              this.filteredResultados = [];
            }
          }
        }
      });
  }
}
