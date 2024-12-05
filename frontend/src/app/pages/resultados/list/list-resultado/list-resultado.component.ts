import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ResultadoService } from '../../../../services/resultado/resultado.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../../../pipes/filter.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-resultado',
  imports: [CommonModule, RouterModule, FilterPipe],
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
    const filteredParams = {
      nome: filters.nome, sobrenome: filters.sobrenome, sexo: filters.sexo,
      nivelSintoma: filters.nivelSintoma, tipo: filters.tipo,
      data: filters.realizado, dataAte: filters.realizadoAte,
    }

    this.loadResultados(filteredParams)
  }

  public formatTipo(tipo: string) {
    switch (tipo) {
      case "hitpoint":
        return 'Hit the Point'
      case "up_down_arm":
        return 'Up Down Arm'
      case "heel_rise":
        return 'Heel Rise'
      default:
        return ''
    }
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
