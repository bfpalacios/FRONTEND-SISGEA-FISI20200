import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecursoRoutingModule } from './recurso-routing.module';
import { RecursoComponent } from './recurso.component';
import { SharedModule } from '../../../shared/shared.module';
import { ObGridModule } from '../../../shared/ob-grid.module';
import { RecursoFacade } from '../../facade';
import { MultitabCabFacade, MultitabDetFacade } from '../../../mantenimiento/facade';

@NgModule({
  declarations: [
    RecursoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    RecursoRoutingModule
  ],
  providers: [
    RecursoFacade,
    MultitabDetFacade,
    MultitabCabFacade,
  ]
})
export class RecursoModule { }
