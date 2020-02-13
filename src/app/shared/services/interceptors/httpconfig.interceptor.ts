import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from "@angular/router";
import { catchError } from "rxjs/internal/operators";

import { Observable, of } from 'rxjs';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { LoginFail } from '../../store/actions/auth/auth.actions';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../storage/storage.service';
import { KEY_TOKEN } from '../../utils';
import { environment } from '../../../../environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
    private store: Store<AppState>,
    private toastrService: ToastrService,
    private storageService: StorageService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.match(/auth/) && !request.url.match(/assets/)) {
      const token: string = this.storageService.getItem(KEY_TOKEN);
      if (token && token !== '') {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }
    }
    /*if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }*/
    if (!request.headers.has('Accept')) {
      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    }
    request = request.clone({ withCredentials: true });
    if(request.url.match(/auth/) || request.url.match(/assets/)){
      request = request.clone({ headers: request.headers.delete('Authorization') });
    }
    return next.handle(request).pipe(catchError((error, caught) => {
      console.error(error);
      this.handleError(error);
      return of(error);
    }) as any);
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 500) {
      const error = err.error;
      if (error) {
        switch (error.codigo) {
          case 17:
          case 18:
            this.toastrService.error(err.error.mensajeEjecucion || 'Ocurrió un error no identificado.', 'Error');
            break;
          default:
            this.toastrService.error(err.error.mensajeUsuario || 'Ocurrió un error no identificado.', 'Error');
        }
      }
    }
    if (err.status === 404) {
      this.toastrService.error(err.error.mensajeUsuario || 'Servicio no encontrado.', 'Error');
    }
    if (err.status === 403) {
      const error = err.error;
      this.toastrService.error(error.mensajeUsuario || 'Acceso denegado.', 'Error');
      if (error) {
        switch (error.codigo) {
          case 11:
            this.store.dispatch(new LoginFail(err.error.mensajeUsuario));
            break;
        }
      } else {
        this.store.dispatch(new LoginFail(err.error.mensajeUsuario));
      }
    }
    if (err.status === 401) {
      this.store.dispatch(new LoginFail(err.error.mensajeUsuario || 'No autorizado.'));
      //this._router.navigate([`/login`]);
      //return of(err.message);
    }
    if (err.status == 409) {
      this.toastrService.error(err.error.mensajeUsuario || 'Conflicto.', 'Error');
    }
    if (err.status === 0) {
      this.toastrService.error(err.error.mensajeUsuario || 'No se pudo establecer conexión.', 'Error');
    }
    throw err;
  }

}
