import { HttpService } from '../../shared/services/http/http.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { EspacioAcademico } from '../models';
import { Observable } from 'rxjs';
import { FILE_EXT } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class EspacioAcademicoService extends HttpService {
  path: string;

  constructor(
    injector: Injector,
    httpClient: HttpClient,
    store: Store<AppState>
  ) {
    let path: string;
    store.select('globalData')
      .subscribe(data => path = data.pathEndpoints.CONSULTAS);
    super(injector, httpClient, `${path}espacios-academicos`);
    this.path = path;
  }

  buscarTodos(): Observable<any>  {
    return super.get();
  }

  buscarEspacioHorario(criterio: any): Observable<any> {
    let httpParams = super.getHttpParamsFromCriteria(criterio);
    return super.get('/estado', httpParams);
  }

  registrar(espacioAcademico: EspacioAcademico): Observable<any>  {
    return super.post(espacioAcademico);
  }

  actualizar(espacioAcademico: EspacioAcademico): Observable<any>  {
    return super.put(espacioAcademico, espacioAcademico.idEspacioAcademico);
  }

  eliminar(espacioAcademico: EspacioAcademico): Observable<any>  {
    return super.delete(espacioAcademico.idEspacioAcademico);
  }

  exportar(){
    return super.download(FILE_EXT.XLSX);
  }

}
