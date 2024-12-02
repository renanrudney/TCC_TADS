import { inject, Injectable } from '@angular/core';
import { HttpProviderService } from '../http/http-provider.service';
import { baseUrl } from '../../../config/api';
import { Observable } from 'rxjs';

const apiUrl = {
  profissionais: baseUrl + "/profissionais",
}

@Injectable({
  providedIn: 'root'
})
export class ProfissionalProviderService {
  apiService = inject(HttpProviderService)
  constructor() { }

  public listProfissionais(): Observable<any> {
    return this.apiService.get(apiUrl.profissionais)
  }

  public getProfissionalById(id: any): Observable<any> {
    return this.apiService.get(apiUrl.profissionais + '/' + id);
  }
}
