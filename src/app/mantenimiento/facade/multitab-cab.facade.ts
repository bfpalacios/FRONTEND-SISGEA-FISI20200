import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import {
  GetAllMultitabCab,
  AddMultitabCab,
  UpdateMultitabCab,
  DeleteMultitabCab,
  ResetMultitabCab
} from '../../shared/store/actions/mantenimiento/multitab-cab.actions';
import { MultitabCab } from '../models';

@Injectable()
export class MultitabCabFacade {
  constructor(private store: Store<AppState>){}

  buscarTodos(){
    this.store.dispatch(new GetAllMultitabCab());
  }

  registrar(multitabCab: MultitabCab){
    this.store.dispatch(new AddMultitabCab(multitabCab));
  }

  actualizar(multitabCab: MultitabCab){
    this.store.dispatch(new UpdateMultitabCab(multitabCab));
  }

  eliminar(multitabCab: MultitabCab){
    this.store.dispatch(new DeleteMultitabCab(multitabCab));
  }

  resetMultitab() {
    this.store.dispatch(new ResetMultitabCab());
  }
}
