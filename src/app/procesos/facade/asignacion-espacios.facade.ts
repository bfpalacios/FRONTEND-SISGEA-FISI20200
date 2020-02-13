import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsignacionEspaciosService } from '../services';
import { EspacioAcademicoService } from '../../mantenimiento/services';
import { GetAllAsignacionEspacios } from '../../shared/store/actions/procesos/asignacion-espacios.actions';
import { UpdateAsignacionEspacios } from '../../shared/store/actions/procesos/asignacion-espacios.actions';

@Injectable()
export class AsignacionEspaciosFacade {

  constructor(
    private store: Store<AppState>,
    private service: AsignacionEspaciosService,
    private espacioAcademicoService: EspacioAcademicoService
  ){}

  buscarTodos(): Observable<any>{
    return this.service.buscarTodos();
  }

  initData(){
    this.store.dispatch(new GetAllAsignacionEspacios());
  }

  initCombo(): Observable<any>{
    return this.espacioAcademicoService.buscarTodos();
  }


  actualizar(form: any){
    this.store.dispatch(new UpdateAsignacionEspacios(form));
  }

  procesarAsignacion(): Observable<any>{
    return this.service.procesarAsignacion();
  }
}
