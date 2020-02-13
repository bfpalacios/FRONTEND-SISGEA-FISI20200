import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PerfilMenuRecursoService } from '../../../../seguridad/services';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as fromAsignacionPermisos from '../../actions/seguridad/asignacion-permisos.actions';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { GlobalMessages } from '../../reducers/global.reducer';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AsignacionPermisosEffects {

  constructor(private actions$: Actions, private store$: Store<AppState>,
    private perfilMenuRecursoService: PerfilMenuRecursoService) { }

  @Effect()
  GetBySistemaPerfil$ = this.actions$.pipe(ofType(fromAsignacionPermisos.actions.GET_BY_SISTEMA_PERFIL),
    switchMap((action: fromAsignacionPermisos.GetMenuBySistemaPerfil) => {
      return this.perfilMenuRecursoService.buscarAsignacionesPorSistemaPerfil(action.payload.idSistema,
        action.payload.idPerfil, action.payload.presentacion).pipe(
          map(res => {
            return new fromAsignacionPermisos.GetMenuBySistemaPerfilSuccess(res);
          }),
          catchError((err) => {
            return of(new fromAsignacionPermisos.GetMenuBySistemaPerfilFail(err));
          }));
    }));

  @Effect()
  AddPerfilMenuRecursos$ = this.actions$.pipe(ofType(fromAsignacionPermisos.actions.ADD),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromAsignacionPermisos.AddPerfilMenuRecurso, GlobalMessages]) => {
        return this.perfilMenuRecursoService.registrar(action.payload.idSistema,
            action.payload.idPerfil, action.payload.data).pipe(
          map(res => {
            return new fromAsignacionPermisos.AddPerfilMenuRecursoSuccess(
              { data: res, message: messages.ADD_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(new fromAsignacionPermisos.AddPerfilMenuRecursoFail(err))
          })
        );
      }));
}