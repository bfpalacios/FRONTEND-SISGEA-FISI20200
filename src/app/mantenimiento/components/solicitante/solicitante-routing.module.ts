import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitanteComponent } from './solicitante.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: SolicitanteComponent,
    data: {
      ...TYPES.SOLICITANTE,
      permissions: [TYPES.SOLICITANTE.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitanteRoutingModule { }
