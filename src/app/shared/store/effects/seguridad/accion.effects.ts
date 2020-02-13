import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { AccionService } from "../../../../seguridad/services";
import * as fromAccion from "../../actions/seguridad/accion.actions";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { addLabelToObjsArr } from "../../../utils";
import { of } from "rxjs";

@Injectable()
export class AccionEffects {

  constructor(private actions$: Actions, private store$: Store<AppState>,
    private accionService: AccionService) {
  }

  @Effect()
  GetAll$ = this.actions$.pipe(ofType(fromAccion.actions.GET_ALL), switchMap(() => {
    return this.accionService.buscarTodos().pipe(
      map(res => {
        addLabelToObjsArr(res, 'label', false, 'idAccion', 'descripcionAccion');
        return new fromAccion.GetAllAccionSuccess(res);
      }),
      catchError((err) => {
        return of(new fromAccion.GetAllAccionFail(err));
      }));
  }));

  @Effect()
  GetByCategoriaRecurso$ = this.actions$.pipe(
    ofType(fromAccion.actions.GET_BY_CAT_RECURSO),
    switchMap((action: fromAccion.GetAccionesByCatRecurso) => {
      return this.accionService.buscarPorCategoriaRecurso(action.payload).pipe(
        map(res => {
          addLabelToObjsArr(res, 'label', false, 'idAccion', 'descripcionAccion');
          return new fromAccion.GetAllAccionSuccess(res);
        }),
        catchError((err) => {
          return of(new fromAccion.GetAllAccionFail(err));
        }));
    }));


}
