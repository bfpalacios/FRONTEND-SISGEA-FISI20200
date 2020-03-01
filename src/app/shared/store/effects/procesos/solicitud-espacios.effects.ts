import { Injectable } from '@angular/core';
import { SolicitudEspaciosService } from '../../../../procesos/services/solicitud-espacios.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromSolicitudEspacios from '../../actions/procesos/solicitud-espacios.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { GlobalMessages } from '../../reducers/global.reducer';
import { addLabelToObjsArr, sortByAttr } from '../../../utils';

@Injectable()
export class SolicitudEspaciosEffects {
  SolicitudEspaciosService: any;

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private asignacionEspaciosService: SolicitudEspaciosService
  ) { }

  @Effect()
  GetAll$ = this.actions$
    .pipe(
      ofType(fromSolicitudEspacios.actions.GET_ALL),
      switchMap(() => {
        return this.asignacionEspaciosService.buscarTodos()
          .pipe(
            map(res => {
              sortByAttr(res, 'idSolicitudEspacios')
              addLabelToObjsArr(res, 'label', false, 'idSolicitudEspacios', 'descripcionSolicitudEspacios');
              return new fromSolicitudEspacios.GetAllSolicitudEspaciosSuccess(res);
            }),
            catchError((err) => {
              return of(new fromSolicitudEspacios.GetAllSolicitudEspaciosFail(err));
            })
          )
      })
    );

    @Effect()
  UpdateEspacioAcademico$ = this.actions$
    .pipe(
      ofType(fromSolicitudEspacios.actions.UPDATE),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromSolicitudEspacios.AprobarSolicitudEspacios, GlobalMessages]) => {
        return this.SolicitudEspaciosService.aprobar(action.payload)
          .pipe(
            map(res => {
              return new fromSolicitudEspacios.AprobarSolicitudEspaciosSuccess({ data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError(err => {
              return of(new fromSolicitudEspacios.AprobarSolicitudEspaciosFail(err))
            })
          )
      })
    );

}
