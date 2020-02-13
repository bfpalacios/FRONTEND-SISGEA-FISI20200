import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { TipoMenuService } from "../../../../seguridad/services";
import * as fromTipoMenu from "../../actions/seguridad/tipo-menu.action";
import { catchError, map, switchMap } from "rxjs/operators";
import { addLabelToObjsArr } from "../../../utils";
import { of } from "rxjs";

@Injectable()
export class TipoMenuEffects {

  constructor(private actions$: Actions, private store$: Store<AppState>,
    private accionService: TipoMenuService) {
  }

  @Effect()
  GetAll$ = this.actions$.pipe(ofType(fromTipoMenu.actions.GET_ALL), switchMap(() => {
    return this.accionService.buscarTodos().pipe(
      map(res => {
        addLabelToObjsArr(res, 'label', false, 'idTipoMenu', 'descripcionTipoMenu');
        return new fromTipoMenu.GetAllTipoMenuSuccess(res);
      }),
      catchError((err) => {
        return of(new fromTipoMenu.GetAllTipoMenuFail(err));
      }));
  }));


}
