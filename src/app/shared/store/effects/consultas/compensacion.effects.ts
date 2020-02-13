import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { CompensacionService } from '../../../../consultas/service/compensacion.service';
import * as fromCompensacion from '../../actions/consultas/compensacion.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
@Injectable()
export class CompensacionEffects{
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private compensacionService: CompensacionService
  ) { }

  @Effect()
  GetPaginada$ = this.actions$
    .pipe(
      ofType(fromCompensacion.actions.GET_CRITERIO_PAGINADO),
      switchMap((action: fromCompensacion.GetCriterioCompensacion) => {
        return this.compensacionService.buscarPorCriterios(action.payload)
          .pipe(
            map(res => {
              return new fromCompensacion.GetCriterioCompensacionSuccess(res);
            }),
            catchError((err) => {
              return of(new fromCompensacion.GetCriterioCompensacionFail(err));
            })
          )
      })
    );

    @Effect()
    GetDetalleCompensacion$ = this.actions$
      .pipe(
        ofType(fromCompensacion.actions.GET_DETALLE),
        switchMap((action: fromCompensacion.GetDetalleCompensacion) => {
          return this.compensacionService.buscarPorSecuenciaCompensacion(action.payload)
            .pipe(
              map(res => {
                return new fromCompensacion.GetDetalleCompensacionSuccess(res);
              }),
              catchError((err) => {
                return of(new fromCompensacion.GetDetalleCompensacionFail(err));
              })
            )
        })
      );


}
