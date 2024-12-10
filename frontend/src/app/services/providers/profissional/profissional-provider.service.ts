import { inject, Injectable } from '@angular/core';
import { HttpProviderService } from '../http/http-provider.service';
import { baseUrl } from '../../../config/api';
import { Observable } from 'rxjs';

const apiUrl = {
  profissionais: baseUrl + "/profissionais",
};

@Injectable({
  providedIn: 'root'
})
export class ProfissionalProviderService {

  apiService = inject(HttpProviderService); // Injeta o HttpProviderService

  constructor() {}

  // Método para listar todos os profissionais
  public listProfissionais(): Observable<any> {
    return this.apiService.get(apiUrl.profissionais); // Utiliza o método get do HttpProviderService
  }

  // Método para pegar um profissional pelo ID
  public getProfissionalById(id: any): Observable<any> {
    return this.apiService.get(apiUrl.profissionais + '/' + id); // Utiliza o método get do HttpProviderService
  }

  // Método para criar um novo profissional
  public createProfissional(profissionalData: any): Observable<any> {
    return this.apiService.post(apiUrl.profissionais, profissionalData); // Utiliza o método post do HttpProviderService
  }

  // Método para excluir um profissional
  public deleteProfissional(id: number): Observable<any> {
    return this.apiService.delete(`${apiUrl.profissionais}/${id}`);
  }


  // Não é necessário implementar um método 'post' manualmente aqui, pois o HttpProviderService já faz isso
}
