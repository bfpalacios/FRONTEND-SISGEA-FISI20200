import { Injectable } from '@angular/core';
import { SolicitanteService } from '../../../../mantenimiento/services/solicitante.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromSolicitante from '../../actions/mantenimiento/solicitante.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { GlobalMessages } from '../../reducers/global.reducer';
import { addLabelToObjsArr, sortByAttr } from '../../../utils';

@Injectable()
export class SolicitanteEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private SolicitanteService: SolicitanteService
  ) { }

  @Effect()
  GetAll$ = this.actions$
    .pipe(
      ofType(fromSolicitante.actions.GET_ALL),
      switchMap(() => {
        return this.SolicitanteService.buscarTodos()
          .pipe(
            map(res => {
              sortByAttr(res, 'idSolicitante')
              addLabelToObjsArr(res, 'label', false, 'idSolicitante', 'tipoSolicitante');
              return new fromSolicitante.GetAllSolicitanteSuccess(res);
            }),
            catchError((err) => {
              return of(new fromSolicitante.GetAllSolicitanteFail(err));
            })
          )
      })
    );

  @Effect()
  AddSolicitante$ = this.actions$
    .pipe(
      ofType(fromSolicitante.actions.ADD),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromSolicitante.AddSolicitante, GlobalMessages]) => {
        return this.SolicitanteService.registrar(action.payload)
          .pipe(
            map(res => {
              return new fromSolicitante.AddSolicitanteSuccess({ data: res, message: messages.ADD_SUCCESS });
            }),
            catchError(err => {
              return of(new fromSolicitante.AddSolicitanteFail(err))
            })
          )
      })
    );

  @Effect()
  UpdateSolicitante$ = this.actions$
    .pipe(
      ofType(fromSolicitante.actions.UPDATE),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromSolicitante.UpdateSolicitante, GlobalMessages]) => {
        return this.SolicitanteService.actualizar(action.payload)
          .pipe(
            map(res => {
              return new fromSolicitante.UpdateSolicitanteSuccess({ data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError(err => {
              return of(new fromSolicitante.UpdateSolicitanteFail(err))
            })
          )
      })
    );

  @Effect()
  DeleteSolicitante$ = this.actions$
    .pipe(
      ofType(fromSolicitante.actions.DELETE),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromSolicitante.DeleteSolicitante, GlobalMessages]) => {
        return this.SolicitanteService.eliminar(action.payload)
          .pipe(
            map(res => {
              return new fromSolicitante.DeleteSolicitanteSuccess({ message: messages.DELETE_SUCCESS });
            }),
            catchError(err => {
              return of(new fromSolicitante.DeleteSolicitanteFail(err))
            })
          )
      })
    );

  @Effect()
  Export$ = this.actions$
    .pipe(
      ofType(fromSolicitante.actions.DOWNLOAD),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromSolicitante.DownloadSolicitante, GlobalMessages]) => {
        return this.SolicitanteService.exportar()
          .pipe(
            map(res => new fromSolicitante.DownloadSolicitanteSuccess({ message: messages.DOWNLOAD_SUCCESS })),
            catchError(err => of(new fromSolicitante.DownloadSolicitanteFail(err)))
          )
      })
    );

}
