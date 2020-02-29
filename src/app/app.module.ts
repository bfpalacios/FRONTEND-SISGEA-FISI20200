import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers, AppState } from './shared/store/app.reducers';
import { effectsArr } from './shared/store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { KEY_TOKEN } from './shared/utils';
import { StorageService } from './shared/services/storage/storage.service';
import { StartAppInitializer } from './shared/store/actions/auth/auth.actions';
import * as fromAuth from './shared/store/actions/auth/auth.actions';
import { AppInitService } from './shared/services/init/app.init.service';
import { AppConfigService } from './shared/services/config/app-config.service';
import { LicenseManager } from "ag-grid-enterprise/main";

export function jwtOptionsFactory(storageService: StorageService) {
  return {
    tokenGetter: () => {
      return storageService.getItem(KEY_TOKEN);
    }
  }
}

export function initApplication(store: Store<AppState>) {
  return () => {
    store.dispatch(new StartAppInitializer());
  }
}

export function initApplicationEnv(appInitService: AppInitService) {
  return () => {
    return appInitService.init();
  }
}

export function setLicense(appConfigService: AppConfigService){
  return () => {
    return new Promise((resolve, reject) => {
      const agGridLicense = appConfigService.getByKey('agGridLicense');
      LicenseManager.setLicenseKey(agGridLicense);
      resolve(true);
    });
  }
}

export function clearGlobalState(reducer) {
  return function (state, action) {
    if (action.type === fromAuth.authActions.LOGOUT || action.type === fromAuth.authActions.RESET) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot(appReducers, { metaReducers: [clearGlobalState] }),
    EffectsModule.forRoot(effectsArr),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [StorageService]
      }
    })
  ],
  declarations: [
    AppComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initApplication,
    deps: [Store],
    multi: true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initApplicationEnv,
    deps: [AppInitService],
    multi: true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: setLicense,
    deps: [AppConfigService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
