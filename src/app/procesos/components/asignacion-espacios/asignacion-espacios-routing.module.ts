import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignacionEspaciosComponent } from './asignacion-espacios.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: AsignacionEspaciosComponent,
    data: {
      ...TYPES.ASIG_ESPACIOS,
      permissions: [TYPES.ASIG_ESPACIOS.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionEspaciosRoutingModule { }
