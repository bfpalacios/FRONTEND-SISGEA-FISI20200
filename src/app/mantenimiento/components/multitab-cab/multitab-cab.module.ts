import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultitabCabRoutingModule } from './multitab-cab-routing.module';
import { MultitabCabComponent } from './multitab-cab.component';
import { SharedModule } from '../../../shared/shared.module';
import { MultitabCabFacade, MultitabDetFacade } from '../../facade';
import { MultitabDetComponent } from './multitab-det/multitab-det.component';
import { ObGridModule } from '../../../shared/ob-grid.module';

@NgModule({
  declarations: [
    MultitabCabComponent,
    MultitabDetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ObGridModule,
    MultitabCabRoutingModule
  ],
  providers: [
    MultitabCabFacade,
    MultitabDetFacade
  ]
})
export class MultitabCabModule { }
