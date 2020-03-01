import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EstadisticasService } from '../services';
import { GetAllSolicitante, ResetSolicitante } from '../../shared/store/actions/mantenimiento/solicitante.actions';
import { GetAllEspacioAcademico, ResetEspacioAcademico } from '../../shared/store/actions/mantenimiento/espacio-academico.actions';

@Injectable()
export class EstadisticasFacade {

  constructor(
    private store: Store<AppState>,
    private service: EstadisticasService,
  ){

  }
  
  buscarPorCriterios(criterio: any): Observable<any>{
    return this.service.buscarPorCriterio(criterio);
  }

  initCombos(){
    return this.store.dispatch(new GetAllSolicitante());
    return this.store.dispatch(new GetAllEspacioAcademico());
  }
  
  reset(){
    return this.store.dispatch(new ResetSolicitante());
    return this.store.dispatch(new ResetEspacioAcademico());
  }
  

}
