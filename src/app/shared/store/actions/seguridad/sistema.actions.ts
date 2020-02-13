import { getCommonCrudActions } from '../common-actions';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Sistema } from '../../../../seguridad/models';

export const actions = {
  ...getCommonCrudActions('Sistema'),
  GET_ALL_FREE: '[Sistema] Obtener todos ruta liberada',
  GET_ES_AUT_LOCAL: '[Sistema] Obtener si es autenticacion local',
  GET_ES_AUT_LOCAL_SUCCESS: '[Sistema] Obtener si es autenticacion local correcto',
  GET_ES_AUT_LOCAL_FAIL: '[Sistema] Error al obtener si es autenticacion local',
}

export class GetAllSistema implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload = null) { }
}
export class GetAllSistemaLiberado implements Action {
  readonly type = actions.GET_ALL_FREE;
  constructor(public payload = null) { }
}
export class GetAllSistemaSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: Sistema[]) { }
}
export class GetAllSistemaFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: HttpErrorResponse) { }
}

export class GetSistemaEsAutLocal implements Action {
  readonly type = actions.GET_ES_AUT_LOCAL;
  constructor(public payload: number) { }
}
export class GetSistemaEsAutLocalSuccess implements Action {
  readonly type = actions.GET_ES_AUT_LOCAL_SUCCESS;
  constructor(public payload: { idSistema: number, data: boolean }) { }
}
export class GetSistemaEsAutLocalFail implements Action {
  readonly type = actions.GET_ES_AUT_LOCAL_FAIL;
  constructor(public payload: HttpErrorResponse) { }
}

export class AddSistema implements Action {
  readonly type = actions.ADD;
  constructor(public payload: any) {
  }
}

export class AddSistemaSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {
  }
}

export class AddSistemaFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {
  }
}

export class UpdateSistema implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) {
  }
}

export class UpdateSistemaSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {
  }
}

export class UpdateSistemaFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {
  }
}

export class DeleteSistema implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) {
  }
}

export class DeleteSistemaSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {
  }
}

export class DeleteSistemaFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {
  }
}

export type SistemaActions
  = GetAllSistema
  | GetAllSistemaSuccess
  | GetAllSistemaFail
  | GetAllSistemaLiberado
  | AddSistema
  | AddSistemaSuccess
  | AddSistemaFail
  | UpdateSistema
  | UpdateSistemaSuccess
  | UpdateSistemaFail
  | DeleteSistema
  | DeleteSistemaSuccess
  | DeleteSistemaFail
  | GetSistemaEsAutLocal
  | GetSistemaEsAutLocalSuccess
  | GetSistemaEsAutLocalFail;
