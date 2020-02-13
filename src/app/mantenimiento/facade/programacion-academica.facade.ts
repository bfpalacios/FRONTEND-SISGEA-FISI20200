import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProgramacionAcademicaService } from '../services/programacion-academica.service';

@Injectable()
export class ProgramacionAcademicaFacade {

  constructor(
    private store: Store<AppState>,
    private service: ProgramacionAcademicaService
  ){}

  buscarTodos(): Observable<any>{
    return this.service.buscarTodos();
  }

  cargar(files: File[]): Observable<any>{
    return this.service.cargar(files);
  }

}
