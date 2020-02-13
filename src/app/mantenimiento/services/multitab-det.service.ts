import { Injectable, Injector } from '@angular/core';
import { HttpService } from '../../shared/services/http/http.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { MultitabDet, MultitabCab } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultitabDetService extends HttpService {
  path: string;

  constructor(
    injector: Injector,
    httpClient: HttpClient,
    store: Store<AppState>
  ) {
    let path: string;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_GENERAL);
    super(injector, httpClient, `${path}multitabs-cabs`);
    this.path = path;
  }

  buscarTodos(): Observable<any> {
    super.setEndpoint(`${this.path}multitabs-dets`);
    return super.get();
  }

  registrar(multitabDet: MultitabDet): Observable<any> {
    super.setEndpoint(`${this.path}multitabs-cabs`);
    return super.post(multitabDet, `${multitabDet.idMultitabCab}/multitabs-dets`);
  }

  actualizar(multitabDet: MultitabDet): Observable<any> {
    super.setEndpoint(`${this.path}multitabs-cabs`);
    return super.put(multitabDet, `${multitabDet.idMultitabCab}/multitabs-dets/${multitabDet.idMultitabDet}`);
  }

  eliminar(multitabDet: MultitabDet): Observable<any> {
    super.setEndpoint(`${this.path}multitabs-cabs`);
    return super.delete(`${multitabDet.idMultitabCab}/multitabs-dets/${multitabDet.idMultitabDet}`);
  }

  buscarPorMultitabCab(multitabCab: MultitabCab): Observable<any> {
    super.setEndpoint(`${this.path}multitabs-cabs`);
    return super.get(`/${multitabCab.idMultitabCab}/multitabs-dets`);
  }

  buscarPorMultitabCabB(multitabCab: MultitabCab): Observable<any> {
    super.setEndpoint(`${this.path}multitabs-cabs`);
    return super.get(`/${multitabCab.idMultitabCab}/multitabs-dets`);
  }

  buscarEstadoTransaccion(multitabCab: MultitabCab): Observable<any> {
    super.setEndpoint(`${this.path}multitabs-cabs`);
    return super.get(`/${multitabCab.idMultitabCab}/multitabs-dets`);
  }

}
