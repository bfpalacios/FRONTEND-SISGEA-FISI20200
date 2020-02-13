import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SolicitudEspaciosService } from '../services';
import { SolicitanteService } from '../../mantenimiento/services';
import { GetAllSolicitudEspacios } from '../../shared/store/actions/procesos/solicitud-espacios.actions';
import { UpdateAsignacionEspacios } from '../../shared/store/actions/procesos/asignacion-espacios.actions';

@Injectable()
export class SolicitudEspaciosFacade {

  constructor(
    private store: Store<AppState>,
    private service: SolicitudEspaciosService,
    private solicitanteService: SolicitanteService
  ){}

  buscarTodos(): Observable<any>{
    return this.service.buscarTodos();
  }

  buscarSolicitantes(): Observable<any>{
    return this.solicitanteService.buscarTodos();
  }

  initData(){
    this.store.dispatch(new GetAllSolicitudEspacios());
  }

  registrar(data: any): Observable<any>{
    return this.service.registrar(data);
  }
}
