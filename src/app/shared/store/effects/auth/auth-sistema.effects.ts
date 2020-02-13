import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AuthSistemaService } from '../../../../auth/services';
import * as fromSistema from '../../actions/seguridad/sistema.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthSistemaEffects {

  constructor(
    private actions$: Actions,
    private authSistemaService: AuthSistemaService
  ){}

    @Effect()
    GetAllFree$ = this.actions$
      .pipe(
        ofType(fromSistema.actions.GET_ALL_FREE),
        switchMap(() => {
          return this.authSistemaService.buscarTodosLiberado()
            .pipe(
              map(res => new fromSistema.GetAllSistemaSuccess(res)),
              catchError(err => of(new fromSistema.GetAllSistemaFail(err)))
            )
        })
      )

}