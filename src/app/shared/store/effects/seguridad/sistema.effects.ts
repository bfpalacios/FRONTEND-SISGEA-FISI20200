import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { SistemaService } from '../../../../seguridad/services';
import * as fromSistema from '../../actions/seguridad/sistema.actions';
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { HttpErrorResponse } from "@angular/common/http";
import { GlobalMessages } from "../../reducers/global.reducer";
import { addLabelToObjsArr } from "../../../utils";

@Injectable()
export class SistemaEffects {
  constructor(private actions$: Actions, private store$: Store<AppState>,
    private sistemaService: SistemaService) { }

  @Effect()
  GetAll$ = this.actions$.pipe(ofType(fromSistema.actions.GET_ALL), switchMap(() => {
    return this.sistemaService.buscarTodos().pipe(
      map(res => {
        addLabelToObjsArr(res, 'label', false, 'idSistema', 'descripcionSistema');
        return new fromSistema.GetAllSistemaSuccess(res);
      }),
      catchError((err) => {
        return of(new fromSistema.GetAllSistemaFail(err));
      }));
  }));

  @Effect()
  GetEsAutLocal$ = this.actions$.pipe(ofType(fromSistema.actions.GET_ES_AUT_LOCAL), 
    switchMap((action: fromSistema.GetSistemaEsAutLocal) => {
    return this.sistemaService.esAutenticacionLocal(action.payload).pipe(
      map(res => {
        return new fromSistema.GetSistemaEsAutLocalSuccess({idSistema: action.payload, data: res});
      }),
      catchError((err) => {
        return of(new fromSistema.GetSistemaEsAutLocalFail(err));
      }));
  }));

  @Effect()
  AddSistema$ = this.actions$.pipe(ofType(fromSistema.actions.ADD),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromSistema.AddSistema, GlobalMessages]) => {
        return this.sistemaService.registrar(action.payload).pipe(
          map(res => {
            return new fromSistema.AddSistemaSuccess(
              { data: res, message: messages.ADD_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(new fromSistema.AddSistemaFail(err))
          })
        );
      }));

  @Effect()
  UpdateSistema$ = this.actions$.pipe(ofType(fromSistema.actions.UPDATE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromSistema.UpdateSistema, GlobalMessages]) => {
        return this.sistemaService.actualizar(
          action.payload).pipe(
            map(res => {
              return new fromSistema.UpdateSistemaSuccess(
                { data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(
                new fromSistema.UpdateSistemaFail(err))
            })
          );
      }));

  @Effect()
  DeleteSistema$ = this.actions$.pipe(ofType(fromSistema.actions.DELETE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromSistema.DeleteSistema, GlobalMessages]) => {
        return this.sistemaService.eliminar(action.payload).pipe(
          map(res => {
            return new fromSistema.DeleteSistemaSuccess(
              { message: messages.DELETE_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              new fromSistema.DeleteSistemaFail(err))
          })
        );
      }));

}