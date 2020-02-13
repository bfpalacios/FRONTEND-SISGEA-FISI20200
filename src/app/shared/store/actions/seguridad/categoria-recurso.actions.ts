import {getCommonCrudActions} from "../common-actions";
import {Action} from "@ngrx/store";
import {CategoriaRecurso} from "../../../../seguridad/models";

export const actions = {
  ...getCommonCrudActions('CategoriaRecurso')
};

export class AddCategoriaRecurso implements Action {
  readonly type = actions.ADD;

  constructor(public payload: any) {
  }
}

export class AddCategoriaRecursoSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AddCategoriaRecursoFail implements Action {
  readonly type = actions.ADD_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateCategoriaRecurso implements Action {
  readonly type = actions.UPDATE;

  constructor(public payload: any) {
  }
}

export class UpdateCategoriaRecursoSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UpdateCategoriaRecursoFail implements Action {
  readonly type = actions.UPDATE_FAIL;

  constructor(public payload: any) {
  }
}

export class DeleteCategoriaRecurso implements Action {
  readonly type = actions.DELETE;

  constructor(public payload: any) {
  }
}

export class DeleteCategoriaRecursoSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DeleteCategoriaRecursoFail implements Action {
  readonly type = actions.DELETE_FAIL;

  constructor(public payload: any) {
  }
}

export class GetAllCategoriaRecurso implements Action {
  readonly type = actions.GET_ALL;

  constructor(public payload = null) {
  }
}

export class GetAllCategoriaRecursoSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;

  constructor(public payload: CategoriaRecurso[]) {
  }
}

export class GetAllCategoriaRecursoFail implements Action {
  readonly type = actions.GET_ALL_FAIL;

  constructor(public payload: any) {
  }
}

export type CategoriaRecursoActions =
  AddCategoriaRecurso
  | AddCategoriaRecursoSuccess
  | AddCategoriaRecursoFail
  | UpdateCategoriaRecurso
  | UpdateCategoriaRecursoSuccess
  | UpdateCategoriaRecursoFail
  | DeleteCategoriaRecurso
  | DeleteCategoriaRecursoSuccess
  | DeleteCategoriaRecursoFail
  | GetAllCategoriaRecurso
  | GetAllCategoriaRecursoSuccess
  | GetAllCategoriaRecursoFail;
