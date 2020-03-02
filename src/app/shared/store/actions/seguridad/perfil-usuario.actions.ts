import { getCommonCrudActions } from '../common-actions';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const actions = {
  ...getCommonCrudActions('PerfilUsuario'),
  GET_BY_SISTEMA: '[PerfilUsuario] Obtener por sistema',
  GET_BY_SISTEMA_SUCCESS: '[PerfilUsuario] Obtener por sustema correcto',
  GET_BY_SISTEMA_FAIL: '[PerfilUsuario] Error al obtener por sistema',
};

export class ResetPerfilUsuarioRecurso implements Action {
  readonly type = actions.RESET;
  constructor(public payload = null) {}
}

export class GetAllPerfilUsuario implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload: any = null) { }
}
export class GetAllPerfilUsuarioSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: any[]) { }
}
export class GetAllPerfilUsuarioFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: HttpErrorResponse) { }
}

export class AddPerfilUsuario implements Action {
  readonly type = actions.ADD;
  constructor(public payload: any) {
  }
}
export class AddPerfilUsuarioSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {
  }
}
export class AddPerfilUsuarioFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {
  }
}

export class UpdatePerfilUsuario implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) {
  }
}
export class UpdatePerfilUsuarioSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class UpdatePerfilUsuarioFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {
  }
}

export class DeletePerfilUsuario implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) {
  }
}
export class DeletePerfilUsuarioSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class DeletePerfilUsuarioFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {
  }
}

export type PerfilUsuarioActions
  = GetAllPerfilUsuario
  | GetAllPerfilUsuarioSuccess
  | GetAllPerfilUsuarioFail
  | AddPerfilUsuario
  | AddPerfilUsuarioSuccess
  | AddPerfilUsuarioFail
  | UpdatePerfilUsuario
  | UpdatePerfilUsuarioSuccess
  | UpdatePerfilUsuarioFail
  | DeletePerfilUsuario
  | DeletePerfilUsuarioSuccess
  | DeletePerfilUsuarioFail
  | ResetPerfilUsuarioRecurso;
