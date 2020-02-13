import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleHorarioComponent } from './detalle-horario.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: DetalleHorarioComponent,
    data: {
      ...TYPES.DETALLE_HORARIO,
      permissions: [TYPES.DETALLE_HORARIO.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleHorarioRoutingModule { }
