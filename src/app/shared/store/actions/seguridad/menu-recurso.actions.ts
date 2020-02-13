import { getCommonCrudActions } from '../common-actions';
import { Action } from '@ngrx/store';
import { MenuRecurso } from '../../../../seguridad/models';
import { HttpErrorResponse } from '@angular/common/http';

export const actions = {
  ...getCommonCrudActions('MenuRecurso'),
  GET_BY_MENU: '[MenuRecurso] Obtener por sistema y menu',
  GET_BY_MENU_SUCCESS: '[MenuRecurso] Obtener por sistema y menu correcto',
  GET_BY_MENU_FAIL: '[MenuRecurso] Error al obtener por sistema y menu',
}

export class ResetMenuRecurso implements Action {
  readonly type = actions.RESET;
  constructor() { }
}

export class GetAllMenuRecurso implements Action {
  readonly type = actions.GET_BY_MENU;
  constructor(public payload: { idSistema: number, idMenu: number }) { }
}
export class GetAllMenuRecursoSuccess implements Action {
  readonly type = actions.GET_BY_MENU_SUCCESS;
  constructor(public payload: MenuRecurso[]) { }
}
export class GetAllMenuRecursoFail implements Action {
  readonly type = actions.GET_BY_MENU_FAIL;
  constructor(public payload: HttpErrorResponse) { }
}

export class AddMenuRecurso implements Action {
  readonly type = actions.ADD;
  constructor(public payload: MenuRecurso) {
  }
}
export class AddMenuRecursoSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {
  }
}
export class AddMenuRecursoFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: HttpErrorResponse) {
  }
}

export class UpdateMenuRecurso implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: MenuRecurso) {
  }
}
export class UpdateMenuRecursoSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class UpdateMenuRecursoFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: HttpErrorResponse) {
  }
}

export class DeleteMenuRecurso implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: MenuRecurso) {
  }
}
export class DeleteMenuRecursoSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class DeleteMenuRecursoFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: HttpErrorResponse) {
  }
}

export type MenuRecursoActions
  = GetAllMenuRecurso
  | GetAllMenuRecursoSuccess
  | GetAllMenuRecursoFail
  | AddMenuRecurso
  | AddMenuRecursoSuccess
  | AddMenuRecursoFail
  | UpdateMenuRecurso
  | UpdateMenuRecursoSuccess
  | UpdateMenuRecursoFail
  | DeleteMenuRecurso
  | DeleteMenuRecursoSuccess
  | DeleteMenuRecursoFail;
