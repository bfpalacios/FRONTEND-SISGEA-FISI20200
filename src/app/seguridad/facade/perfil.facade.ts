import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Perfil } from '../models';
import { GetAllPerfil, AddPerfil, UpdatePerfil, DeletePerfil } from '../../shared/store/actions/seguridad/perfil.actions';

@Injectable()
export class PerfilFacade {

  constructor(private store: Store<AppState>){}

  buscarTodos(){
    this.store.dispatch(new GetAllPerfil());
  }

  registrar(perfil: Perfil){
    this.store.dispatch(new AddPerfil(perfil));
  }

  actualizar(perfil: Perfil){
    this.store.dispatch(new UpdatePerfil(perfil));
  }

  eliminar(perfil: Perfil){
    this.store.dispatch(new DeletePerfil(perfil));
  }

  initData(){
    
  }

}