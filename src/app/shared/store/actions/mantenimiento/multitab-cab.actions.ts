import { Action } from '@ngrx/store';
import { MultitabCab } from '../../../../mantenimiento/models';
import { getCommonCrudActions } from '../common-actions';

export const actions = {
  ...getCommonCrudActions('MultitabCab')
}

export class AddMultitabCab implements Action {
  readonly type = actions.ADD;
  constructor(public payload: any) {}
}
export class AddMultitabCabSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {}
}
export class AddMultitabCabFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {}
}

export class UpdateMultitabCab implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) {}
}
export class UpdateMultitabCabSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateMultitabCabFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {}
}

export class DeleteMultitabCab implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) {}
}
export class DeleteMultitabCabSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {}
}
export class DeleteMultitabCabFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {}
}

export class GetAllMultitabCab implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload = null) {}
}
export class GetAllMultitabCabSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: MultitabCab[]) {}
}
export class GetAllMultitabCabFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: any) {}
}

export class ResetMultitabCab implements Action {
  readonly type = actions.RESET;
  constructor(public payload: any = null) {}
}

export type MultitabCabActions
  = AddMultitabCab
  | AddMultitabCabSuccess
  | AddMultitabCabFail
  | UpdateMultitabCab
  | UpdateMultitabCabSuccess
  | UpdateMultitabCabFail
  | DeleteMultitabCab
  | DeleteMultitabCabSuccess
  | DeleteMultitabCabFail
  | GetAllMultitabCab
  | GetAllMultitabCabSuccess
  | GetAllMultitabCabFail
  | ResetMultitabCab;
