import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { GetAllPerfilUsuario, AddPerfilUsuario, UpdatePerfilUsuario, DeletePerfilUsuario } from '../../shared/store/actions/seguridad/perfil-usuario.actions';
import { GetAllPerfil } from '../../shared/store/actions/seguridad/perfil.actions';
import { GetAllUsuario } from '../../shared/store/actions/seguridad/usuario.actions';
import { UsuarioService } from '../../seguridad/services/usuario.service';
import { PerfilService } from '../../seguridad/services/perfil.service';

@Injectable()
export class PerfilUsuarioFacade {

  constructor(
    private store: Store<AppState>,
    private perfilService: PerfilService,
    private usuarioService: UsuarioService
  ){

  }

  buscarTodos(){
    this.store.dispatch(new GetAllPerfilUsuario());
  }

  registrar(obj: any){
    this.store.dispatch(new AddPerfilUsuario(obj));
  }

  actualizar(obj: any){
    this.store.dispatch(new UpdatePerfilUsuario(obj));
  }

  eliminar(obj: any){
    this.store.dispatch(new DeletePerfilUsuario(obj));
  }

  initData(){
    this.store.dispatch(new GetAllPerfil());
    this.store.dispatch(new GetAllUsuario());
  }

  buscarPerfiles(){
    return this.perfilService.buscarTodos();
  }

  buscarUsuarios(){
    return this.usuarioService.buscarTodos();
  }

}