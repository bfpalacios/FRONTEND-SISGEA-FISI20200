import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermisosComponent } from './permisos.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: PermisosComponent,
    data: {
      ...TYPES.ASIG_PERMIS,
      permissions: [TYPES.ASIG_PERMIS.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisosRoutingModule { }
