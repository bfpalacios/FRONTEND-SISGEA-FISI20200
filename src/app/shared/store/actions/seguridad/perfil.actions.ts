import { getCommonCrudActions } from '../common-actions';
import { Action } from '@ngrx/store';
import { Perfil } from '../../../../seguridad/models';
import { HttpErrorResponse } from '@angular/common/http';

export const actions = {
  ...getCommonCrudActions('PerfilSeg'),
  GET_BY_SISTEMA: '[PerfilSeg] Obtener por sistema',
  GET_BY_SISTEMA_SUCCESS: '[PerfilSeg] Obtener por sustema correcto',
  GET_BY_SISTEMA_FAIL: '[PerfilSeg] Error al obtener por sistema',
};

export class ResetPerfilSeg implements Action {
  readonly type = actions.RESET;
  constructor(public payload = null) {}
}

export class GetAllPerfil implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload: any = null) { }
}
export class GetAllPerfilSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: Perfil[]) { }
}
export class GetAllPerfilFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: HttpErrorResponse) { }
}

export class GetPerfilBySistema implements Action {
  readonly type = actions.GET_BY_SISTEMA;
  constructor(public payload: number) { }
}
export class GetPerfilBySistemaSuccess implements Action {
  readonly type = actions.GET_BY_SISTEMA_SUCCESS;
  constructor(public payload: Perfil[]) { }
}
export class GetPerfilBySistemaFail implements Action {
  readonly type = actions.GET_BY_SISTEMA_FAIL;
  constructor(public payload: HttpErrorResponse) { }
}

export class AddPerfil implements Action {
  readonly type = actions.ADD;
  constructor(public payload: Perfil) {
  }
}
export class AddPerfilSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {
  }
}
export class AddPerfilFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {
  }
}

export class UpdatePerfil implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: Perfil) {
  }
}
export class UpdatePerfilSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class UpdatePerfilFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {
  }
}

export class DeletePerfil implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: Perfil) {
  }
}
export class DeletePerfilSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class DeletePerfilFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {
  }
}

export type PerfilActions
  = GetAllPerfil
  | GetAllPerfilSuccess
  | GetAllPerfilFail
  | GetPerfilBySistema
  | GetPerfilBySistemaSuccess
  | GetPerfilBySistemaFail 
  | AddPerfil
  | AddPerfilSuccess
  | AddPerfilFail
  | UpdatePerfil
  | UpdatePerfilSuccess
  | UpdatePerfilFail
  | DeletePerfil
  | DeletePerfilSuccess
  | DeletePerfilFail
  | ResetPerfilSeg;
