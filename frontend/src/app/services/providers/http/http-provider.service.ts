import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  private httpClient = inject(HttpClient)
  token: string;

  constructor() {
    this.token = this.getToken()
  }

  private getToken(): string {
    console.log(JSON.parse(localStorage.getItem('authUser') as string).token)
    return JSON.parse(localStorage.getItem('authUser') as string).token
  }

  get(url: string, params?: HttpParams): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      }),
      params: params,
      observe: "response" as 'body'
    };
    return this.httpClient.get(
      url,
      httpOptions,
    )
    .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
    );
  }

  post(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), 
      observe: "response" as 'body'
    };
    return this.httpClient.post(
      url,
      model,
      httpOptions)
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      
    );
  }
  
  private ReturnResponseData(response: any) {
    return response.body;
  }
  
  private handleError(error: any) {
    return throwError(error);
  }
}
