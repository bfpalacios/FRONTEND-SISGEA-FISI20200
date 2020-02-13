import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramacionAcademicaRoutingModule } from './programacion-academica-routing.module';
import { ProgramacionAcademicaComponent } from './programacion-academica.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProgramacionAcademicaFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [ProgramacionAcademicaComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    ProgramacionAcademicaRoutingModule
  ],
  providers: [
    ProgramacionAcademicaFacade
  ]
})
export class ProgramacionAcademicaModule { }
