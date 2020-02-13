import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudEspaciosComponent } from './solicitud-espacios.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: SolicitudEspaciosComponent,
    data: {
      ...TYPES.SOLI_ESPACIOS,
      permissions: [TYPES.SOLI_ESPACIOS.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudEspaciosRoutingModule { }
