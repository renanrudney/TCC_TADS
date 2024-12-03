import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Importação necessária
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-profissional',
  imports: [
    CommonModule,
    ReactiveFormsModule, // Certifique-se de importar aqui
  ],
  templateUrl: './create-profissional.component.html',
  styleUrl: './create-profissional.component.css'
})
export class CreateProfissionalComponent {
signupForm: any;
onSubmit: any;
constructor(private route: ActivatedRoute) {}

}
