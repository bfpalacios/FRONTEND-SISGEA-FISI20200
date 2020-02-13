import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { MultitabCabService } from '../../../../mantenimiento/services';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import * as fromMultitab from '../../actions/mantenimiento/multitab-cab.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { GlobalMessages } from '../../reducers/global.reducer';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MultitabCabEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private multitabCabService: MultitabCabService
  ) { }

  @Effect()
  GetAll$ = this.actions$
    .pipe(
      ofType(fromMultitab.actions.GET_ALL),
      switchMap(() => {
        return this.multitabCabService.buscarTodos()
          .pipe(
            map(res => {
              return new fromMultitab.GetAllMultitabCabSuccess(res);
            }),
            catchError(err => {
              return of(new fromMultitab.GetAllMultitabCabFail(err));
            })
          )
      })
    );

  @Effect()
  AddMultitabCab$ = this.actions$
    .pipe(
      ofType(fromMultitab.actions.ADD),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromMultitab.AddMultitabCab, GlobalMessages]) => {
        return this.multitabCabService.registrar(action.payload)
          .pipe(
            map(res => {
              return new fromMultitab.AddMultitabCabSuccess({ data: res, message: messages.ADD_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(new fromMultitab.AddMultitabCabFail(err));
            })
          )
      })
    );

  @Effect()
  UpdateMultitabCab$ = this.actions$
    .pipe(
      ofType(fromMultitab.actions.UPDATE),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromMultitab.UpdateMultitabCab, GlobalMessages]) => {
        return this.multitabCabService.actualizar(action.payload)
          .pipe(
            map(res => {
              return new fromMultitab.UpdateMultitabCabSuccess({ data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => of(new fromMultitab.UpdateMultitabCabFail(err)))
          )
      })
    );

  @Effect()
  DeleteMultitabCab = this.actions$
    .pipe(
      ofType(fromMultitab.actions.DELETE),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromMultitab.UpdateMultitabCab, GlobalMessages]) => {
        return this.multitabCabService.eliminar(action.payload)
          .pipe(
            map(res => new fromMultitab.DeleteMultitabCabSuccess({ message: messages.DELETE_SUCCESS })),
            catchError((err: HttpErrorResponse) => of(new fromMultitab.DeleteMultitabCabFail(err)))
          )
      })
    );

}
