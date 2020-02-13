import { Injectable } from '@angular/core';
import { OrigenService } from '../../../../mantenimiento/services/origen.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromOrigen from '../../actions/mantenimiento/origen.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { GlobalMessages } from '../../reducers/global.reducer';
import { addLabelToObjsArr, sortByAttr } from '../../../utils';

@Injectable()
export class OrigenEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private OrigenService: OrigenService
  ) { }

  @Effect()
  GetAll$ = this.actions$
    .pipe(
      ofType(fromOrigen.actions.GET_ALL),
      switchMap(() => {
        return this.OrigenService.buscarTodos()
          .pipe(
            map(res => {
              sortByAttr(res, 'idOrigen')
              addLabelToObjsArr(res, 'label', false, 'idOrigen', 'descripcionOrigen');
              return new fromOrigen.GetAllOrigenSuccess(res);
            }),
            catchError((err) => {
              return of(new fromOrigen.GetAllOrigenFail(err));
            })
          )
      })
    );

  @Effect()
  AddOrigen$ = this.actions$
    .pipe(
      ofType(fromOrigen.actions.ADD),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromOrigen.AddOrigen, GlobalMessages]) => {
        return this.OrigenService.registrar(action.payload)
          .pipe(
            map(res => {
              return new fromOrigen.AddOrigenSuccess({ data: res, message: messages.ADD_SUCCESS });
            }),
            catchError(err => {
              return of(new fromOrigen.AddOrigenFail(err))
            })
          )
      })
    );

  @Effect()
  UpdateOrigen$ = this.actions$
    .pipe(
      ofType(fromOrigen.actions.UPDATE),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromOrigen.UpdateOrigen, GlobalMessages]) => {
        return this.OrigenService.actualizar(action.payload)
          .pipe(
            map(res => {
              return new fromOrigen.UpdateOrigenSuccess({ data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError(err => {
              return of(new fromOrigen.UpdateOrigenFail(err))
            })
          )
      })
    );

  @Effect()
  DeleteOrigen$ = this.actions$
    .pipe(
      ofType(fromOrigen.actions.DELETE),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromOrigen.DeleteOrigen, GlobalMessages]) => {
        return this.OrigenService.eliminar(action.payload)
          .pipe(
            map(res => {
              return new fromOrigen.DeleteOrigenSuccess({ message: messages.DELETE_SUCCESS });
            }),
            catchError(err => {
              return of(new fromOrigen.DeleteOrigenFail(err))
            })
          )
      })
    );

  @Effect()
  Export$ = this.actions$
    .pipe(
      ofType(fromOrigen.actions.DOWNLOAD),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromOrigen.DownloadOrigen, GlobalMessages]) => {
        return this.OrigenService.exportar()
          .pipe(
            map(res => new fromOrigen.DownloadOrigenSuccess({ message: messages.DOWNLOAD_SUCCESS })),
            catchError(err => of(new fromOrigen.DownloadOrigenFail(err)))
          )
      })
    );

}
