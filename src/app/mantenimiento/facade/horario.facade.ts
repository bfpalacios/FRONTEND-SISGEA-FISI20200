import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HorarioService } from '../services/horario.service';

@Injectable()
export class HorarioFacade {

  constructor(
    private store: Store<AppState>,
    private service: HorarioService
  ){}

  buscarTodos(): Observable<any>{
    return this.service.buscarTodos();
  }

  cargar(files: File[]): Observable<any>{
    return this.service.cargar(files);
  }

}
