import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
declare var window: any;

interface AppConfig {
  baseUrl?: string;
  apiContextPath?: string;
  secContextPath?: string;
  batchContextPath?: string;
  agGridLicense?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  config: AppConfig;
  constructor() {
    this.config = {};
  }
  getConfig() {
    if (!environment.production) {
      this.config = environment;
    } else {
      if (window.config) {
        this.config.baseUrl = window.config.baseUrl ? window.config.baseUrl: environment.baseUrl;
        this.config.apiContextPath = window.config.apiContextPath ? window.config.apiContextPath: environment.apiContextPath;
        this.config.secContextPath = window.config.secContextPath ? window.config.secContextPath: environment.secContextPath;
        this.config.batchContextPath = window.config.batchContextPath ? window.config.batchContextPath:
          environment.batchContextPath;
        this.config.agGridLicense = window.config.agGridLicense ? window.config.agGridLicense : environment.agGridLicense;
      } else {
        this.config = environment;
      }
    }
  }

  getByKey(key: string): any {
    if (environment.production && window.config) {
      return window.config[key] ? window.config[key] : environment[key];
    } else {
      return environment[key];
    }
  }
}
