import {HttpService} from '../../shared';
import {Inject, Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppState} from "../../shared/store/app.reducers";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {UsuarioSeg} from "../models";
import {SEC_CONTEXT_PATH} from "../../shared/utils";

@Injectable({
              providedIn: 'root'
            })
export class UsuarioService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, store: Store<AppState>,
              @Inject(SEC_CONTEXT_PATH) context: string) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_SEGURIDAD);
    super(injector, httpClient, 'usuarios', context);
  }

  buscarTodos(): Observable<any> {
    return super.get();
  }

  registrar(usuario: UsuarioSeg): Observable<any> {
    return super.post(usuario);
  }

  actualizar(usuario: UsuarioSeg): Observable<any> {
    return super.put(usuario, usuario.username);
  }

  eliminar(usuario: UsuarioSeg): Observable<any> {
    return super.delete(usuario.username);
  }
}
