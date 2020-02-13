import { InjectionToken } from '@angular/core';

export const BASE_URL = new InjectionToken<string>("api.url-key.config");
export const CONTEXT_PATH = new InjectionToken<string>("api.context-pah-key.config");
export const SEC_CONTEXT_PATH = new InjectionToken<string>("sec.context-path-key.config");
export const SEC_AUTH = new InjectionToken<boolean>("sec.auth.config");
export const SICF_BATCH_CONTEXT_PATH = new InjectionToken<string>("api.context-path-sicf-batch-key.config");

export const KEY_TOKEN = '__token';
export const KEY_MENU_OPTS = '__options';
