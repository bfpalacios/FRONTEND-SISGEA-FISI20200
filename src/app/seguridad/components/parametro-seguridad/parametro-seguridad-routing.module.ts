import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TYPES} from "../../../shared/utils";
import {ParametroSeguridadComponent} from "./parametro-seguridad.component";

const routes: Routes = [
  {
    path: '',
    component: ParametroSeguridadComponent,
    data: {
     ...TYPES.PARAMETRO_SEGURIDAD,
      permissions: [TYPES.PARAMETRO_SEGURIDAD.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametroSeguridadRoutingModule {
}
