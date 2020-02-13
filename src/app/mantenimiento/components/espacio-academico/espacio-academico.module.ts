import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspacioAcademicoRoutingModule } from './espacio-academico-routing.module';
import { EspacioAcademicoComponent } from './espacio-academico.component';
import { SharedModule } from '../../../shared/shared.module';
import { EspacioAcademicoFacade,MultitabDetFacade,MultitabCabFacade  } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [EspacioAcademicoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    EspacioAcademicoRoutingModule
  ],
  providers: [
    EspacioAcademicoFacade,
    MultitabDetFacade,
    MultitabCabFacade,
  ]
})
export class EspacioAcademicoModule { }
