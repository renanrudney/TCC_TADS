import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { baseUrl } from '../config/api';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);
  private loggedIn = new BehaviorSubject<boolean>(false)

  get isLoggedIn$() {
    this.loggedIn.next(this.isLoggedIn())
    return this.loggedIn.asObservable()
  }
  constructor() {}

  registro(data: any) {
    return this.httpClient.post(`${baseUrl}/registro`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${baseUrl}/login`, data)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
        this.loggedIn.next(true)
      }));
  }

  logout() {
    localStorage.removeItem('authUser');
    this.loggedIn.next(false)
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
}
