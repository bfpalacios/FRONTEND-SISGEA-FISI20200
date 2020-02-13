import { Injectable } from '@angular/core';
import { EspacioAcademicoService } from '../../../../mantenimiento/services/espacio-academico.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromEspacioAcademico from '../../actions/mantenimiento/espacio-academico.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { GlobalMessages } from '../../reducers/global.reducer';
import { addLabelToObjsArr, sortByAttr } from '../../../utils';

@Injectable()
export class EspacioAcademicoEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private EspacioAcademicoService: EspacioAcademicoService
  ) { }

  @Effect()
  GetAll$ = this.actions$
    .pipe(
      ofType(fromEspacioAcademico.actions.GET_ALL),
      switchMap(() => {
        return this.EspacioAcademicoService.buscarTodos()
          .pipe(
            map(res => {
              sortByAttr(res, 'idEspacioAcademico')
              addLabelToObjsArr(res, 'label', false, 'idEspacioAcademico', 'tipoEspacioAcademico');
              return new fromEspacioAcademico.GetAllEspacioAcademicoSuccess(res);
            }),
            catchError((err) => {
              return of(new fromEspacioAcademico.GetAllEspacioAcademicoFail(err));
            })
          )
      })
    );

  @Effect()
  AddEspacioAcademico$ = this.actions$
    .pipe(
      ofType(fromEspacioAcademico.actions.ADD),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromEspacioAcademico.AddEspacioAcademico, GlobalMessages]) => {
        return this.EspacioAcademicoService.registrar(action.payload)
          .pipe(
            map(res => {
              return new fromEspacioAcademico.AddEspacioAcademicoSuccess({ data: res, message: messages.ADD_SUCCESS });
            }),
            catchError(err => {
              return of(new fromEspacioAcademico.AddEspacioAcademicoFail(err))
            })
          )
      })
    );

  @Effect()
  UpdateEspacioAcademico$ = this.actions$
    .pipe(
      ofType(fromEspacioAcademico.actions.UPDATE),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromEspacioAcademico.UpdateEspacioAcademico, GlobalMessages]) => {
        return this.EspacioAcademicoService.actualizar(action.payload)
          .pipe(
            map(res => {
              return new fromEspacioAcademico.UpdateEspacioAcademicoSuccess({ data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError(err => {
              return of(new fromEspacioAcademico.UpdateEspacioAcademicoFail(err))
            })
          )
      })
    );

  @Effect()
  DeleteEspacioAcademico$ = this.actions$
    .pipe(
      ofType(fromEspacioAcademico.actions.DELETE),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromEspacioAcademico.DeleteEspacioAcademico, GlobalMessages]) => {
        return this.EspacioAcademicoService.eliminar(action.payload)
          .pipe(
            map(res => {
              return new fromEspacioAcademico.DeleteEspacioAcademicoSuccess({ message: messages.DELETE_SUCCESS });
            }),
            catchError(err => {
              return of(new fromEspacioAcademico.DeleteEspacioAcademicoFail(err))
            })
          )
      })
    );

  @Effect()
  Export$ = this.actions$
    .pipe(
      ofType(fromEspacioAcademico.actions.DOWNLOAD),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromEspacioAcademico.DownloadEspacioAcademico, GlobalMessages]) => {
        return this.EspacioAcademicoService.exportar()
          .pipe(
            map(res => new fromEspacioAcademico.DownloadEspacioAcademicoSuccess({ message: messages.DOWNLOAD_SUCCESS })),
            catchError(err => of(new fromEspacioAcademico.DownloadEspacioAcademicoFail(err)))
          )
      })
    );

}
