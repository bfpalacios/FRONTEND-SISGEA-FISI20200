import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SistemaRoutingModule} from './sistema-routing.module';
import {SistemaComponent} from './sistema.component';
import {SharedModule} from "../../../shared/shared.module";
import {SistemaFacade} from "../../facade";
import { ObGridModule } from '../../../shared/ob-grid.module';
import { ObTimePickerModule } from '../../../shared/ob-timepicker.module';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  declarations: [SistemaComponent],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    SharedModule,
    ObGridModule,
    PopoverModule.forRoot(),
    ObTimePickerModule
  ],
  providers: [SistemaFacade]
})
export class SistemaModule {
}
