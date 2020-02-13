import { Injectable, Injector, Inject } from '@angular/core';
import { HttpService } from '../../shared';
import { HttpClient } from '@angular/common/http';
import { Perfil } from '../models';
import { Observable } from 'rxjs';
import { SEC_CONTEXT_PATH } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class PerfilService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, @Inject(SEC_CONTEXT_PATH) context: string) {
    super(injector, httpClient, 'sistemas', context);
  }

  buscarTodos(): Observable<any> {
    super.setEndpoint('perfiles');
    return super.get();
  }

  buscarPorSistema(idSistema: number): Observable<any> {
    super.setEndpoint('sistemas');
    return super.get(`/${idSistema}/perfiles`);
  }

  registrar(perfil: Perfil): Observable<any> {
    super.setEndpoint('sistemas');
    return super.post(perfil, `${perfil.idSistema}/perfiles`);
  }

  actualizar(perfil: Perfil): Observable<any> {
    super.setEndpoint('sistemas');
    return super.put(perfil, `${perfil.idSistema}/perfiles/${perfil.idPerfil}`);
  }

  eliminar(perfil: Perfil): Observable<any> {
    super.setEndpoint('sistemas');
    return super.delete(`${perfil.idSistema}/perfiles/${perfil.idPerfil}`);
  }

}