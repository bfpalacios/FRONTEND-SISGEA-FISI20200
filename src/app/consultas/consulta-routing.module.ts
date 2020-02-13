import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'unibanca/compensacion',
        loadChildren: './components/unibanca/compensacion/compensacion.module#CompensacionModule'
      },
    ],
    data: {
      title: 'Consulta'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
