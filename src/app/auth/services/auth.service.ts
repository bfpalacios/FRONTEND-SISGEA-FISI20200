import { Injectable, Injector, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginForm } from '../models/login.model';
import { SEC_CONTEXT_PATH } from '../../shared/utils';
import { RequestOptions } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, @Inject(SEC_CONTEXT_PATH) context: string) {
    super(injector, httpClient, 'auth/login', context);
  }

  logIn(data: LoginForm): Observable<HttpResponse<any>> {
    localStorage.clear();
    return this.post(data, null, { responseType: 'json', observe: 'response' });
  }

}
