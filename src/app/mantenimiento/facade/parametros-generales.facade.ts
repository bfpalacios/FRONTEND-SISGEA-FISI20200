import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ParametrosGeneralesService } from '../services/parametros-generales.service';

@Injectable()
export class ParametrosGeneralesFacade {

  constructor(
    private store: Store<AppState>,
    private service: ParametrosGeneralesService
  ){}

  buscarTodos(): Observable<any>{
    return this.service.buscarTodos();
  }

  registrar(form: any): Observable<any>{
    return this.service.registrar(form);
  }

}
