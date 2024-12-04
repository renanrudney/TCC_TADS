import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ProfissionalComponent } from './pages/profissional/profissional.component';
import { authGuard } from './auth/auth.guard';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ViewResultadoComponent } from './pages/resultados/view/view-resultado/view-resultado.component';
import { CreateProfissionalComponent } from './pages/profissional/create/create-profissional/create-profissional.component';
import { TestComponent } from './pages/resultados/test/test.component';

export const routes: Routes = [
  { path: '', redirectTo: '/resultados', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'resultados', component: ResultadosComponent, canActivate: [authGuard] },
  { path: 'resultados/:resultadoId/tipo/:tipo', component: ViewResultadoComponent, canActivate: [authGuard] },
  { path: 'profissional', component: ProfissionalComponent, canActivate: [authGuard] },
  { path: 'create-profissional', component: CreateProfissionalComponent },
  { path: 'test', component: TestComponent }
];
