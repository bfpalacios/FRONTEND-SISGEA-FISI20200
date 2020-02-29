import { Injectable, Injector, Inject } from '@angular/core';
import { HttpService } from '../../shared';
import { HttpClient } from '@angular/common/http';
import { Perfil } from '../models';
import { Observable } from 'rxjs';
import { SEC_CONTEXT_PATH } from '../../shared/utils';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';

@Injectable({
  providedIn: 'root'
})
export class PerfilService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, store: Store<AppState>, @Inject(SEC_CONTEXT_PATH) context: string) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_GENERAL);
    super(injector, httpClient, 'perfiles', context);
  }

  buscarTodos(): Observable<any> {
    return super.get();
  }

  registrar(perfil: Perfil): Observable<any> {
    return super.post(perfil);
  }

  actualizar(perfil: Perfil): Observable<any> {
    return super.put(perfil, perfil.idPerfil);
  }

  eliminar(perfil: Perfil): Observable<any> {
    return super.delete(perfil.idPerfil);
  }

}