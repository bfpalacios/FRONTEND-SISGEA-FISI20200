import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { ParametroSeguridadService } from "../../../../seguridad/services";
import * as fromParametroSeguridad from "../../actions/seguridad/parametro-seguridad.actions";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { addLabelToObjsArr } from "../../../utils";
import { of } from "rxjs";
import { GlobalMessages } from "../../reducers/global.reducer";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class ParametroSeguridadEffects {

  constructor(private actions$: Actions, private store$: Store<AppState>,
    private parametroSeguridadService: ParametroSeguridadService) {
  }

  @Effect()
  GetAll$ = this.actions$.pipe(ofType(fromParametroSeguridad.actions.GET_ALL), switchMap(() => {
    return this.parametroSeguridadService.buscarTodos().pipe(
      map(res => {
        addLabelToObjsArr(res, 'label', false, 'idParametroSeguridad', 'descripcionParamSeg');
        return new fromParametroSeguridad.GetAllParametroSeguridadSuccess(res);
      }),
      catchError((err) => {
        return of(new fromParametroSeguridad.GetAllParametroSeguridadFail(err));
      }));
  }));

  @Effect()
  AddParametroSeguridad$ = this.actions$.pipe(ofType(fromParametroSeguridad.actions.ADD),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromParametroSeguridad.AddParametroSeguridad, GlobalMessages]) => {
        return this.parametroSeguridadService.registrar(action.payload).pipe(
          map(res => {
            return new fromParametroSeguridad.AddParametroSeguridadSuccess(
              { data: res, message: messages.ADD_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(new fromParametroSeguridad.AddParametroSeguridadFail(err))
          })
        );
      }));

  @Effect()
  UpdateParametroSeguridad$ = this.actions$.pipe(ofType(fromParametroSeguridad.actions.UPDATE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromParametroSeguridad.UpdateParametroSeguridad, GlobalMessages]) => {
        return this.parametroSeguridadService.actualizar(
          action.payload).pipe(
            map(res => {
              return new fromParametroSeguridad.UpdateParametroSeguridadSuccess(
                { data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(
                new fromParametroSeguridad.UpdateParametroSeguridadFail(err))
            })
          );
      }));

  @Effect()
  DeleteParametroSeguridad$ = this.actions$.pipe(ofType(fromParametroSeguridad.actions.DELETE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromParametroSeguridad.DeleteParametroSeguridad, GlobalMessages]) => {
        return this.parametroSeguridadService.eliminar(action.payload).pipe(
          map(res => {
            return new fromParametroSeguridad.DeleteParametroSeguridadSuccess(
              { message: messages.DELETE_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              new fromParametroSeguridad.DeleteParametroSeguridadFail(err))
          })
        );
      }));
}
