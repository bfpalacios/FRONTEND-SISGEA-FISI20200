import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import {
  AddEspacioAcademico,
  GetAllEspacioAcademico,
  UpdateEspacioAcademico,
  DeleteEspacioAcademico,
  DownloadEspacioAcademico,
  ResetEspacioAcademico
} from '../../shared/store/actions/mantenimiento/espacio-academico.actions';
import { EspacioAcademico } from '../models';
import { GetByMultitabCab, GetByMultitabCabB } from '../../shared/store/actions/mantenimiento/multitab-det.actions';
import { MULTITAB_IDS } from '../../shared/utils';
@Injectable()
export class EspacioAcademicoFacade {

  constructor(
    private store: Store<AppState>
  ){}
  initData() {

   this.store.dispatch(new GetByMultitabCab({ idMultitabCab : MULTITAB_IDS.base }));
  }
  buscarTodos(){
    this.store.dispatch(new GetAllEspacioAcademico());
  }

  registrar(espacioAcademico: EspacioAcademico){
    this.store.dispatch(new AddEspacioAcademico(espacioAcademico));
  }

  actualizar(espacioAcademico: EspacioAcademico){
    this.store.dispatch(new UpdateEspacioAcademico(espacioAcademico));
  }

  eliminar(espacioAcademico: EspacioAcademico){
    this.store.dispatch(new DeleteEspacioAcademico(espacioAcademico));
  }

  exportar(){
    this.store.dispatch(new DownloadEspacioAcademico());
  }

  resetEspacioAcademico() {
    this.store.dispatch(new ResetEspacioAcademico());
  }
}
