import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultitabCabComponent } from './multitab-cab.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: MultitabCabComponent,
    data: {
      ...TYPES.MULTITAB_CAB,
      permissions: [TYPES.MULTITAB_CAB.resource, TYPES.MULTITAB_DET.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultitabCabRoutingModule { }
