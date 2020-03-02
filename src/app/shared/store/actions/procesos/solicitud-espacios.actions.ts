import { Action } from '@ngrx/store';
import { getCommonCrudActions } from '../common-actions';

export const actions = {
  ...getCommonCrudActions('SolicitudEspacios')
}

export class GetAllSolicitudEspacios implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload = null) {}
}
export class GetAllSolicitudEspaciosSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: any[]) {}
}
export class GetAllSolicitudEspaciosFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: any) {}
}

export class ResetSolicitudEspacios implements Action {
  readonly type = actions.RESET;
  constructor(public payload: any = null) {};
}

export class AprobarSolicitudEspacios implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) {}
}
export class AprobarSolicitudEspaciosSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}
export class AprobarSolicitudEspaciosFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {}
}

export class CancelarSolicitudEspacios implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) {}
}
export class CancelarSolicitudEspaciosSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {}
}
export class CancelarSolicitudEspaciosFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {}
}

export class RechazarSolicitudEspacios implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) {}
}
export class RechazarSolicitudEspaciosSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {}
}
export class RechazarSolicitudEspaciosFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {}
}

export type SolicitudEspaciosActions
  = GetAllSolicitudEspacios
  | GetAllSolicitudEspaciosSuccess
  | GetAllSolicitudEspaciosFail
  | ResetSolicitudEspacios
  | AprobarSolicitudEspacios
  | AprobarSolicitudEspaciosSuccess
  | AprobarSolicitudEspaciosFail
  | CancelarSolicitudEspacios
  | CancelarSolicitudEspaciosSuccess
  | CancelarSolicitudEspaciosFail
  | RechazarSolicitudEspacios
  | RechazarSolicitudEspaciosSuccess
  | RechazarSolicitudEspaciosFail;
