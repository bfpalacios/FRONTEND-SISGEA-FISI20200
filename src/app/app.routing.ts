import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import from shared
import { LayoutComponent,
  P404Component,
  P500Component,
  AuthGuard
} from './shared';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      /*{
        path: 'dashborad',
        loadChildren: './dashborad/dashboard.module#DashboardModule',
        //canActivate: [AuthGuard]
      },*/
      {
        path: 'mantenimiento',
        loadChildren: './mantenimiento/mantenimiento.module#MantenimientoModule',
        //canActivate: [AuthGuard]
      },
      {
        path: 'consulta',
        loadChildren: './consultas/consulta.module#ConsultaModule',
        //canActivate: [AuthGuard]
      },
      {
        path: 'procesos',
        loadChildren: './procesos/procesos.module#ProcesosModule',
        //canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Error 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Error 500'
    }
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
