import {getCommonCrudActions} from '../common-actions';
import {Action} from "@ngrx/store";
import {UsuarioSeg} from "../../../../seguridad/models";

export const actions = {
  ...getCommonCrudActions('UsuarioSeg')
};

export class AddUsuario implements Action {
  readonly type = actions.ADD;

  constructor(public payload: any) {
  }
}

export class AddUsuarioSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AddUsuarioFail implements Action {
  readonly type = actions.ADD_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateUsuario implements Action {
  readonly type = actions.UPDATE;

  constructor(public payload: any) {
  }
}

export class UpdateUsuarioSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UpdateUsuarioFail implements Action {
  readonly type = actions.UPDATE_FAIL;

  constructor(public payload: any) {
  }
}

export class DeleteUsuario implements Action {
  readonly type = actions.DELETE;

  constructor(public payload: any) {
  }
}

export class DeleteUsuarioSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DeleteUsuarioFail implements Action {
  readonly type = actions.DELETE_FAIL;

  constructor(public payload: any) {
  }
}

export class GetAllUsuario implements Action {
  readonly type = actions.GET_ALL;

  constructor(public payload = null) {
  }
}

export class GetAllUsuarioSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;

  constructor(public payload: UsuarioSeg[]) {
  }
}

export class GetAllUsuarioFail implements Action {
  readonly type = actions.GET_ALL_FAIL;

  constructor(public payload: any) {
  }
}

export type UsuarioActions =
  AddUsuario
  | AddUsuarioSuccess
  | AddUsuarioFail
  | UpdateUsuario
  | UpdateUsuarioSuccess
  | UpdateUsuarioFail
  | DeleteUsuario
  | DeleteUsuarioSuccess
  | DeleteUsuarioFail
  | GetAllUsuario
  | GetAllUsuarioSuccess
  | GetAllUsuarioFail;
