import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ObGridModule } from '../../../shared/ob-grid.module';
import { MenuComponent } from './menu.component';
import { MenuFacade, MenuRecursoFacade } from '../../facade';
import { VistaArbolComponent } from './vista-arbol/vista-arbol.component';
import { ObTreeModule } from '../../../shared/ob-tree.module';
import { AsociacionRecursosComponent } from './asociacion-recursos/asociacion-recursos.component';

@NgModule({
  declarations: [
    MenuComponent,
    VistaArbolComponent,
    AsociacionRecursosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    MenuRoutingModule,
    ObTreeModule
  ],
  providers: [
    MenuFacade,
    MenuRecursoFacade
  ]
})
export class MenuModule { }
