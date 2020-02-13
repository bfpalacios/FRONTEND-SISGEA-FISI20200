import {Inject, Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/store/app.reducers";
import {SEC_CONTEXT_PATH} from "../../shared/utils";
import {HttpService} from "../../shared/services";
import {Observable} from "rxjs";
import {TipoAutenticacion} from "../models";

@Injectable({
  providedIn: 'root'
})
export class TipoAutenticacionService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, store: Store<AppState>,
              @Inject(SEC_CONTEXT_PATH) context: string) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_SEGURIDAD);
    super(injector, httpClient, 'tipos-autenticaciones', context);
  }

  buscarTodos(): Observable<any> {
    return super.get();
  }

  registrar(tipoAutenticacion: TipoAutenticacion): Observable<any> {
    return super.post(tipoAutenticacion);
  }

  actualizar(tipoAutenticacion: TipoAutenticacion): Observable<any> {
    return super.put(tipoAutenticacion, tipoAutenticacion.idTipoAutenticacion);
  }

  eliminar(tipoAutenticacion: TipoAutenticacion): Observable<any> {
    return super.delete(tipoAutenticacion.idTipoAutenticacion);
  }
}
