import { NgModule } from '@angular/core';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';

@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    BsDatepickerModule
  ]
})
export class ObDatepickerModule {
  constructor(localeService: BsLocaleService) {
    defineLocale('es', esLocale);
    localeService.use('es');
  }
}