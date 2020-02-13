import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { MenuService } from '../../../../seguridad/services';
import * as fromMenu from '../../actions/seguridad/menu.actions';
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { HttpErrorResponse } from "@angular/common/http";
import { GlobalMessages } from "../../reducers/global.reducer";
import { addLabelToObjsArr } from "../../../utils";

@Injectable()
export class MenuEffects {
  constructor(private actions$: Actions, private store$: Store<AppState>,
    private sistemaService: MenuService) { }

  @Effect()
  GetAll$ = this.actions$.pipe(
    ofType(fromMenu.actions.GET_ALL),
    switchMap((action: fromMenu.GetAllMenu) => {
      return this.sistemaService.buscarPorSistema(action.payload.idSistema, action.payload.presentacion).pipe(
        map(res => {
          addLabelToObjsArr(res, 'label', false, 'idMenu', 'descripcionMenu');
          return new fromMenu.GetAllMenuSuccess(res);
        }),
        catchError((err) => {
          return of(new fromMenu.GetAllMenuFail(err));
        }));
    }));

  @Effect()
  GetTree$ = this.actions$.pipe(
    ofType(fromMenu.actions.GET_TREE),
    switchMap((action: fromMenu.GetAllMenu) => {
      return this.sistemaService.buscarPorSistema(action.payload.idSistema, action.payload.presentacion).pipe(
        map(res => {
          return new fromMenu.GetAllMenuArbolSuccess(res);
        }),
        catchError((err) => {
          return of(new fromMenu.GetAllMenuArbolFail(err));
        }));
    }));

  @Effect()
  AddMenu$ = this.actions$.pipe(ofType(fromMenu.actions.ADD),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromMenu.AddMenu, GlobalMessages]) => {
        return this.sistemaService.registrar(action.payload).pipe(
          map(res => {
            return new fromMenu.AddMenuSuccess(
              { data: res, message: messages.ADD_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(new fromMenu.AddMenuFail(err))
          })
        );
      }));

  @Effect()
  UpdateMenu$ = this.actions$.pipe(ofType(fromMenu.actions.UPDATE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromMenu.UpdateMenu, GlobalMessages]) => {
        return this.sistemaService.actualizar(
          action.payload).pipe(
            map(res => {
              return new fromMenu.UpdateMenuSuccess(
                { data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(
                new fromMenu.UpdateMenuFail(err))
            })
          );
      }));

  @Effect()
  DeleteMenu$ = this.actions$.pipe(ofType(fromMenu.actions.DELETE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromMenu.DeleteMenu, GlobalMessages]) => {
        return this.sistemaService.eliminar(action.payload).pipe(
          map(res => {
            return new fromMenu.DeleteMenuSuccess(
              { message: messages.DELETE_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              new fromMenu.DeleteMenuFail(err))
          })
        );
      }));

}