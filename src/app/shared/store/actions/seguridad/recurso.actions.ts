import { getCommonCrudActions } from '../common-actions';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { RecursoSeg } from '../../../../seguridad/models';

export const actions = {
  ...getCommonCrudActions('Recurso')
}

export class GetAllRecurso implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload = null) { }
}
export class GetAllRecursoSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: RecursoSeg[]) { }
}
export class GetAllRecursoFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: HttpErrorResponse) { }
}

export class AddRecurso implements Action {
  readonly type = actions.ADD;
  constructor(public payload: RecursoSeg) {
  }
}
export class AddRecursoSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {
  }
}
export class AddRecursoFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {
  }
}

export class UpdateRecurso implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: RecursoSeg) {
  }
}
export class UpdateRecursoSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class UpdateRecursoFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {
  }
}

export class DeleteRecurso implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: RecursoSeg) {
  }
}
export class DeleteRecursoSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {
  }
}
export class DeleteRecursoFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {
  }
}

export type RecursoActions
  = GetAllRecurso
  | GetAllRecursoSuccess
  | GetAllRecursoFail
  | AddRecurso
  | AddRecursoSuccess
  | AddRecursoFail
  | UpdateRecurso
  | UpdateRecursoSuccess
  | UpdateRecursoFail
  | DeleteRecurso
  | DeleteRecursoSuccess
  | DeleteRecursoFail;
