import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { UsuarioPerfilService } from '../../../../seguridad/services';
import * as fromUsuarioPerfil from '../../actions/seguridad/usuario-perfil.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { GlobalMessages } from '../../reducers/global.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { addLabelToObjsArr } from '../../../utils';

@Injectable()
export class UsuarioPerfilEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private usuarioPerfilService: UsuarioPerfilService
  ) { }

  @Effect()
  GetByUsuario$ = this.actions$
    .pipe(
      ofType(fromUsuarioPerfil.actions.GET_BY_USUARIO),
      switchMap((action: fromUsuarioPerfil.GetUsuarioPerfilByUsuario) => {
        return this.usuarioPerfilService.buscarPorUsuario(action.payload)
          .pipe(
            map(res => {
              addLabelToObjsArr(res, 'label', false, 'idUsuarioPerfil', 'descripcionItem');
              return new fromUsuarioPerfil.GetUsuarioPerfilByUsuarioSuccess(res)
            }),
            catchError(err => of(new fromUsuarioPerfil.GetUsuarioPerfilByUsuarioFail(err)))
          )
      })
    );

  @Effect()
  AddUsuarioPerfil$ = this.actions$
    .pipe(
      ofType(fromUsuarioPerfil.actions.ADD),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromUsuarioPerfil.AddUsuarioPerfil, GlobalMessages]) => {
        return this.usuarioPerfilService.registrar(action.payload)
          .pipe(
            map(res => {
              return new fromUsuarioPerfil.AddUsuarioPerfilSuccess({ data: res, message: messages.ADD_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(new fromUsuarioPerfil.AddUsuarioPerfilFail(err));
            })
          )
      })
    );

  @Effect()
  UpdateUsuarioPerfil$ = this.actions$
    .pipe(
      ofType(fromUsuarioPerfil.actions.UPDATE),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromUsuarioPerfil.UpdateUsuarioPerfil, GlobalMessages]) => {
        return this.usuarioPerfilService.actualizar(action.payload)
          .pipe(
            map(res => {
              return new fromUsuarioPerfil.UpdateUsuarioPerfilSuccess({ data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => of(new fromUsuarioPerfil.UpdateUsuarioPerfilFail(err)))
          )
      })
    );

  @Effect()
  DeleteUsuarioPerfil = this.actions$
    .pipe(
      ofType(fromUsuarioPerfil.actions.DELETE),
      withLatestFrom(this.store.select('globalData', 'messages')),
      switchMap(([action, messages]: [fromUsuarioPerfil.UpdateUsuarioPerfil, GlobalMessages]) => {
        return this.usuarioPerfilService.eliminar(action.payload)
          .pipe(
            map(res => new fromUsuarioPerfil.DeleteUsuarioPerfilSuccess({ message: messages.DELETE_SUCCESS })),
            catchError((err: HttpErrorResponse) => of(new fromUsuarioPerfil.DeleteUsuarioPerfilFail(err)))
          )
      })
    );
}
