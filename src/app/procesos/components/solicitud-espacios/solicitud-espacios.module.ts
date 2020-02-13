import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudEspaciosRoutingModule } from './solicitud-espacios-routing.module';
import { SolicitudEspaciosComponent } from './solicitud-espacios.component';
import { SharedModule } from '../../../shared/shared.module';
import { SolicitudEspaciosFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';
import { ObDatepickerModule } from '../../../shared/ob-datepicker.module';
import { MultitabDetFacade, MultitabCabFacade } from '../../../mantenimiento/facade';

@NgModule({
  declarations: [SolicitudEspaciosComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    ObDatepickerModule,
    SolicitudEspaciosRoutingModule
  ],
  providers: [
    SolicitudEspaciosFacade,
    MultitabDetFacade,
    MultitabCabFacade
  ]
})
export class SolicitudEspaciosModule { }
