import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompensacionComponent } from './compensacion.component';
import { TYPES } from '../../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: CompensacionComponent,
    data: {
      ...TYPES.COMPENSACION,
      permissions: [TYPES.COMPENSACION.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompensacionRoutingModule { }
