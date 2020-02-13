import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlanAcademicoService } from '../services/plan-academico.service';

@Injectable()
export class PlanAcademicoFacade {

  constructor(
    private store: Store<AppState>,
    private service: PlanAcademicoService
  ){}

  buscarTodos(): Observable<any>{
    return this.service.buscarTodos();
  }

  cargar(files: File[]): Observable<any>{
    return this.service.cargar(files);
  }

}
