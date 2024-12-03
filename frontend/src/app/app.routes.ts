import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ProfissionalComponent } from './pages/profissional/profissional.component';
import { authGuard } from './auth/auth.guard';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ViewResultadoComponent } from './pages/resultados/view/view-resultado/view-resultado.component';

export const routes: Routes = [
  { path: '', redirectTo: '/resultados', pathMatch: 'full' },
  { path: '', component: ProfissionalComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'profissional', component: ProfissionalComponent, canActivate: [authGuard] },
  { path: 'resultados', component: ResultadosComponent, canActivate: [authGuard] },
  { path: 'resultados/:resultadoId/tipo/:tipo', component: ViewResultadoComponent, canActivate: [authGuard] },
];
