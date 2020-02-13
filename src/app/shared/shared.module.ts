import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';

import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard, HttpConfigInterceptor } from './';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import 3rd party components
import { ModalModule } from 'ngx-bootstrap/modal';
import { CUSTOM_ERROR_MESSAGES, NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CookieService } from 'ngx-cookie-service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxDropzoneModule } from 'ngx-dropzone';

import {
  ConfirmModalComponent,
  ConsultaModalComponent,
  FormModalComponent,
  LayoutComponent,
  ModalComponent,
  P404Component,
  P500Component,
  PagelengthComponent,
  TablaComponent,
  TabPaneComponent,
  PiePaginacionComponent,
  TemplateConsultaComponent,
  TemplateMantenimientoComponent,
  PagelengthDetalleComponent,
  ObModalHelpComponent
} from './components';
import { SafePipe } from './pipes';
import { AutofocusDirective, OnlynumbersDirective, OnlytextDirective, UppercaseDirective, MoneyDirective, DescriptionDirective } from './directives';
import { BASE_URL, CONTEXT_PATH, CUSTOM_ERRORS, SEC_AUTH, SEC_CONTEXT_PATH, SICF_BATCH_CONTEXT_PATH } from './utils';
import { AlertComponent } from './components/alert/alert.component';
import { environment } from '../../environments/environment';
import { TemplateMantenimientoDetalleComponent } from './components/template-mantenimiento-detalle/template-mantenimiento-detalle.component';
import { DisableControlDirective } from "./directives/disable-control.directive";
import { TemplateSimpleComponent } from './components/template-simple/template-simple.component';
import { QueryBuilderModule } from 'angular2-query-builder';
import { ParametrosGeneralesFacade } from '../mantenimiento/facade/parametros-generales.facade';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
const COMPONENTS = [
  P404Component,
  P500Component,
  LayoutComponent,
  ModalComponent,
  ConfirmModalComponent,
  TemplateMantenimientoComponent,
  TemplateConsultaComponent,
  FormModalComponent,
  AlertComponent,
  PagelengthComponent,
  TabPaneComponent,
  PiePaginacionComponent,
  TablaComponent,
  TemplateMantenimientoDetalleComponent,
  ConsultaModalComponent,
  PagelengthDetalleComponent,
  TemplateSimpleComponent,
  ObModalHelpComponent
];

const PIPES = [
  SafePipe
];

const DIRECTIVES = [
  UppercaseDirective,
  OnlynumbersDirective,
  OnlytextDirective,
  MoneyDirective,
  AutofocusDirective,
  DisableControlDirective,
  DescriptionDirective
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgBootstrapFormValidationModule.forRoot(),
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ToastNoAnimationModule.forRoot({
      closeButton: true,
      timeOut: 3000
    }),
    BsDropdownModule.forRoot(),
    NgSelectModule,
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    UiSwitchModule.forRoot({
      size: 'small'
    }),
    QueryBuilderModule,
    NgxDropzoneModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    AppBreadcrumbModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    ModalModule,
    AlertModule,
    ToastNoAnimationModule,
    BsDropdownModule,
    NgSelectModule,
    TooltipModule,
    TypeaheadModule,
    UiSwitchModule,
    QueryBuilderModule,
    NgxDropzoneModule,
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES
  ],
  providers: [
    AuthGuard,
    CookieService,
    ParametrosGeneralesFacade,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true
    },
    {
      provide: BASE_URL,
      useValue: 'baseUrl'
    },
    {
      provide: CONTEXT_PATH,
      useValue: 'apiContextPath'
    },
    {
      provide: SEC_CONTEXT_PATH,
      useValue: 'secContextPath'
    },
    {
      provide: SICF_BATCH_CONTEXT_PATH,
      useValue: 'batchContextPath'
    },
    {
      provide: SEC_AUTH,
      useValue: environment.auth
    },
    {
      provide: 'ENDPOINT',
      useValue: ''
    }
  ]
})
export class SharedModule {
}
