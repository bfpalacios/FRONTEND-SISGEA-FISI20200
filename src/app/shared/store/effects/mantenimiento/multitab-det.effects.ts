import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { MultitabDetService } from '../../../../mantenimiento/services';
import * as fromMultitab from '../../actions/mantenimiento/multitab-det.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { GlobalMessages } from '../../reducers/global.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { addLabelToObjsArr} from '../../../utils';

@Injectable()
export class MultitabDetEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private multitabDetService: MultitabDetService
  ) { }

  @Effect()
  GetAll$ = this.actions$
    .pipe(
      ofType(fromMultitab.actions.GET_ALL),
      switchMap(() => {
        return this.multitabDetService.buscarTodos()
          .pipe(
            map(res => {

              return new fromMultitab.GetAllMultitabDetSuccess(res);
            }),
            catchError(err => of(new fromMultitab.GetAllMultitabDetFail(err)))
          )
      })
    );

  @Effect()
  GetByMultitabCab$ = this.actions$
    .pipe(
      ofType(fromMultitab.actions.GET_BY_MULTITABCAB),
      switchMap((action: fromMultitab.GetByMultitabCab) => {
        return this.multitabDetService.buscarPorMultitabCab(action.payload)
          .pipe(
            map(res =>{
              addLabelToObjsArr(res, 'label', false, 'idMultitabDet', 'descripcionItem');
              return new fromMultitab.GetByMultitabCabSuccess(res)
            }),
            catchError(err => of(new fromMultitab.GetByMultitabCabFail(err)))
          )
      })
    );

  @Effect()
  GetByMultitabCabB$ = this.actions$
    .pipe(
      ofType(fromMultitab.actions.GET_BY_MULTITABCAB_B),
      switchMap((action: fromMultitab.GetByMultitabCabB) => {
        return this.multitabDetService.buscarPorMultitabCabB(action.payload)
          .pipe(
            map(res =>{
              addLabelToObjsArr(res, 'label', false, 'idMultitabDet', 'descripcionItem');
              return new fromMultitab.GetByMultitabCabBSuccess(res)
            }),
            catchError(err => of(new fromMultitab.GetByMultitabCabBFail(err)))
          )
      })
    );

  @Effect()
  GetEstadoTransaccion$ = this.actions$
    .pipe(
      ofType(fromMultitab.actions.GET_ESTADO_TRANSACCION),
      switchMap((action: fromMultitab.GetEstadoTransaccion) => {
        return this.multitabDetService.buscarEstadoTransaccion(action.payload)
          .pipe(
            map(res => {
              addLabelToObjsArr(res, 'label', false, 'idMultitabDet', 'descripcionItem');
              return new fromMultitab.GetEstadoTransaccionSuccess(res);
            }),
            catchError((err) => of(new fromMultitab.GetEstadoTransaccionFail(err)))
          )
      })
    );

  @Effect()
  AddMultitabDet$ = this.actions$
    .pipe(
      ofType(fromMultitab.actions.ADD),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromMultitab.AddMultitabDet, GlobalMessages]) => {
        return this.multitabDetService.registrar(action.payload)
          .pipe(
            map(res => {
              return new fromMultitab.AddMultitabDetSuccess({ data: res, message: messages.ADD_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(new fromMultitab.AddMultitabDetFail(err));
            })
          )
      })
    );

  @Effect()
  UpdateMultitabDet$ = this.actions$
    .pipe(
      ofType(fromMultitab.actions.UPDATE),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromMultitab.UpdateMultitabDet, GlobalMessages]) => {
        return this.multitabDetService.actualizar(action.payload)
          .pipe(
            map(res => {
              return new fromMultitab.UpdateMultitabDetSuccess({ data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => of(new fromMultitab.UpdateMultitabDetFail(err)))
          )
      })
    );

  @Effect()
  DeleteMultitabDet = this.actions$
    .pipe(
      ofType(fromMultitab.actions.DELETE),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromMultitab.UpdateMultitabDet, GlobalMessages]) => {
        return this.multitabDetService.eliminar(action.payload)
          .pipe(
            map(res => new fromMultitab.DeleteMultitabDetSuccess({ message: messages.DELETE_SUCCESS })),
            catchError((err: HttpErrorResponse) => of(new fromMultitab.DeleteMultitabDetFail(err)))
          )
      })
    );
}
