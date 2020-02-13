import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { TYPES } from "../../../shared/utils";

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    data: {
      ...TYPES.USUARIOSEG,
      permissions: [TYPES.USUARIOSEG.resource, TYPES.CTA_USUARIO.resource],
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {
}
