import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardGuard } from '../shared';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Inicio'
    },
    canActivate: [DashboardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
