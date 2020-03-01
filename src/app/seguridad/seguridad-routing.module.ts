import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../shared";

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'usuarios',
        loadChildren: './components/usuario/usuario.module#UsuarioModule'
      },
      {
        path: 'perfiles',
        loadChildren: './components/perfil/perfil.module#PerfilModule'
      },
      {
        path: 'recursos',
        loadChildren: './components/recurso/recurso.module#RecursoModule'
      },
      {
        path: 'permisos',
        loadChildren: './components/permisos/permisos.module#PermisosModule'
      },
      {
        path: '', redirectTo: 'usuarios', pathMatch: 'full'
      }
    ],
    data: {
      title: 'Seguridad'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule {
}
