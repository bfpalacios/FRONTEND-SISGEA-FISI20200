import { HttpService } from '../../shared/services/http/http.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MultitabCab } from '../models';
import { FILE_EXT } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class MultitabCabService extends HttpService {

  constructor(
    injector: Injector,
    httpClient: HttpClient,
    store: Store<AppState>
  ){
    let path: string;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_GENERAL);
    super(injector, httpClient, `${path}multitabs-cabs`);
  }

  buscarTodos(): Observable<any> {
    return super.get();
  }

  registrar(multitabCab: MultitabCab): Observable<any> {
    return super.post(multitabCab);
  }

  actualizar(multitabCab: MultitabCab): Observable<any> {
    return super.put(multitabCab, multitabCab.idMultitabCab);
  }

  eliminar(multitabCab: MultitabCab): Observable<any> {
    return super.delete(multitabCab.idMultitabCab);
  }

  exportar(){
    return super.download(FILE_EXT.XLSX);
  }

}
