import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../config/api';
import { HttpProviderService } from '../http/http-provider.service';

const apiUrl = {
  resultados: baseUrl + "/resultados",
}

@Injectable({
  providedIn: 'root'
})
export class ResultadoProviderService {
  apiService = inject(HttpProviderService)
  constructor() { }

  public listResultados(): Observable<any> {
    return this.apiService.get(apiUrl.resultados)
  }

  public getResultadoById(id: any): Observable<any> {
    return this.apiService.get(apiUrl.resultados + '/' + id);
  }
}
