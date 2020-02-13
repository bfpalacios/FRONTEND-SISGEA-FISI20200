import { HttpService } from '../../shared';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SEC_CONTEXT_PATH } from '../../shared/utils';
import { Observable } from 'rxjs';
import { UsuarioPerfil } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPerfilService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, @Inject(SEC_CONTEXT_PATH) context: string) {
    super(injector, httpClient, 'usuarios', context);
  }

  buscarPorUsuario(username: string): Observable<any> {
    super.setEndpoint('usuarios');
    return super.get(`/${username}/usuarios-perfiles`);
  }

  registrar(usuarioPerfil: UsuarioPerfil): Observable<any> {
    super.setEndpoint('usuarios');
    return super.post(usuarioPerfil, `${usuarioPerfil.username}/usuarios-perfiles`);
  }

  actualizar(usuarioPerfil: UsuarioPerfil): Observable<any> {
    super.setEndpoint('usuarios-perfiles');
    return super.put(usuarioPerfil, `${usuarioPerfil.idUsuarioPerfil}`);
  }

  eliminar(usuarioPerfil: UsuarioPerfil): Observable<any> {
    super.setEndpoint('usuarios-perfiles');
    return super.delete(usuarioPerfil.idUsuarioPerfil);
  }
}