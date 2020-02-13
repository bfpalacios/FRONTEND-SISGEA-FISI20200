import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import * as fromAuth from '../../actions/auth/auth.actions';
import { map, switchMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { KEY_TOKEN, KEY_MENU_OPTS, getMenuSidebar } from '../../../utils';
import { StorageService } from '../../../services/storage/storage.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private storageService: StorageService
  ) { }

  @Effect()
  LogIn$ = this.actions$
    .pipe(
      ofType(fromAuth.authActions.LOGIN),
      map((action: fromAuth.Login) => action.payload),
      switchMap(payload => {
        return this.authService.logIn(payload)
          .pipe(
            map((res: HttpResponse<any>) => {
              const auth = res.headers.get('Authorization');
              const token = auth.split(' ')[1];
              const payload = this.jwtHelper.decodeToken(token);
              const permisos = JSON.parse(payload.autorizaciones);
              const options = getMenuSidebar(res.body[0].subMenusArboles);
              /*//console.log('Opciones', res);
              //console.log('Permisos', permisos);
              //console.log('menu', options);*/
              return new fromAuth.LoginSuccess({
                token: token, options: options,
                user: payload.sub, permisos: permisos
              });
            }),
            catchError((err) => {
              return of(new fromAuth.LoginFail(err.error.mensajeUsuario || 'Ocurrió un error no identificado.'));
            }));
      }));

  @Effect({ dispatch: false })
  LogInSuccess$ = this.actions$
    .pipe(
      ofType(fromAuth.authActions.LOGIN_SUCCESS),
      map((data: any) => data.payload),
      tap((payload: any) => {
        this.storageService.setItem(KEY_TOKEN, payload.token);
        this.storageService.setItem(KEY_MENU_OPTS, btoa(JSON.stringify(payload.options)));
        this.router.navigate(['/dashboard']);
      })
    );

  @Effect({ dispatch: false })
  LogInFailure$ = this.actions$
    .pipe(
      ofType(fromAuth.authActions.LOGIN_FAIL),
      map((data: any) => data.payload),
      tap((payload: any) => {
        this.storageService.clear();
        this.router.navigate(['/login']);
      })
    );

  @Effect()
  LogOut$ = this.actions$
    .pipe(
      ofType(fromAuth.authActions.LOGOUT),
      switchMap(() => {
        this.storageService.clear();
        this.router.navigate(['/login']);
        return of(new fromAuth.LogoutSuccess());
      })
    )

  @Effect()
  StartApp$ = this.actions$
    .pipe(
      ofType(fromAuth.authActions.INIT_APP),
      mergeMap(() => {
        const token = this.storageService.getItem(KEY_TOKEN);
        const menuBase64 = this.storageService.getItem(KEY_MENU_OPTS);
        const payload = this.jwtHelper.decodeToken(token);
        const permisos = JSON.parse(payload.autorizaciones);
        return [
          new fromAuth.SetUser(payload.sub),
          new fromAuth.SetPermissions(permisos),
          new fromAuth.SetMenuOptions(JSON.parse(atob(menuBase64)))
        ]
      }),
      catchError(() => {
        this.storageService.clear();
        return of(new fromAuth.StartAppInitializerFail())
      })
    )
}
