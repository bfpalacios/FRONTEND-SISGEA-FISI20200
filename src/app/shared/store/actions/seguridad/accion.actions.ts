import {getCommonCrudActions} from "../common-actions";
import {Action} from "@ngrx/store";
import {Accion} from "../../../../seguridad/models";

export const actions = {
  ...getCommonCrudActions('Accion'),
  GET_BY_CAT_RECURSO: '[Accion] Obtener por categoria recurso',
  GET_BY_CAT_RECURSO_SUCCESS: '[Accion] Obtener por categoria recurso success',
  GET_BY_CAT_RECURSO_FAIL: '[Accion] Error al obtener por categoria recurso',
};

export class AddAccion implements Action {
  readonly type = actions.ADD;
  constructor(public payload: any) {
  }
}
export class AddAccionSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {
  }
}
export class AddAccionFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {
  }
}

export class UpdateAccion implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) {
  }
}
export class UpdateAccionSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class UpdateAccionFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {
  }
}

export class DeleteAccion implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) {
  }
}
export class DeleteAccionSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class DeleteAccionFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {
  }
}

export class GetAllAccion implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload = null) {
  }
}
export class GetAllAccionSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: Accion[]) {
  }
}
export class GetAllAccionFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: any) {
  }
}

export class GetAccionesByCatRecurso implements Action {
  readonly type = actions.GET_BY_CAT_RECURSO;
  constructor(public payload: number) {
  }
}
export class GetAccionesByCatRecursoSuccess implements Action {
  readonly type = actions.GET_BY_CAT_RECURSO_SUCCESS;
  constructor(public payload: Accion[]) {
  }
}
export class GetAccionesByCatRecursoFail implements Action {
  readonly type = actions.GET_BY_CAT_RECURSO_FAIL;
  constructor(public payload: any) {
  }
}

export class ResetAccion implements Action {
  readonly type = actions.RESET;
  constructor(public payload = null){}
}

export type AccionActions =
  AddAccion
  | AddAccionSuccess
  | AddAccionFail
  | UpdateAccion
  | UpdateAccionSuccess
  | UpdateAccionFail
  | DeleteAccion
  | DeleteAccionSuccess
  | DeleteAccionFail
  | GetAllAccion
  | GetAllAccionSuccess
  | GetAllAccionFail
  | GetAccionesByCatRecurso
  | GetAccionesByCatRecursoSuccess
  | GetAccionesByCatRecursoFail
  | ResetAccion;
