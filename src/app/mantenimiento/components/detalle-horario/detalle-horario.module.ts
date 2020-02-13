import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleHorarioRoutingModule } from './detalle-horario-routing.module';
import { DetalleHorarioComponent } from './detalle-horario.component';
import { SharedModule } from '../../../shared/shared.module';
import { DetalleHorarioFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [DetalleHorarioComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    DetalleHorarioRoutingModule
  ],
  providers: [
    DetalleHorarioFacade
  ]
})
export class DetalleHorarioModule { }
