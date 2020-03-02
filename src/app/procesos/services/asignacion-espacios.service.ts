import { HttpService } from '../../shared';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionEspaciosService extends HttpService {

  constructor(
    injector: Injector,
    httpClient: HttpClient,
    store: Store<AppState>
  ) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_GENERAL);
    super(injector, httpClient, `${path}asignacion-espacios`);
  }

  buscarTodos(): Observable<any>  {
    return super.get();
  }

  actualizar(data: any): Observable<any>  {
    console.log("actualizar service");
    console.log(data);
    return super.put(data, data.idAsignacion);
  }

  procesarAsignacion(): Observable<any>  {
    return super.post('','/procesar');
  }



}
