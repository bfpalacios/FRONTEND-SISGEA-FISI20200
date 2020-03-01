import { Injectable, Injector, Inject } from '@angular/core';
import { HttpService } from '../../shared';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SEC_CONTEXT_PATH } from '../../shared/utils';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, store: Store<AppState>, @Inject(SEC_CONTEXT_PATH) context: string) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_GENERAL);
    super(injector, httpClient, 'perfilUsuario', context);
  }

  buscarTodos(): Observable<any> {
    return super.get();
  }

  registrar(obj: any): Observable<any> {
    return super.post(obj);
  }

  actualizar(obj: any): Observable<any> {
    return super.put(obj, obj.idUsuarioPerfil);
  }

  eliminar(obj: any): Observable<any> {
    return super.delete(obj.idUsuarioPerfil);
  }

}