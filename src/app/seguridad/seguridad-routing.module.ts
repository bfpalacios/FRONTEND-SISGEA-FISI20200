import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../shared/services/guards";

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
        path: 'parametros-seguridad',
        loadChildren: './components/parametro-seguridad/parametro-seguridad.module#ParametroSeguridadModule'
      },
      {
        path: 'tipos-autenticaciones',
        loadChildren: './components/tipo-autenticacion/tipo-autenticacion.module#TipoAutenticacionModule'
      },

      {
        path: 'categorias-recursos',
        loadChildren: './components/categoria-recurso/categoria-recurso.module#CategoriaRecursoModule'
      },
      {
        path: 'sistemas',
        loadChildren: './components/sistema/sistema.module#SistemaModule'
      },
      {
        path: 'recursos',
        loadChildren: './components/recurso/recurso.module#RecursoModule'
      },
      {
        path: 'menus',
        loadChildren: './components/menu/menu.module#MenuModule'
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
