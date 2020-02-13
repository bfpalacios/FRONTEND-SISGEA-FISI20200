import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CursoService } from '../services/curso.service';

@Injectable()
export class CursoFacade {

  constructor(
    private store: Store<AppState>,
    private service: CursoService
  ){}

  buscarTodos(): Observable<any>{
    return this.service.buscarTodos();
  }

  cargar(files: File[]): Observable<any>{
    return this.service.cargar(files);
  }

}
