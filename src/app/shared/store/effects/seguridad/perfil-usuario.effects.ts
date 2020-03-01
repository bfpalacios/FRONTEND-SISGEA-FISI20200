import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { PerfilUsuarioService } from '../../../../seguridad/services';
import * as fromPerfilUsuario from '../../actions/seguridad/perfil-usuario.actions';
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { HttpErrorResponse } from "@angular/common/http";
import { GlobalMessages } from "../../reducers/global.reducer";
import { addLabelToObjsArr } from "../../../utils";

@Injectable()
export class PerfilUsuarioEffects {
  constructor(
    private actions$: Actions, 
    private store$: Store<AppState>,
    private perfilUsuarioService: PerfilUsuarioService
  ) { 

  }

  @Effect()
  GetAll$ = this.actions$.pipe(
    ofType(fromPerfilUsuario.actions.GET_ALL),
    switchMap(() => {
      return this.perfilUsuarioService.buscarTodos().pipe(
        map(res => {
          return new fromPerfilUsuario.GetAllPerfilUsuarioSuccess(res);
        }),
        catchError((err) => {
          return of(new fromPerfilUsuario.GetAllPerfilUsuarioFail(err));
        }));
    }));

  @Effect()
  AddPerfilUsuario$ = this.actions$.pipe(ofType(fromPerfilUsuario.actions.ADD),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromPerfilUsuario.AddPerfilUsuario, GlobalMessages]) => {
        return this.perfilUsuarioService.registrar(action.payload).pipe(
          map(res => {
            return new fromPerfilUsuario.AddPerfilUsuarioSuccess(
              { data: res, message: messages.ADD_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(new fromPerfilUsuario.AddPerfilUsuarioFail(err))
          })
        );
      }));

  @Effect()
  UpdatePerfilUsuario$ = this.actions$.pipe(ofType(fromPerfilUsuario.actions.UPDATE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromPerfilUsuario.UpdatePerfilUsuario, GlobalMessages]) => {
        return this.perfilUsuarioService.actualizar(
          action.payload).pipe(
            map(res => {
              return new fromPerfilUsuario.UpdatePerfilUsuarioSuccess(
                { data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(
                new fromPerfilUsuario.UpdatePerfilUsuarioFail(err))
            })
          );
      }));

  @Effect()
  DeletePerfilUsuario$ = this.actions$.pipe(ofType(fromPerfilUsuario.actions.DELETE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromPerfilUsuario.DeletePerfilUsuario, GlobalMessages]) => {
        return this.perfilUsuarioService.eliminar(action.payload).pipe(
          map(res => {
            return new fromPerfilUsuario.DeletePerfilUsuarioSuccess(
              { message: messages.DELETE_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              new fromPerfilUsuario.DeletePerfilUsuarioFail(err))
          })
        );
      }));

}