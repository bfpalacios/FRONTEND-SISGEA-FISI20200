import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TYPES} from "../../../shared/utils";
import {SistemaComponent} from "./sistema.component";

const routes: Routes = [
  {
    path: '',
    component: SistemaComponent,
    data: {
     ...TYPES.SISTEMA,
      permissions: [TYPES.SISTEMA.resource]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule {
}
