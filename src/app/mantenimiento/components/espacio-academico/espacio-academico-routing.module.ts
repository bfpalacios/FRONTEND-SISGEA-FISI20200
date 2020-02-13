import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EspacioAcademicoComponent } from './espacio-academico.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: EspacioAcademicoComponent,
    data: {
      ...TYPES.ESPACIO_ACADEMICO,
      permissions: [TYPES.ESPACIO_ACADEMICO.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspacioAcademicoRoutingModule { }
