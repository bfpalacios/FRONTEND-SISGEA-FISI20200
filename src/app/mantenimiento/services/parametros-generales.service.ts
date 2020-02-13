import { HttpService } from '../../shared/services/http/http.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametrosGeneralesService extends HttpService {

  constructor(
    injector: Injector,
    httpClient: HttpClient,
    store: Store<AppState>
  ) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_GENERAL);
    super(injector, httpClient, `${path}mantenimientos-generales`);
  }

  buscarTodos(): Observable<any>  {
    return super.get();
  }

  registrar(form: any): Observable<any>  {
    return super.put(form);
  }


}
