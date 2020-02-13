import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { GetUsuarioPerfilByUsuario, UpdateUsuarioPerfil, DeleteUsuarioPerfil, AddUsuarioPerfil } from '../../shared/store/actions/seguridad/usuario-perfil.actions';
import { UsuarioPerfil } from '../models';
import { GetAllSistema } from '../../shared/store/actions/seguridad/sistema.actions';

@Injectable()
export class UsuarioPerfilFacade {

  constructor(private store: Store<AppState>) { }

  buscarPorUsuario(username: string) {
    this.store.dispatch(new GetUsuarioPerfilByUsuario(username));
  }

  registrar(usuarioPerfil: UsuarioPerfil) {
    usuarioPerfil.activo = usuarioPerfil.activo === null ? false: usuarioPerfil.activo;
    usuarioPerfil.visualizaPAN = usuarioPerfil.visualizaPAN === null ? false: usuarioPerfil.visualizaPAN;
    this.store.dispatch(new AddUsuarioPerfil(usuarioPerfil));
  }

  actualizar(usuarioPerfil: UsuarioPerfil) {
    usuarioPerfil.activo = usuarioPerfil.activo === null ? false: usuarioPerfil.activo;
    usuarioPerfil.visualizaPAN = usuarioPerfil.visualizaPAN === null ? false: usuarioPerfil.visualizaPAN;
    this.store.dispatch(new UpdateUsuarioPerfil(usuarioPerfil));
  }

  eliminar(usuarioPerfil: UsuarioPerfil) {
    this.store.dispatch(new DeleteUsuarioPerfil(usuarioPerfil));
  }

  initData(){
    this.store.dispatch(new GetAllSistema());
  }

}