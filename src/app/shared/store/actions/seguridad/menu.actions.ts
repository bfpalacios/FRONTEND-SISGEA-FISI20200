import { getCommonCrudActions } from '../common-actions';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Menu, CriterioBusquedaMenu, MenuArbol } from '../../../../seguridad/models';

export const actions = {
  ...getCommonCrudActions('Menu'),
  GET_TREE: '[Menu] Obtener arbol por sistema',
  GET_TREE_SUCCESS: '[Menu] Obtener arbol por sistema correcto',
  GET_TREE_FAIL: '[Menu] Error obtener arbol por sistema',
  RESET_TREE: '[Menu] Reset arbol'
}

export class GetAllMenu implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload: CriterioBusquedaMenu) { }
}
export class GetAllMenuSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: Menu[]) { }
}
export class GetAllMenuFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: HttpErrorResponse) { }
}

export class GetAllMenuArbol implements Action {
  readonly type = actions.GET_TREE;
  constructor(public payload: CriterioBusquedaMenu) { }
}
export class GetAllMenuArbolSuccess implements Action {
  readonly type = actions.GET_TREE_SUCCESS;
  constructor(public payload: MenuArbol[]) { }
}
export class GetAllMenuArbolFail implements Action {
  readonly type = actions.GET_TREE_FAIL;
  constructor(public payload: HttpErrorResponse) { }
}

export class AddMenu implements Action {
  readonly type = actions.ADD;
  constructor(public payload: Menu) {
  }
}
export class AddMenuSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {
  }
}
export class AddMenuFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {
  }
}

export class UpdateMenu implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: Menu) {
  }
}
export class UpdateMenuSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class UpdateMenuFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {
  }
}

export class DeleteMenu implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: Menu) {
  }
}
export class DeleteMenuSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class DeleteMenuFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {
  }
}

export class ResetMenuArbol implements Action {
  readonly type = actions.RESET_TREE;
  constructor(public payload = null) {}
}

export type MenuActions
  = GetAllMenu
  | GetAllMenuSuccess
  | GetAllMenuFail
  | AddMenu
  | AddMenuSuccess
  | AddMenuFail
  | UpdateMenu
  | UpdateMenuSuccess
  | UpdateMenuFail
  | DeleteMenu
  | DeleteMenuSuccess
  | DeleteMenuFail
  | GetAllMenuArbol
  | GetAllMenuArbolSuccess
  | GetAllMenuArbolFail
  | ResetMenuArbol;
