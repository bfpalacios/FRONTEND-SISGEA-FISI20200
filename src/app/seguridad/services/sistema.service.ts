import { HttpService } from '../../shared';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SEC_CONTEXT_PATH } from '../../shared/utils';
import { Sistema } from '../models';
import { Store } from "@ngrx/store";
import { AppState } from "../../shared/store/app.reducers";

@Injectable({
  providedIn: 'root'
})
export class SistemaService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, store: Store<AppState>,
    @Inject(SEC_CONTEXT_PATH) context: string) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_SEGURIDAD);
    super(injector, httpClient, 'sistemas', context);

  }

  buscarTodos(): Observable<any> {
    return super.get();
  }
  
  registrar(sistema: Sistema): Observable<any> {
    return super.post(sistema);
  }

  actualizar(sistema: Sistema): Observable<any> {
    return super.put(sistema, sistema.idSistema);
  }

  eliminar(sistema: Sistema): Observable<any> {
    return super.delete(sistema.idSistema);
  }

  esAutenticacionLocal(idSistema: number): Observable<any> {
    return super.get(`/${idSistema}`, super.getHttpParamsFromCriteria({fields: 'autenticacionLocal'}));
  }

}
