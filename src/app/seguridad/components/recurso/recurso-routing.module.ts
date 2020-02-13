import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursoComponent } from './recurso.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: RecursoComponent,
    data: {
      ...TYPES.RECURSO,
      permissions: [TYPES.RECURSO.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursoRoutingModule { }
