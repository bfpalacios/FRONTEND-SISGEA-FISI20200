import { Action } from '@ngrx/store';
import { getCommonCrudActions } from '../common-actions';

export const actions = {
  ...getCommonCrudActions('AsignacionEspacios')
}

export class UpdateAsignacionEspacios implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) {}
}
export class UpdateAsignacionEspaciosSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateAsignacionEspaciosFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {}
}

export class GetAllAsignacionEspacios implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload = null) {}
}
export class GetAllAsignacionEspaciosSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: any[]) {}
}
export class GetAllAsignacionEspaciosFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: any) {}
}

export class ResetAsignacionEspacios implements Action {
  readonly type = actions.RESET;
  constructor(public payload: any = null) {};
}

export type AsignacionEspaciosActions
  = UpdateAsignacionEspacios
  | UpdateAsignacionEspaciosSuccess
  | UpdateAsignacionEspaciosFail
  | GetAllAsignacionEspacios
  | GetAllAsignacionEspaciosSuccess
  | GetAllAsignacionEspaciosFail
  | ResetAsignacionEspacios;
