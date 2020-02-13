import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitanteRoutingModule } from './solicitante-routing.module';
import { SolicitanteComponent } from './solicitante.component';
import { SharedModule } from '../../../shared/shared.module';
import { SolicitanteFacade,MultitabDetFacade,MultitabCabFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [SolicitanteComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    SolicitanteRoutingModule
  ],
  providers: [
    SolicitanteFacade,
    MultitabDetFacade,
    MultitabCabFacade,  ]
})
export class SolicitanteModule { }
