import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { SharedModule } from "../../../shared/shared.module";
import { UsuarioFacade } from "../../facade";
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    ObGridModule,
  ],
  providers: [
    UsuarioFacade
  ]
})
export class UsuarioModule {
}
