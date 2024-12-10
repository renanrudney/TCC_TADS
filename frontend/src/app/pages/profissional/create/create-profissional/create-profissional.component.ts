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
      email: ['', [Validators.required, Validators.email]],
      nascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      tipo_registro: ['', Validators.required],
      registro: ['', Validators.required],
      especialidade: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const profissionalData = this.signupForm.value;
      this.httpProvider.createProfissional(profissionalData).subscribe(
        (response: any) => {
          console.log('Profissional cadastrado com sucesso:', response);
          this.router.navigate(['/profissionais']);
        },
        (error: any) => {
          console.error('Erro ao cadastrar profissional:', error);
          console.log('Detalhes do erro:', error.error); // Exibe detalhes do erro
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }
}
