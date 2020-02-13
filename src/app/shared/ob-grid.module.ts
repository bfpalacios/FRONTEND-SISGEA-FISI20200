import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObSwitchFilterGridComponent, ObSimpleSelectFilterGridComponent, CheckboxComponent, ButtonsCellRendererComponent } from './components';
import { AgGridModule } from 'ag-grid-angular';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { ObCheckboxCellComponent } from './components/ag-grid/checkbox-cell/checkbox-cell.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ObComboboxCellComponent } from './components/ag-grid/combobox-cell/combobox-cell.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ProgressCellComponent } from './components/ag-grid/progress-cell/progress-cell.component'
import { ImgMultiplierCellComponent } from './components/ag-grid/img-multiplier-cell/img-multiplier-cell.component';

const COMPONENTS = [
  ButtonsCellRendererComponent,
  CheckboxComponent,
  ObSimpleSelectFilterGridComponent,
  ObSwitchFilterGridComponent,
  ObCheckboxCellComponent,
  ObComboboxCellComponent,
  ProgressCellComponent,
  ImgMultiplierCellComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    AgGridModule.withComponents([
      ButtonsCellRendererComponent,
      CheckboxComponent,
      ObSimpleSelectFilterGridComponent,
      ObSwitchFilterGridComponent,
      ObCheckboxCellComponent,
      ObComboboxCellComponent,
      ProgressCellComponent,
      ImgMultiplierCellComponent
    ]),
    UiSwitchModule.forRoot({
      size: 'small'
    }),
    NgSelectModule,
    ProgressbarModule.forRoot()
  ],
  exports: [
    AgGridModule,
    ...COMPONENTS
  ]
})
export class ObGridModule { }