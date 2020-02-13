import { Injectable, Injector, Inject } from '@angular/core';
import { HttpService } from '../../shared';
import { HttpClient } from '@angular/common/http';
import { SEC_CONTEXT_PATH } from '../../shared/utils';
import { PerfilMenuRecursoRequest } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilMenuRecursoService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, @Inject(SEC_CONTEXT_PATH) context: string) {
    super(injector, httpClient, 'sistemas', context);
  }

  buscarAsignacionesPorSistemaPerfil(idSistema: number, idPerfil: number, presentacion: string): Observable<any> {
    return super.get(`/${idSistema}/perfiles/${idPerfil}/perfiles-menus-recursos`,
      super.getHttpParamsFromCriteria({ presentacion: presentacion }));
  }

  registrar(idSistema: number, idPerfil: number, perfilMenuRecursoRequest: PerfilMenuRecursoRequest[]): Observable<any> {
    return super.post(perfilMenuRecursoRequest, `${idSistema}/perfiles/${idPerfil}/perfiles-menus-recursos`);
  }

}