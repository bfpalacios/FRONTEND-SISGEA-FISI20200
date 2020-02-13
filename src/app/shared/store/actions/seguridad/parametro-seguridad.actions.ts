import {getCommonCrudActions} from "../common-actions";
import {Action} from "@ngrx/store";
import {ParametroSeguridad} from "../../../../seguridad/models";

export const actions = {
  ...getCommonCrudActions('ParametroSeguridad')
};

export class AddParametroSeguridad implements Action {
  readonly type = actions.ADD;

  constructor(public payload: any) {
  }
}

export class AddParametroSeguridadSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AddParametroSeguridadFail implements Action {
  readonly type = actions.ADD_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateParametroSeguridad implements Action {
  readonly type = actions.UPDATE;

  constructor(public payload: any) {
  }
}

export class UpdateParametroSeguridadSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UpdateParametroSeguridadFail implements Action {
  readonly type = actions.UPDATE_FAIL;

  constructor(public payload: any) {
  }
}

export class DeleteParametroSeguridad implements Action {
  readonly type = actions.DELETE;

  constructor(public payload: any) {
  }
}

export class DeleteParametroSeguridadSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DeleteParametroSeguridadFail implements Action {
  readonly type = actions.DELETE_FAIL;

  constructor(public payload: any) {
  }
}

export class GetAllParametroSeguridad implements Action {
  readonly type = actions.GET_ALL;

  constructor(public payload = null) {
  }
}

export class GetAllParametroSeguridadSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;

  constructor(public payload: ParametroSeguridad[]) {
  }
}

export class GetAllParametroSeguridadFail implements Action {
  readonly type = actions.GET_ALL_FAIL;

  constructor(public payload: any) {
  }
}

export type ParametroSeguridadActions =
  AddParametroSeguridad
  | AddParametroSeguridadSuccess
  | AddParametroSeguridadFail
  | UpdateParametroSeguridad
  | UpdateParametroSeguridadSuccess
  | UpdateParametroSeguridadFail
  | DeleteParametroSeguridad
  | DeleteParametroSeguridadSuccess
  | DeleteParametroSeguridadFail
  | GetAllParametroSeguridad
  | GetAllParametroSeguridadSuccess
  | GetAllParametroSeguridadFail;
