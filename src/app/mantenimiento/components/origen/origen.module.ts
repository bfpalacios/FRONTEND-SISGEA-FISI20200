import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrigenRoutingModule } from './origen-routing.module';
import { OrigenComponent } from './origen.component';
import { SharedModule } from '../../../shared/shared.module';
import { OrigenFacade } from '../../facade';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [OrigenComponent],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    OrigenRoutingModule
  ],
  providers: [
    OrigenFacade
  ]
})
export class OrigenModule { }
