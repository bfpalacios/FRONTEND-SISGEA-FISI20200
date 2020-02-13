import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { TipoAutenticacionService } from "../../../../seguridad/services";
import * as fromTipoAutenticacion from "../../actions/seguridad/tipo-autenticacion.actions";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { addLabelToObjsArr } from "../../../utils";
import { of } from "rxjs";
import { GlobalMessages } from "../../reducers/global.reducer";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class TipoAutenticacionEffects {

  constructor(private actions$: Actions, private store$: Store<AppState>,
    private tipoAutenticacionService: TipoAutenticacionService) {
  }

  @Effect()
  GetAll$ = this.actions$.pipe(ofType(fromTipoAutenticacion.actions.GET_ALL), switchMap(() => {
    return this.tipoAutenticacionService.buscarTodos().pipe(
      map(res => {
        addLabelToObjsArr(res, 'label', false, 'idTipoAutenticacion', 'descripcionTipoAutenticacion');
        return new fromTipoAutenticacion.GetAllTipoAutenticacionSuccess(res);
      }),
      catchError((err) => {
        return of(new fromTipoAutenticacion.GetAllTipoAutenticacionFail(err));
      }));
  }));

  @Effect()
  AddTipoAutenticacion$ = this.actions$.pipe(ofType(fromTipoAutenticacion.actions.ADD),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromTipoAutenticacion.AddTipoAutenticacion, GlobalMessages]) => {
        return this.tipoAutenticacionService.registrar(action.payload).pipe(
          map(res => {
            return new fromTipoAutenticacion.AddTipoAutenticacionSuccess(
              { data: res, message: messages.ADD_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(new fromTipoAutenticacion.AddTipoAutenticacionFail(err))
          })
        );
      }));

  @Effect()
  UpdateTipoAutenticacion$ = this.actions$.pipe(ofType(fromTipoAutenticacion.actions.UPDATE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromTipoAutenticacion.UpdateTipoAutenticacion, GlobalMessages]) => {
        return this.tipoAutenticacionService.actualizar(
          action.payload).pipe(
            map(res => {
              return new fromTipoAutenticacion.UpdateTipoAutenticacionSuccess(
                { data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(
                new fromTipoAutenticacion.UpdateTipoAutenticacionFail(err))
            })
          );
      }));

  @Effect()
  DeleteTipoAutenticacion$ = this.actions$.pipe(ofType(fromTipoAutenticacion.actions.DELETE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromTipoAutenticacion.DeleteTipoAutenticacion, GlobalMessages]) => {
        return this.tipoAutenticacionService.eliminar(action.payload).pipe(
          map(res => {
            return new fromTipoAutenticacion.DeleteTipoAutenticacionSuccess(
              { message: messages.DELETE_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              new fromTipoAutenticacion.DeleteTipoAutenticacionFail(err))
          })
        );
      }));
}
