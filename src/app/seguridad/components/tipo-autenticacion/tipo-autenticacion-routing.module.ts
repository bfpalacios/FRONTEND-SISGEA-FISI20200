import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TYPES} from "../../../shared/utils";
import {TipoAutenticacionComponent} from "./tipo-autenticacion.component";

const routes: Routes = [
  {
    path: '',
    component: TipoAutenticacionComponent,
    data: {
      ...TYPES.TIPO_AUTENTICACION,
      permissions: [TYPES.TIPO_AUTENTICACION.resource],
      title: 'Tipo Autenticación'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoAutenticacionRoutingModule {
}
