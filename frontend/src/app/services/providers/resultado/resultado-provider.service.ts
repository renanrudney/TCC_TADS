import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../config/api';
import { HttpProviderService } from '../http/http-provider.service';
import { HttpParams } from '@angular/common/http';

const apiUrl = {
  resultados: baseUrl + "/resultados",
}

function urlByTipo(tipo: string) {
  console.log(tipo)
  switch (tipo) {
    case 'up_down_arm':
      return baseUrl + '/up_down_arm_resultados'
    case 'heel_rise':
      return baseUrl + '/heel_rise_resultados'
    default:
      return baseUrl + '/hitpoint_resultados'
  }
}

@Injectable({
  providedIn: 'root'
})
export class ResultadoProviderService {
  apiService = inject(HttpProviderService)
  constructor() { }

  public listResultados(params?: HttpParams): Observable<any> {
    return this.apiService.get(apiUrl.resultados, params)
  }

  public getResultadoByIdTipo(id: any, tipo: any): Observable<any> {
    console.log(urlByTipo(tipo) + '/' + id)
    return this.apiService.get(urlByTipo(tipo) + '/' + id);
  }
}
