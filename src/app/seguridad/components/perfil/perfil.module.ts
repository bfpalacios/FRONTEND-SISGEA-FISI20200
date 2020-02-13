import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { PerfilFacade, PerfilMenuRecursoFacade } from '../../facade';
import { SharedModule } from '../../../shared/shared.module';
import { ObGridModule } from '../../../shared/ob-grid.module';
import { GestionPermisosComponent } from './gestion-permisos/gestion-permisos.component';
import { ObTreeModule } from '../../../shared/ob-tree.module';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    PerfilComponent,
    GestionPermisosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    ObTreeModule,
    PerfilRoutingModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [
    PerfilFacade,
    PerfilMenuRecursoFacade
  ]
})
export class PerfilModule { }
