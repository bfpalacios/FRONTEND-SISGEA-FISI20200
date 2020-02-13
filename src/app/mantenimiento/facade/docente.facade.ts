import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DocenteService } from '../services/docente.service';

@Injectable()
export class DocenteFacade {

  constructor(
    private store: Store<AppState>,
    private docenteService: DocenteService
  ){}

  buscarTodos(): Observable<any>{
    return this.docenteService.buscarTodos();
  }

  cargar(files: File[]): Observable<any>{
    return this.docenteService.cargar(files);
  }

}
