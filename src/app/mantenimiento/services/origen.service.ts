import { HttpService } from '../../shared/services/http/http.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { Origen } from '../models';
import { Observable } from 'rxjs';
import { FILE_EXT } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class OrigenService extends HttpService {

  constructor(
    injector: Injector,
    httpClient: HttpClient,
    store: Store<AppState>
  ) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_GENERAL);
    super(injector, httpClient, `${path}origenes`);
  }

  buscarTodos(): Observable<any>  {
    return super.get();
  }

  registrar(origen: Origen): Observable<any>  {
    return super.post(origen);
  }

  actualizar(origen: Origen): Observable<any>  {
    return super.put(origen, origen.idOrigen);
  }

  eliminar(origen: Origen): Observable<any>  {
    return super.delete(origen.idOrigen);
  }

  exportar(){
    return super.download(FILE_EXT.XLSX);
  }

}
