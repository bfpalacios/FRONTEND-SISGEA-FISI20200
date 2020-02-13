import { Inject, Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SEC_CONTEXT_PATH } from "../../shared/utils";
import { HttpService } from "../../shared/services";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccionService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient,
    @Inject(SEC_CONTEXT_PATH) context: string) {
    super(injector, httpClient, 'acciones', context);
  }

  buscarTodos(): Observable<any> {
    super.setEndpoint('acciones');
    return super.get();
  }

  buscarPorCategoriaRecurso(idCategoriaRecurso: number): Observable<any>{
    super.setEndpoint('categorias-recursos');
    return super.get(`/${idCategoriaRecurso}`, super.getHttpParamsFromCriteria({fields: 'accionesPermitidas'}));
  }

}
