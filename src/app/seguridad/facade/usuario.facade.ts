import {AppState} from '../../shared/store/app.reducers';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AddUsuario,
  DeleteUsuario,
  GetAllUsuario,
  UpdateUsuario
} from "../../shared/store/actions/seguridad/usuario.actions";
import {UsuarioSeg} from "../models";

@Injectable()
export class UsuarioFacade {

  constructor(private store: Store<AppState>) {
  }

  buscarTodos(): void {
    this.store.dispatch(new GetAllUsuario());
  }

  registrar(usuario: UsuarioSeg): void {
    this.store.dispatch(new AddUsuario(usuario));
  }

  actualizar(usuario: UsuarioSeg): void {
    this.store.dispatch(new UpdateUsuario(usuario));
  }

  eliminar(usuario: UsuarioSeg): void {
    this.store.dispatch(new DeleteUsuario(usuario));
  }
}
