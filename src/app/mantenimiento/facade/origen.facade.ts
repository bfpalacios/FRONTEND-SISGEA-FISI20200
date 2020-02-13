import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import {
  AddOrigen,
  GetAllOrigen,
  UpdateOrigen,
  DeleteOrigen,
  DownloadOrigen,
  ResetOrigen
} from '../../shared/store/actions/mantenimiento/origen.actions';
import { Origen } from '../models';

@Injectable()
export class OrigenFacade {

  constructor(
    private store: Store<AppState>
  ){}

  buscarTodos(){
    this.store.dispatch(new GetAllOrigen());
  }

  registrar(origen: Origen){
    this.store.dispatch(new AddOrigen(origen));
  }

  actualizar(origen: Origen){
    this.store.dispatch(new UpdateOrigen(origen));
  }

  eliminar(origen: Origen){
    this.store.dispatch(new DeleteOrigen(origen));
  }

  exportar(){
    this.store.dispatch(new DownloadOrigen());
  }

  resetOrigen() {
    this.store.dispatch(new ResetOrigen());
  }
}
