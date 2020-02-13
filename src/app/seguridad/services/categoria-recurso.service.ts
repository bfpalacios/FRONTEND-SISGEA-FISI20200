import {Inject, Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/store/app.reducers";
import {SEC_CONTEXT_PATH} from "../../shared/utils";
import {HttpService} from "../../shared/services";
import {Observable} from "rxjs";
import {CategoriaRecurso} from "../models";

@Injectable({
  providedIn: 'root'
})
export class CategoriaRecursoService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, store: Store<AppState>,
              @Inject(SEC_CONTEXT_PATH) context: string) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_SEGURIDAD);
    super(injector, httpClient, 'categorias-recursos', context);
  }

  buscarTodos(): Observable<any> {
    return super.get();
  }

  registrar(categoriaRecurso: CategoriaRecurso): Observable<any> {
    return super.post(categoriaRecurso);
  }

  actualizar(categoriaRecurso: CategoriaRecurso): Observable<any> {
    return super.put(categoriaRecurso, categoriaRecurso.idCategoriaRecurso);
  }

  eliminar(categoriaRecurso: CategoriaRecurso): Observable<any> {
    return super.delete(categoriaRecurso.idCategoriaRecurso);
  }
}
