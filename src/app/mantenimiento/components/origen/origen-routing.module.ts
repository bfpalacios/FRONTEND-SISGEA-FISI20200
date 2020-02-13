import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrigenComponent } from './origen.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: OrigenComponent,
    data: {
      ...TYPES.ORIGEN,
      permissions: [TYPES.ORIGEN.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrigenRoutingModule { }
