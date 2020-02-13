import { HttpService } from '../../shared';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecursoSeg } from '../models';
import { SEC_CONTEXT_PATH } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class RecursoService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, @Inject(SEC_CONTEXT_PATH) context: string) {
    super(injector, httpClient, 'recursos', context);
  }

  buscarTodos(): Observable<any> {
    return super.get();
  }

  registrar(recurso: RecursoSeg): Observable<any> {
    return super.post(recurso);
  }

  actualizar(recurso: RecursoSeg): Observable<any> {
    return super.put(recurso, recurso.idRecurso);
  }

  eliminar(recurso: RecursoSeg): Observable<any> {
    return super.delete(recurso.idRecurso);
  }
}