import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudEspaciosRoutingModule } from './solicitud-espacios-routing.module';
import { SolicitudEspaciosComponent } from './solicitud-espacios.component';
import { SharedModule } from '../../../shared/shared.module';
import { SolicitudEspaciosFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';
import { ObDatepickerModule } from '../../../shared/ob-datepicker.module';
import { MultitabDetFacade, MultitabCabFacade } from '../../../mantenimiento/facade';
import { ObTimePickerModule } from '../../../shared/ob-timepicker.module';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  declarations: [SolicitudEspaciosComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    ObDatepickerModule,
    SolicitudEspaciosRoutingModule,
    ObTimePickerModule,
    PopoverModule.forRoot(),
  ],
  providers: [
    SolicitudEspaciosFacade,
    MultitabDetFacade,
    MultitabCabFacade
  ]
})
export class SolicitudEspaciosModule { }
