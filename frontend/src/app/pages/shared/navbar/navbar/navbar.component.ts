import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  authService: AuthService  = inject(AuthService)
  isLoggedIn: Observable<boolean> = this.authService.isLoggedIn$;

  constructor() {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn$;
  }
}
