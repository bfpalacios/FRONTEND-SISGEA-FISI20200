import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocenteRoutingModule } from './docente-routing.module';
import { DocenteComponent } from './docente.component';
import { SharedModule } from '../../../shared/shared.module';
import { DocenteFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [DocenteComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    DocenteRoutingModule
  ],
  providers: [
    DocenteFacade
  ]
})
export class DocenteModule { }
