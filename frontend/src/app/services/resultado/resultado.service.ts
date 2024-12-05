import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ResultadoProviderService } from '../providers/resultado/resultado-provider.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  setGroupFilter$ = new Subject<any>();
  getGroupFilter = this.setGroupFilter$.asObservable();

  constructor(private provider: ResultadoProviderService) { }

  fetchResultados({ nome, sobrenome, sexo, nivelSintoma, data, dataAte, tipo }: any): Observable<any> {
    const params = new HttpParams()
      .set('nome', nome ? nome.toString() : '').set('sobrenome', sobrenome? sobrenome.toString(): '').set('sexo', sexo? sexo.toString() : '')
      .set('nivel', nivelSintoma? nivelSintoma.toString() : '').set('date', data? data.toString() : '').set('date_to', dataAte? dataAte.toString() : '')
      .set('type', tipo? tipo.toString() : '')
    return this.provider.listResultados(params);
  }
}
