import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanAcademicoComponent } from './plan-academico.component';
import { TYPES } from '../../../shared/utils';

const routes: Routes = [
  {
    path: '',
    component: PlanAcademicoComponent,
    data: {
      ...TYPES.PLAN_ACADEMICO,
      permissions: [TYPES.PLAN_ACADEMICO.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanAcademicoRoutingModule { }
