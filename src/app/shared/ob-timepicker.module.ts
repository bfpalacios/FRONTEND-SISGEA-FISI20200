import { NgModule } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

@NgModule({
  imports: [
    TimepickerModule.forRoot()
  ],
  exports: [
    TimepickerModule
  ]
})
export class ObTimePickerModule {
}