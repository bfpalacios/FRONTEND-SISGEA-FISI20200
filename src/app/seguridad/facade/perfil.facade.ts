import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { GetAllSistema } from '../../shared/store/actions/seguridad/sistema.actions';
import { Perfil } from '../models';
import { GetAllPerfil, GetPerfilBySistema, AddPerfil, UpdatePerfil, DeletePerfil } from '../../shared/store/actions/seguridad/perfil.actions';

@Injectable()
export class PerfilFacade {

  constructor(private store: Store<AppState>){}

  buscarTodos(){
    this.store.dispatch(new GetAllPerfil());
  }

  buscarPorSistema(idSistema: number){
    this.store.dispatch(new GetPerfilBySistema(idSistema));
  }

  registrar(perfil: Perfil){
    perfil.visualizaPAN = perfil.visualizaPAN === null ? false : perfil.visualizaPAN;
    this.store.dispatch(new AddPerfil(perfil));
  }

  actualizar(perfil: Perfil){
    perfil.visualizaPAN = perfil.visualizaPAN === null ? false : perfil.visualizaPAN;
    this.store.dispatch(new UpdatePerfil(perfil));
  }

  eliminar(perfil: Perfil){
    this.store.dispatch(new DeletePerfil(perfil));
  }

  initData(){
    this.store.dispatch(new GetAllSistema());
  }

}