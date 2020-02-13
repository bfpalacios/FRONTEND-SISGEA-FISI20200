import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TipoAutenticacionRoutingModule} from './tipo-autenticacion-routing.module';
import {TipoAutenticacionComponent} from './tipo-autenticacion.component';
import {SharedModule} from "../../../shared/shared.module";
import {TipoAutenticacionFacade} from "../../facade";
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [TipoAutenticacionComponent],
  imports: [
    CommonModule,
    TipoAutenticacionRoutingModule,
    SharedModule,
    ObGridModule,
  ],
  providers: [TipoAutenticacionFacade]
})
export class TipoAutenticacionModule {
}
