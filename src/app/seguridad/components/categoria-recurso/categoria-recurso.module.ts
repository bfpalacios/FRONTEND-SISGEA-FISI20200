import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriaRecursoRoutingModule} from './categoria-recurso-routing.module';
import {CategoriaRecursoComponent} from './categoria-recurso.component';
import {SharedModule} from "../../../shared/shared.module";
import {CategoriaRecursoFacade} from "../../facade";
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [CategoriaRecursoComponent],
  imports: [
    CommonModule,
    ObGridModule,
    CategoriaRecursoRoutingModule,
    SharedModule
  ],
  providers: [CategoriaRecursoFacade]
})
export class CategoriaRecursoModule {
}
