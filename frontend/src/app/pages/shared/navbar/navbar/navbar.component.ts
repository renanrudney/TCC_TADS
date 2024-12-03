import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  authService: AuthService  = inject(AuthService)
  isLoggedIn: Observable<boolean> = this.authService.isLoggedIn$;

  public activePath = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn$;
  }

  onSelectPath(newPath: string) {
    this.activePath = newPath;
    console.log(this.activePath)
  }
}
