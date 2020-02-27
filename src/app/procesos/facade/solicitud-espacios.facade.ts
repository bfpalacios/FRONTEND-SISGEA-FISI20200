import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SolicitudEspaciosService } from '../services';
import { SolicitanteService, EspacioAcademicoService } from '../../mantenimiento/services';
import { GetAllSolicitudEspacios } from '../../shared/store/actions/procesos/solicitud-espacios.actions';
import { SolicitudEspacio } from '../model';
@Injectable()
export class SolicitudEspaciosFacade {

  constructor(
    private store: Store<AppState>,
    private service: SolicitudEspaciosService,
    private solicitanteService: SolicitanteService,
    private espacioAcademicoService: EspacioAcademicoService
  ){}

  buscarTodos(): Observable<any>{
    return this.service.buscarTodos();
  }

  buscarSolicitantes(): Observable<any>{
    return this.solicitanteService.buscarTodos();
  }

  buscarEspacios(): Observable<any>{
    return this.espacioAcademicoService.buscarTodos();
  }

  buscarEspaciosHorarios(criterio: any): Observable<any>{
    return this.espacioAcademicoService.buscarEspacioHorario(criterio);
  }

  initData(){
    this.store.dispatch(new GetAllSolicitudEspacios());
  }

  registrar(data: any): Observable<any>{
    return this.service.registrar(data);
  }
  actualizar(solicitudEspacio: SolicitudEspacio){
    return this.service.actualizar(solicitudEspacio);
    //this.store.dispatch(new UpdateSolicitudEspacio(solicitudEspacio));
  }
}
