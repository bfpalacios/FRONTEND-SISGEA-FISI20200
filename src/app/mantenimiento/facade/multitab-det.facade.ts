import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { MultitabDet, MultitabCab } from '../models';
import {
  AddMultitabDet,
  UpdateMultitabDet,
  DeleteMultitabDet,
  GetByMultitabCab,
  ResetMultitabDet
} from '../../shared/store/actions/mantenimiento/multitab-det.actions';
import { Observable } from 'rxjs';
import { MultitabDetService } from '../../mantenimiento/services/multitab-det.service';

@Injectable()
export class MultitabDetFacade {

  constructor(
    private store: Store<AppState>,
    private multitabDetService: MultitabDetService
  ){
  }

  registrar(multitabDet: MultitabDet){
    this.store.dispatch(new AddMultitabDet(multitabDet));
  }

  actualizar(multitabDet: MultitabDet){
    this.store.dispatch(new UpdateMultitabDet(multitabDet));
  }

  eliminar(multitabDet: MultitabDet){
    this.store.dispatch(new DeleteMultitabDet(multitabDet));
  }

  buscarPorMultitabCab(multitabCab: MultitabCab){
    this.store.dispatch(new GetByMultitabCab(multitabCab));
  }

  buscarPorMultitabCabSync(idMultitabCab: number) : Observable<any>{
    let criterio = {
      idMultitabCab: idMultitabCab
    }
    return this.multitabDetService.buscarPorMultitabCab(criterio);
  }

  resetMultitabDet() {
    this.store.dispatch(new ResetMultitabDet());
  }
}
