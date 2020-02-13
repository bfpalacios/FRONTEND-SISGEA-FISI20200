import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TYPES} from "../../../shared/utils";
import {CategoriaRecursoComponent} from "./categoria-recurso.component";

const routes: Routes = [
  {
    path: '',
    component: CategoriaRecursoComponent,
    data: {
     ...TYPES.CATEGORIA_RECURSO,
      permissions: [TYPES.CATEGORIA_RECURSO.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRecursoRoutingModule {
}
