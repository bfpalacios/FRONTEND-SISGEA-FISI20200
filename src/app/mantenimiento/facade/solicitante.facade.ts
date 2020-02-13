import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import {
  AddSolicitante,
  GetAllSolicitante,
  UpdateSolicitante,
  DeleteSolicitante,
  DownloadSolicitante,
  ResetSolicitante
} from '../../shared/store/actions/mantenimiento/solicitante.actions';
import { Solicitante } from '../models';
import { GetByMultitabCab, GetByMultitabCabB } from '../../shared/store/actions/mantenimiento/multitab-det.actions';
import { MULTITAB_IDS } from '../../shared/utils';

@Injectable()
export class SolicitanteFacade {

  constructor(
    private store: Store<AppState>
  ){}
  initData() {

   this.store.dispatch(new GetByMultitabCab({ idMultitabCab : MULTITAB_IDS.base }));
  }
  buscarTodos(){
    this.store.dispatch(new GetAllSolicitante());
  }

  registrar(solicitante: Solicitante){
    this.store.dispatch(new AddSolicitante(solicitante));
  }

  actualizar(solicitante: Solicitante){
    this.store.dispatch(new UpdateSolicitante(solicitante));
  }

  eliminar(solicitante: Solicitante){
    this.store.dispatch(new DeleteSolicitante(solicitante));
  }

  exportar(){
    this.store.dispatch(new DownloadSolicitante());
  }

  resetSolicitante() {
    this.store.dispatch(new ResetSolicitante());
  }
}
