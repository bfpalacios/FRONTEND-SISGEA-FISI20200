import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanAcademicoRoutingModule } from './plan-academico-routing.module';
import { PlanAcademicoComponent } from './plan-academico.component';
import { SharedModule } from '../../../shared/shared.module';
import { PlanAcademicoFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [PlanAcademicoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    PlanAcademicoRoutingModule
  ],
  providers: [
    PlanAcademicoFacade
  ]
})
export class PlanAcademicoModule { }
