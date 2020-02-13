import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { LoginGuard } from '../shared/services/guards';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Iniciar sesión'
    },
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
