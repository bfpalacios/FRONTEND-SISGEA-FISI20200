import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramacionAcademicaComponent } from './programacion-academica.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: ProgramacionAcademicaComponent,
    data: {
      ...TYPES.PROGRAMACION_ACADEMICA,
      permissions: [TYPES.PROGRAMACION_ACADEMICA.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramacionAcademicaRoutingModule { }
