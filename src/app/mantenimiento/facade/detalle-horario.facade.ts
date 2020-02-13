import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DetalleHorarioService } from '../services/detalle-horario.service';

@Injectable()
export class DetalleHorarioFacade {

  constructor(
    private store: Store<AppState>,
    private service: DetalleHorarioService
  ){}

  buscarTodos(): Observable<any>{
    return this.service.buscarTodos();
  }

  cargar(files: File[]): Observable<any>{
    return this.service.cargar(files);
  }

}
