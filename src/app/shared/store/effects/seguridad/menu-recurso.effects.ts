import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { MenuRecursoService } from '../../../../seguridad/services';
import * as fromMenuRecurso from '../../actions/seguridad/menu-recurso.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { GlobalMessages } from '../../reducers/global.reducer';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MenuRecursoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private menuRecursoService: MenuRecursoService
  ) { }

  @Effect()
  GetBySistemaMenu$ = this.actions$
    .pipe(
      ofType(fromMenuRecurso.actions.GET_BY_MENU),
      switchMap((action: fromMenuRecurso.GetAllMenuRecurso) => {
        return this.menuRecursoService.buscarPorSistemaMenu(action.payload.idSistema, action.payload.idMenu)
          .pipe(
            map(res => {
              return new fromMenuRecurso.GetAllMenuRecursoSuccess(res)
            }),
            catchError(err => of(new fromMenuRecurso.GetAllMenuRecursoFail(err)))
          )
      })
    );

  @Effect()
  AddMenuRecurso$ = this.actions$
    .pipe(
      ofType(fromMenuRecurso.actions.ADD),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromMenuRecurso.AddMenuRecurso, GlobalMessages]) => {
        return this.menuRecursoService.registrar(action.payload)
          .pipe(
            map(res => {
              return new fromMenuRecurso.AddMenuRecursoSuccess({ data: res, message: messages.ADD_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(new fromMenuRecurso.AddMenuRecursoFail(err));
            })
          )
      })
    );

  @Effect()
  UpdateMenuRecurso$ = this.actions$
    .pipe(
      ofType(fromMenuRecurso.actions.UPDATE),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromMenuRecurso.UpdateMenuRecurso, GlobalMessages]) => {
        return this.menuRecursoService.actualizar(action.payload)
          .pipe(
            map(res => {
              return new fromMenuRecurso.UpdateMenuRecursoSuccess({ data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => of(new fromMenuRecurso.UpdateMenuRecursoFail(err)))
          )
      })
    );

  @Effect()
  DeleteMenuRecurso = this.actions$
    .pipe(
      ofType(fromMenuRecurso.actions.DELETE),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromMenuRecurso.UpdateMenuRecurso, GlobalMessages]) => {
        return this.menuRecursoService.eliminar(action.payload)
          .pipe(
            map(res => new fromMenuRecurso.DeleteMenuRecursoSuccess({ message: messages.DELETE_SUCCESS })),
            catchError((err: HttpErrorResponse) => of(new fromMenuRecurso.DeleteMenuRecursoFail(err)))
          )
      })
    );
}
