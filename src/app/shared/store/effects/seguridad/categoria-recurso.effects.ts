import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { CategoriaRecursoService } from "../../../../seguridad/services";
import * as fromCategoriaRecurso from "../../actions/seguridad/categoria-recurso.actions";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { addLabelToObjsArr } from "../../../utils";
import { of } from "rxjs";
import { GlobalMessages } from "../../reducers/global.reducer";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CategoriaRecursoEffects {

  constructor(private actions$: Actions, private store$: Store<AppState>,
    private categoriaRecursoService: CategoriaRecursoService) {
  }

  @Effect()
  GetAll$ = this.actions$.pipe(ofType(fromCategoriaRecurso.actions.GET_ALL), switchMap(() => {
    return this.categoriaRecursoService.buscarTodos().pipe(
      map(res => {
        addLabelToObjsArr(res, 'label', false, 'idCategoriaRecurso', 'descripcionCategoriaRecurso');
        return new fromCategoriaRecurso.GetAllCategoriaRecursoSuccess(res);
      }),
      catchError((err) => {
        return of(new fromCategoriaRecurso.GetAllCategoriaRecursoFail(err));
      }));
  }));

  @Effect()
  AddCategoriaRecurso$ = this.actions$.pipe(ofType(fromCategoriaRecurso.actions.ADD),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromCategoriaRecurso.AddCategoriaRecurso, GlobalMessages]) => {
        return this.categoriaRecursoService.registrar(action.payload).pipe(
          map(res => {
            return new fromCategoriaRecurso.AddCategoriaRecursoSuccess(
              { data: res, message: messages.ADD_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(new fromCategoriaRecurso.AddCategoriaRecursoFail(err))
          })
        );
      }));

  @Effect()
  UpdateCategoriaRecurso$ = this.actions$.pipe(ofType(fromCategoriaRecurso.actions.UPDATE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromCategoriaRecurso.UpdateCategoriaRecurso, GlobalMessages]) => {
        return this.categoriaRecursoService.actualizar(
          action.payload).pipe(
            map(res => {
              return new fromCategoriaRecurso.UpdateCategoriaRecursoSuccess(
                { data: res, message: messages.UPDATE_SUCCESS });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(
                new fromCategoriaRecurso.UpdateCategoriaRecursoFail(err))
            })
          );
      }));

  @Effect()
  DeleteCategoriaRecurso$ = this.actions$.pipe(ofType(fromCategoriaRecurso.actions.DELETE),
    withLatestFrom(this.store$.select('globalData', 'messages')),
    switchMap(
      ([action, messages]: [fromCategoriaRecurso.DeleteCategoriaRecurso, GlobalMessages]) => {
        return this.categoriaRecursoService.eliminar(action.payload).pipe(
          map(res => {
            return new fromCategoriaRecurso.DeleteCategoriaRecursoSuccess(
              { message: messages.DELETE_SUCCESS });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(
              new fromCategoriaRecurso.DeleteCategoriaRecursoFail(err))
          })
        );
      }));
}
