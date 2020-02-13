import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { PerfilService } from '../../../../seguridad/services';
import * as fromPerfil from '../../actions/seguridad/perfil.actions';
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { HttpErrorResponse } from "@angular/common/http";
import { GlobalMessages } from "../../reducers/global.reducer";
import { addLabelToObjsArr } from "../../../utils";

@Injectable()
export class PerfilEffects {
  constructor(private actions$: Actions, private store$: Store<AppState>,
    private perfilService: PerfilService) { }

  @Effect()
  GetAll$ = this.actions$.pipe(
    ofType(fromPerfil.actions.GET_ALL),
    switchMap(() => {
      return this.perfilService.buscarTodos().pipe(
        map(res => {
          addLabelToObjsArr(res, 'label', false, 'idPerfil', 'descripcionPerfil');
          return new fromPerfil.GetAllPerfilSuccess(res);
        }),
        catchError((err) => {
          return of(new fromPerfil.GetAllPerfilFail(err));
        }));
    }));

  @Effect()
  GetBySistema$ = this.actions$.pipe(
    ofType(fromPerfil.actions.GET_BY_SISTEMA),
    switchMap((action: fromPerfil.GetAllPerfil) => {
      return this.perfilService.buscarPorSistema(action.payload).pipe(
        map(res => {
          addLabelToObjsArr(res, 'label', false, 'idPerfil', 'descripcionPerfil');
          return new fromPerfil.GetAllPerfilSuccess(res);
        }),
        catchError((err) => {
          return of(new fromPerfil.GetAllPerfilFail(err));
        }));
    }));

  @Effect()
  AddPerfil$ = this.actions$.pipe(ofType(fromPerfil.actions.ADD),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromPerfil.AddPerfil, GlobalMessages]) => {
        return this.perfilService.registrar(action.payload).pipe(
          map(res => {
            return new fromPerfil.AddPerfilSuccess(
              { data: res, message: messages.ADD_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(new fromPerfil.AddPerfilFail(err))
          })
        );
      }));

  @Effect()
  UpdatePerfil$ = this.actions$.pipe(ofType(fromPerfil.actions.UPDATE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromPerfil.UpdatePerfil, GlobalMessages]) => {
        return this.perfilService.actualizar(
          action.payload).pipe(
            map(res => {
              return new fromPerfil.UpdatePerfilSuccess(
                { data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(
                new fromPerfil.UpdatePerfilFail(err))
            })
          );
      }));

  @Effect()
  DeletePerfil$ = this.actions$.pipe(ofType(fromPerfil.actions.DELETE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromPerfil.DeletePerfil, GlobalMessages]) => {
        return this.perfilService.eliminar(action.payload).pipe(
          map(res => {
            return new fromPerfil.DeletePerfilSuccess(
              { message: messages.DELETE_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              new fromPerfil.DeletePerfilFail(err))
          })
        );
      }));

}