import { HttpService } from '../../shared/services/http/http.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { Solicitante } from '../models';
import { Observable } from 'rxjs';
import { FILE_EXT } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class SolicitanteService extends HttpService {

  constructor(
    injector: Injector,
    httpClient: HttpClient,
    store: Store<AppState>
  ) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_GENERAL);
    super(injector, httpClient, `${path}solicitantes`);
  }

  buscarTodos(): Observable<any>  {
    return super.get();
  }

  registrar(solicitante: Solicitante): Observable<any>  {
    return super.post(solicitante);
  }

  actualizar(solicitante: Solicitante): Observable<any>  {
    return super.put(solicitante, solicitante.idSolicitante);
  }

  eliminar(solicitante: Solicitante): Observable<any>  {
    return super.delete(solicitante.idSolicitante);
  }

  exportar(){
    return super.download(FILE_EXT.XLSX);
  }

}
