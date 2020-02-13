import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionEspaciosRoutingModule } from './asignacion-espacios-routing.module';
import { AsignacionEspaciosComponent } from './asignacion-espacios.component';
import { SharedModule } from '../../../shared/shared.module';
import { AsignacionEspaciosFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [AsignacionEspaciosComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    AsignacionEspaciosRoutingModule
  ],
  providers: [
    AsignacionEspaciosFacade
  ]
})
export class AsignacionEspaciosModule { }
