import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducers";
import * as fromUsuario from "../../actions/seguridad/usuario.actions";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {addLabelToObjsArr} from "../../../utils";
import {of} from "rxjs";
import {GlobalMessages} from "../../reducers/global.reducer";
import {HttpErrorResponse} from "@angular/common/http";
import {UsuarioService} from "../../../../seguridad/services";

@Injectable()
export class UsuarioSegEffects {

  constructor(private actions$: Actions, private store$: Store<AppState>, private usuarioService: UsuarioService) {
  }

  @Effect()
  GetAll$ = this.actions$.pipe(ofType(fromUsuario.actions.GET_ALL), switchMap(() => {
    return this.usuarioService.buscarTodos().pipe(map(res => {
      addLabelToObjsArr(res, 'label', false, 'username');
      return new fromUsuario.GetAllUsuarioSuccess(res);
    }), catchError((err) => {
      return of(new fromUsuario.GetAllUsuarioFail(err));
    }));
  }));

  @Effect()
  AddUsuario$ = this.actions$.pipe(ofType(fromUsuario.actions.ADD),
                                   withLatestFrom(this.store$.select('globalData', 'messages')),
                                   switchMap(([action, messages]: [fromUsuario.AddUsuario, GlobalMessages]) => {
                                     return this.usuarioService.registrar(action.payload).pipe(
                                       map(res => {
                                         return new fromUsuario.AddUsuarioSuccess(
                                           {data: res, message: messages.ADD_SUCCESS});
                                       }), catchError(
                                         (err: HttpErrorResponse) => {
                                           return of(
                                             new fromUsuario.AddUsuarioFail(err))
                                         }));
                                   }));

  @Effect()
  UpdateUsuario$ = this.actions$.pipe(ofType(fromUsuario.actions.UPDATE),
                                      withLatestFrom(this.store$.select('globalData', 'messages')),
                                      switchMap(([action, messages]: [fromUsuario.UpdateUsuario, GlobalMessages]) => {
                                        return this.usuarioService.actualizar(action.payload).pipe(
                                          map(res => {
                                            return new fromUsuario.UpdateUsuarioSuccess(
                                              {data: res, message: messages.UPDATE_SUCCESS});
                                          }),
                                          catchError((err: HttpErrorResponse) => {
                                            return of(new fromUsuario.UpdateUsuarioFail(err))
                                          })
                                        )
                                      }));

  @Effect()
  DeleteUsuario$ = this.actions$.pipe(ofType(fromUsuario.actions.DELETE),
                                      withLatestFrom(this.store$.select('globalData', 'messages')),
                                      switchMap(([action, messages]: [fromUsuario.DeleteUsuario, GlobalMessages]) => {
                                        return this.usuarioService.eliminar(action.payload).pipe(
                                          map(res => {
                                            return new fromUsuario.DeleteUsuarioSuccess(
                                              {message: messages.DELETE_SUCCESS});
                                          }),
                                          catchError((err: HttpErrorResponse) => {
                                            return of(new fromUsuario.DeleteUsuarioFail(err))
                                          })
                                        )
                                      }));
}
