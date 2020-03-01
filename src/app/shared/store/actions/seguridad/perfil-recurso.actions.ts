import { getCommonCrudActions } from '../common-actions';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const actions = {
  ...getCommonCrudActions('PerfilRecurso'),
  GET_BY_SISTEMA: '[PerfilRecurso] Obtener por sistema',
  GET_BY_SISTEMA_SUCCESS: '[PerfilRecurso] Obtener por sustema correcto',
  GET_BY_SISTEMA_FAIL: '[PerfilRecurso] Error al obtener por sistema',
};

export class ResetPerfilRecursoRecurso implements Action {
  readonly type = actions.RESET;
  constructor(public payload = null) {}
}

export class GetAllPerfilRecurso implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload: any = null) { }
}
export class GetAllPerfilRecursoSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: any[]) { }
}
export class GetAllPerfilRecursoFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: HttpErrorResponse) { }
}

export class AddPerfilRecurso implements Action {
  readonly type = actions.ADD;
  constructor(public payload: any) {
  }
}
export class AddPerfilRecursoSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {
  }
}
export class AddPerfilRecursoFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {
  }
}

export class UpdatePerfilRecurso implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) {
  }
}
export class UpdatePerfilRecursoSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class UpdatePerfilRecursoFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {
  }
}

export class DeletePerfilRecurso implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) {
  }
}
export class DeletePerfilRecursoSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class DeletePerfilRecursoFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {
  }
}

export type PerfilRecursoActions
  = GetAllPerfilRecurso
  | GetAllPerfilRecursoSuccess
  | GetAllPerfilRecursoFail
  | AddPerfilRecurso
  | AddPerfilRecursoSuccess
  | AddPerfilRecursoFail
  | UpdatePerfilRecurso
  | UpdatePerfilRecursoSuccess
  | UpdatePerfilRecursoFail
  | DeletePerfilRecurso
  | DeletePerfilRecursoSuccess
  | DeletePerfilRecursoFail
  | ResetPerfilRecursoRecurso;
