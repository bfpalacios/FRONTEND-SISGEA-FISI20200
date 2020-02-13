import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoRoutingModule } from './curso-routing.module';
import { CursoComponent } from './curso.component';
import { SharedModule } from '../../../shared/shared.module';
import { CursoFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [CursoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    CursoRoutingModule
  ],
  providers: [
    CursoFacade
  ]
})
export class CursoModule { }
