import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { baseUrl } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);

  constructor() {}

  registro(data: any) {
    return this.httpClient.post(`${baseUrl}/registro`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${baseUrl}/login`, data)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
      }));
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    console.log(localStorage.getItem('authUser'))
    return localStorage.getItem('authUser') !== null;
  }
}
