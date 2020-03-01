import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisosRoutingModule } from './permisos-routing.module';
import { PermisosComponent } from './permisos.component';
import { PerfilRecursoFacade, PerfilUsuarioFacade } from '../../facade';
import { SharedModule } from '../../../shared/shared.module';
import { ObGridModule } from '../../../shared/ob-grid.module';
import { ObTreeModule } from '../../../shared/ob-tree.module';
import { PerfilRecursoComponent } from './perfil-recurso/perfil-recurso.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    PermisosComponent,
    PerfilRecursoComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    ObTreeModule,
    PermisosRoutingModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [
    PerfilRecursoFacade, 
    PerfilUsuarioFacade
  ]
})
export class PermisosModule { }
