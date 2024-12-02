import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ProfissionalProviderService } from '../../services/providers/profissional/profissional-provider.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profissional',
  imports: [CommonModule],
  templateUrl: './profissional.component.html',
  styleUrl: './profissional.component.css'
})
export class ProfissionalComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  httpProvider = inject(ProfissionalProviderService)

  profissionaisList: any = []

  ngOnInit(): void {
    this.listProfissionais();
  }

  public logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async listProfissionais() {
    this.httpProvider.listProfissionais().subscribe((data : any) => {
      if (data != null && data.records != null) {
        var resultData = data.records;
        if (resultData) {
          console.log(resultData)
          this.profissionaisList = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.profissionaisList = [];
            }
          }
        }
      });
  }
}
