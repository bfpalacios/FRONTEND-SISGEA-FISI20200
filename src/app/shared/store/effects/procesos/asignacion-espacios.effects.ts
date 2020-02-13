import { Injectable } from '@angular/core';
import { AsignacionEspaciosService } from '../../../../procesos/services/asignacion-espacios.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromAsignacionEspacios from '../../actions/procesos/asignacion-espacios.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { GlobalMessages } from '../../reducers/global.reducer';
import { addLabelToObjsArr, sortByAttr } from '../../../utils';

@Injectable()
export class AsignacionEspaciosEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private asignacionEspaciosService: AsignacionEspaciosService
  ) { }

  @Effect()
  GetAll$ = this.actions$
    .pipe(
      ofType(fromAsignacionEspacios.actions.GET_ALL),
      switchMap(() => {
        return this.asignacionEspaciosService.buscarTodos()
          .pipe(
            map(res => {
              sortByAttr(res, 'idAsignacionEspacios')
              addLabelToObjsArr(res, 'label', false, 'idAsignacionEspacios', 'descripcionAsignacionEspacios');
              return new fromAsignacionEspacios.GetAllAsignacionEspaciosSuccess(res);
            }),
            catchError((err) => {
              return of(new fromAsignacionEspacios.GetAllAsignacionEspaciosFail(err));
            })
          )
      })
    );


  @Effect()
  UpdateAsignacionEspacios$ = this.actions$
    .pipe(
      ofType(fromAsignacionEspacios.actions.UPDATE),
      withLatestFrom(this.store$.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromAsignacionEspacios.UpdateAsignacionEspacios, GlobalMessages]) => {
        return this.asignacionEspaciosService.actualizar(action.payload)
          .pipe(
            map(res => {
              return new fromAsignacionEspacios.UpdateAsignacionEspaciosSuccess({ data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError(err => {
              return of(new fromAsignacionEspacios.UpdateAsignacionEspaciosFail(err))
            })
          )
      })
    );

}
