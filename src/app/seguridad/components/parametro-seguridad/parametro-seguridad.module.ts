import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ParametroSeguridadRoutingModule} from './parametro-seguridad-routing.module';
import {ParametroSeguridadComponent} from './parametro-seguridad.component';
import {SharedModule} from "../../../shared/shared.module";
import {ParametroSeguridadFacade} from "../../facade";
import { ObGridModule } from '../../../shared/ob-grid.module';


@NgModule({
  declarations: [ParametroSeguridadComponent],
  imports: [
    CommonModule,
    ParametroSeguridadRoutingModule,
    SharedModule,
    ObGridModule,
  ],
  providers: [ParametroSeguridadFacade]
})
export class ParametroSeguridadModule {
}
