import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { PerfilRecursoService } from '../../../../seguridad/services';
import * as fromPerfilRecurso from '../../actions/seguridad/perfil-recurso.actions';
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { HttpErrorResponse } from "@angular/common/http";
import { GlobalMessages } from "../../reducers/global.reducer";
import { addLabelToObjsArr } from "../../../utils";

@Injectable()
export class PerfilRecursoEffects {
  constructor(
    private actions$: Actions, 
    private store$: Store<AppState>,
    private perfilRecursoService: PerfilRecursoService
  ) { 

  }

  @Effect()
  GetAll$ = this.actions$.pipe(
    ofType(fromPerfilRecurso.actions.GET_ALL),
    switchMap(() => {
      return this.perfilRecursoService.buscarTodos().pipe(
        map(res => {
          return new fromPerfilRecurso.GetAllPerfilRecursoSuccess(res);
        }),
        catchError((err) => {
          return of(new fromPerfilRecurso.GetAllPerfilRecursoFail(err));
        }));
    }));

  @Effect()
  AddPerfilRecurso$ = this.actions$.pipe(ofType(fromPerfilRecurso.actions.ADD),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromPerfilRecurso.AddPerfilRecurso, GlobalMessages]) => {
        return this.perfilRecursoService.registrar(action.payload).pipe(
          map(res => {
            return new fromPerfilRecurso.AddPerfilRecursoSuccess(
              { data: res, message: messages.ADD_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(new fromPerfilRecurso.AddPerfilRecursoFail(err))
          })
        );
      }));

  @Effect()
  UpdatePerfilRecurso$ = this.actions$.pipe(ofType(fromPerfilRecurso.actions.UPDATE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromPerfilRecurso.UpdatePerfilRecurso, GlobalMessages]) => {
        return this.perfilRecursoService.actualizar(
          action.payload).pipe(
            map(res => {
              return new fromPerfilRecurso.UpdatePerfilRecursoSuccess(
                { data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(
                new fromPerfilRecurso.UpdatePerfilRecursoFail(err))
            })
          );
      }));

  @Effect()
  DeletePerfilRecurso$ = this.actions$.pipe(ofType(fromPerfilRecurso.actions.DELETE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromPerfilRecurso.DeletePerfilRecurso, GlobalMessages]) => {
        return this.perfilRecursoService.eliminar(action.payload).pipe(
          map(res => {
            return new fromPerfilRecurso.DeletePerfilRecursoSuccess(
              { message: messages.DELETE_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              new fromPerfilRecurso.DeletePerfilRecursoFail(err))
          })
        );
      }));

}