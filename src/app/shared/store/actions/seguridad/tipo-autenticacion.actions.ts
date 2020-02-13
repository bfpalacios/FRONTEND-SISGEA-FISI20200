import {getCommonCrudActions} from "../common-actions";
import {Action} from "@ngrx/store";
import {TipoAutenticacion} from "../../../../seguridad/models";

export const actions = {
  ...getCommonCrudActions('TipoAutenticacion')
};

export class AddTipoAutenticacion implements Action {
  readonly type = actions.ADD;

  constructor(public payload: any) {
  }
}

export class AddTipoAutenticacionSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AddTipoAutenticacionFail implements Action {
  readonly type = actions.ADD_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateTipoAutenticacion implements Action {
  readonly type = actions.UPDATE;

  constructor(public payload: any) {
  }
}

export class UpdateTipoAutenticacionSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UpdateTipoAutenticacionFail implements Action {
  readonly type = actions.UPDATE_FAIL;

  constructor(public payload: any) {
  }
}

export class DeleteTipoAutenticacion implements Action {
  readonly type = actions.DELETE;

  constructor(public payload: any) {
  }
}

export class DeleteTipoAutenticacionSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DeleteTipoAutenticacionFail implements Action {
  readonly type = actions.DELETE_FAIL;

  constructor(public payload: any) {
  }
}

export class GetAllTipoAutenticacion implements Action {
  readonly type = actions.GET_ALL;

  constructor(public payload = null) {
  }
}

export class GetAllTipoAutenticacionSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;

  constructor(public payload: TipoAutenticacion[]) {
  }
}

export class GetAllTipoAutenticacionFail implements Action {
  readonly type = actions.GET_ALL_FAIL;

  constructor(public payload: any) {
  }
}

export type TipoAutenticacionActions =
  AddTipoAutenticacion
  | AddTipoAutenticacionSuccess
  | AddTipoAutenticacionFail
  | UpdateTipoAutenticacion
  | UpdateTipoAutenticacionSuccess
  | UpdateTipoAutenticacionFail
  | DeleteTipoAutenticacion
  | DeleteTipoAutenticacionSuccess
  | DeleteTipoAutenticacionFail
  | GetAllTipoAutenticacion
  | GetAllTipoAutenticacionSuccess
  | GetAllTipoAutenticacionFail;
