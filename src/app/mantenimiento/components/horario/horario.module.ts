import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorarioRoutingModule } from './horario-routing.module';
import { HorarioComponent } from './horario.component';
import { SharedModule } from '../../../shared/shared.module';
import { HorarioFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [HorarioComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    HorarioRoutingModule
  ],
  providers: [
    HorarioFacade
  ]
})
export class HorarioModule { }
