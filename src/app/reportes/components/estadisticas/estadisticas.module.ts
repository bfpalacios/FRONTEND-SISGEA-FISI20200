import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { EstadisticasComponent } from './estadisticas.component';
import { SharedModule } from '../../../shared/shared.module';
//import { EstadisticasFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [EstadisticasComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    EstadisticasRoutingModule
  ],
  providers: [
    //EstadisticasFacade
  ]
})
export class EstadisticasModule { }
