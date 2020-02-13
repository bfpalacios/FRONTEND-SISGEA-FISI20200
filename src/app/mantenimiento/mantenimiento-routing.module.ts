import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'cursos',
        loadChildren: './components/curso/curso.module#CursoModule'
      },
      {
        path: 'detalle-horario',
        loadChildren: './components/detalle-horario/detalle-horario.module#DetalleHorarioModule'
      },
      {
        path: 'docente',
        loadChildren: './components/docente/docente.module#DocenteModule'
      },
      {
        path: 'horario',
        loadChildren: './components/horario/horario.module#HorarioModule'
      },
      {
        path: 'plan-academico',
        loadChildren: './components/plan-academico/plan-academico.module#PlanAcademicoModule'
      },
      {
        path: 'programacion-academica',
        loadChildren: './components/programacion-academica/programacion-academica.module#ProgramacionAcademicaModule'
      },
      {
        path: 'origen',
        loadChildren: './components/origen/origen.module#OrigenModule'
      }
      ,
      {
        path: 'solicitante',
        loadChildren: './components/solicitante/solicitante.module#SolicitanteModule'
      }
      ,
      {
        path: 'espacio-academico',
        loadChildren: './components/espacio-academico/espacio-academico.module#EspacioAcademicoModule'
      }
    ],
    data: {
      title: 'Mantenimiento'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
