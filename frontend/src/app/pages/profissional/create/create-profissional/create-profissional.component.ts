import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfissionalProviderService } from '../../../../services/providers/profissional/profissional-provider.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-create-profissional',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-profissional.component.html',
  styleUrls: ['./create-profissional.component.css']
})
export class CreateProfissionalComponent {
  signupForm!: FormGroup;

  successMessage: string | null = null; // Para mensagem de sucesso
  errorMessage: string | null = null; // Para mensagem de erro

  authService = inject(AuthService);
  httpProvider = inject(ProfissionalProviderService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signupForm = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      login: ['', Validators.required],
      nascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      tipo_registro: ['', Validators.required],
      registro: ['', Validators.required],
      especialidade: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const profissionalData = this.signupForm.value;

      this.httpProvider.createProfissional(profissionalData).subscribe(
        (response: any) => {
          this.successMessage = 'Profissional cadastrado com sucesso!';
          this.errorMessage = null; // Limpa a mensagem de erro, se existir
          this.signupForm.reset(); // Limpa o formulário
        },
        (error: any) => {
          this.errorMessage = 'Erro ao cadastrar profissional. Tente novamente.';
          this.successMessage = null; // Limpa a mensagem de sucesso, se existir
          console.error('Detalhes do erro:', error.error);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }
}
