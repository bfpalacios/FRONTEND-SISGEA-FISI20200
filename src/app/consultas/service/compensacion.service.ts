import { HttpService } from '../../shared';
import { Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { HttpClient } from '@angular/common/http';
//import { CriterioCompensacionRequest } from '../models/criterios/index'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompensacionService extends HttpService {
  path: string;

  constructor(
    injector: Injector,
    httpClient: HttpClient,
    store: Store<AppState>
  ) {
    let path: string;
    store.select('globalData')
      .subscribe(data => path = data.pathEndpoints.CONSULTAS);
    super(injector, httpClient, `${path}compensaciones`);
    this.path = path;
  }

  buscarPorCriterios(criterio: any): Observable<any> {
    super.setEndpoint(`${this.path}compensaciones/pagination`);
    let httpParams = super.getHttpParamsFromCriteria(criterio);
    return super.get('', httpParams);
  }

  buscarPorSecuenciaCompensacion(idSecuencia: any): Observable<any> {
    super.setEndpoint(`${this.path}compensaciones/detalle`);
    let httpParams = super.getHttpParamsFromCriteria(idSecuencia);
    return super.get('', httpParams);
  }

  buscarComisionPorSecuenciaCompensacion(idSecuencia: any): Observable<any> {
    super.setEndpoint(`${this.path}compensaciones/comisiones`);
    let httpParams = super.getHttpParamsFromCriteria(idSecuencia);
    return super.get('', httpParams);
  }
}
