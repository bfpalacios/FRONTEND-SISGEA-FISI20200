import { HttpService } from '../../shared';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SEC_CONTEXT_PATH } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthSistemaService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, @Inject(SEC_CONTEXT_PATH) context: string) {
    super(injector, httpClient, 'auth/sistemas', context);
  }

  buscarTodosLiberado(): Observable<any> {
    return super.get();
  }

}