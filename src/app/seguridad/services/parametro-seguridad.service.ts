import {Inject, Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/store/app.reducers";
import {SEC_CONTEXT_PATH} from "../../shared/utils";
import {HttpService} from "../../shared/services";
import {Observable} from "rxjs";
import {ParametroSeguridad} from "../models";

@Injectable({
  providedIn: 'root'
})
export class ParametroSeguridadService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, store: Store<AppState>,
              @Inject(SEC_CONTEXT_PATH) context: string) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_SEGURIDAD);
    super(injector, httpClient, 'parametros-seguridad', context);
  }

  buscarTodos(): Observable<any> {
    return super.get();
  }

  registrar(parametroSeguridad: ParametroSeguridad): Observable<any> {
    return super.post(parametroSeguridad);
  }

  actualizar(parametroSeguridad: ParametroSeguridad): Observable<any> {
    return super.put(parametroSeguridad, parametroSeguridad.idParametroSeguridad);
  }

  eliminar(parametroSeguridad: ParametroSeguridad): Observable<any> {
    return super.delete(parametroSeguridad.idParametroSeguridad);
  }
}
