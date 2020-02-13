import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { RecursoService } from '../../../../seguridad/services';
import * as fromRecurso from '../../actions/seguridad/recurso.actions';
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { HttpErrorResponse } from "@angular/common/http";
import { GlobalMessages } from "../../reducers/global.reducer";
import { addLabelToObjsArr } from "../../../utils";

@Injectable()
export class RecursoEffects {
  constructor(private actions$: Actions, private store$: Store<AppState>,
    private sistemaService: RecursoService) { }

  @Effect()
  GetAll$ = this.actions$.pipe(ofType(fromRecurso.actions.GET_ALL), switchMap(() => {
    return this.sistemaService.buscarTodos().pipe(
      map(res => {
        addLabelToObjsArr(res, 'label', false, 'idRecurso', 'descripcionRecurso');
        return new fromRecurso.GetAllRecursoSuccess(res);
      }),
      catchError((err) => {
        return of(new fromRecurso.GetAllRecursoFail(err));
      }));
  }));
  @Effect()
  AddRecurso$ = this.actions$.pipe(ofType(fromRecurso.actions.ADD),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromRecurso.AddRecurso, GlobalMessages]) => {
        return this.sistemaService.registrar(action.payload).pipe(
          map(res => {
            return new fromRecurso.AddRecursoSuccess(
              { data: res, message: messages.ADD_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(new fromRecurso.AddRecursoFail(err))
          })
        );
      }));

  @Effect()
  UpdateRecurso$ = this.actions$.pipe(ofType(fromRecurso.actions.UPDATE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromRecurso.UpdateRecurso, GlobalMessages]) => {
        return this.sistemaService.actualizar(
          action.payload).pipe(
            map(res => {
              return new fromRecurso.UpdateRecursoSuccess(
                { data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(
                new fromRecurso.UpdateRecursoFail(err))
            })
          );
      }));

  @Effect()
  DeleteRecurso$ = this.actions$.pipe(ofType(fromRecurso.actions.DELETE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromRecurso.DeleteRecurso, GlobalMessages]) => {
        return this.sistemaService.eliminar(action.payload).pipe(
          map(res => {
            return new fromRecurso.DeleteRecursoSuccess(
              { message: messages.DELETE_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              new fromRecurso.DeleteRecursoFail(err))
          })
        );
      }));

}