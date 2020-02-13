import { Action } from '@ngrx/store';
import { getCommonConsultaActions } from "../common-actions";
import { DetalleCompensacion, Compensacion } from '../../../../consultas/models';
export const actions = {
  ...getCommonConsultaActions('Compensacion'),
}

export class GetCriterioCompensacion implements Action {
  readonly type = actions.GET_CRITERIO_PAGINADO;

  constructor(public payload: any) { }
}
export class GetCriterioCompensacionSuccess implements Action {
  readonly type = actions.GET_CRITERIO_PAGINADO_SUCCESS;
  constructor(public payload: Compensacion) { }
}
export class GetCriterioCompensacionFail implements Action {
  readonly type = actions.GET_CRITERIO_PAGINADO_FAIL;
  constructor(public payload: any) { }
}

export class GetDetalleCompensacion implements Action {
  readonly type = actions.GET_DETALLE;
  constructor(public payload: any) { }
}
export class GetDetalleCompensacionSuccess implements Action {
  readonly type = actions.GET_DETALLE_SUCCESS;
  constructor(public payload: DetalleCompensacion) { }
}
export class GetDetalleCompensacionFail implements Action {
  readonly type = actions.GET_DETALLE_FAIL;
  constructor(public payload: any) { }
}

export class ResetCompensacion implements Action {
  readonly type = actions.RESET;
  constructor(public payload = null) { }
}

export type CompensacionActions
  = GetCriterioCompensacion
  | GetCriterioCompensacionSuccess
  | GetCriterioCompensacionFail
  | GetDetalleCompensacion
  | GetDetalleCompensacionSuccess
  | GetDetalleCompensacionFail
  | ResetCompensacion;
