import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadisticasComponent } from './estadisticas.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: EstadisticasComponent,
    data: {
      ...TYPES.ESTADISTICAS,
      permissions: [TYPES.ESTADISTICAS.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticasRoutingModule { }
