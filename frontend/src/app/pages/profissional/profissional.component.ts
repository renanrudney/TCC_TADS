import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ProfissionalProviderService } from '../../services/providers/profissional/profissional-provider.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profissional',
  imports: [CommonModule, RouterModule],
  templateUrl: './profissional.component.html',
  styleUrl: './profissional.component.css'
})
export class ProfissionalComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  httpProvider = inject(ProfissionalProviderService);

  profissionaisList: any = [];

  ngOnInit(): void {
    this.listProfissionais();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async listProfissionais() {
    this.httpProvider.listProfissionais().subscribe(
      (data: any) => {
        if (data != null && data.records != null) {
          this.profissionaisList = data.records;
        }
      },
      (error: any) => {
        console.error('Erro ao listar profissionais:', error);
        this.profissionaisList = [];
      }
    );
  }

  public deleteProfissional(id: number): void {
    if (confirm('Você tem certeza que deseja excluir este profissional?')) {
      this.httpProvider.deleteProfissional(id).subscribe(
        () => {
          // Remove o profissional da lista
          this.profissionaisList = this.profissionaisList.filter((profissional: any) => profissional.id !== id);
          console.log('Profissional excluído com sucesso!');
        },
        (error: any) => {
          console.error('Erro ao excluir o profissional:', error);
          alert('Não foi possível excluir o profissional. Tente novamente mais tarde.');
        }
      );
    }
  }
}

