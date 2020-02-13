import { Action } from '@ngrx/store';
import { Origen } from '../../../../mantenimiento/models';
import { getCommonCrudActions } from '../common-actions';

export const actions = {
  ...getCommonCrudActions('Origen')
}

export class AddOrigen implements Action {
  readonly type = actions.ADD;
  constructor(public payload: any) {}
}
export class AddOrigenSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {}
}
export class AddOrigenFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {}
}

export class UpdateOrigen implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) {}
}
export class UpdateOrigenSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateOrigenFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {}
}

export class DeleteOrigen implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) {}
}
export class DeleteOrigenSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {}
}
export class DeleteOrigenFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {}
}

export class GetAllOrigen implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload = null) {}
}
export class GetAllOrigenSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: Origen[]) {}
}
export class GetAllOrigenFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: any) {}
}

export class DownloadOrigen implements Action {
  readonly type = actions.DOWNLOAD;
  constructor(public payload: any = null) { }
}
export class DownloadOrigenSuccess implements Action {
  readonly type = actions.DOWNLOAD_SUCCESS;
  constructor(public payload: any) { }
}
export class DownloadOrigenFail implements Action {
  readonly type = actions.DOWNLOAD_FAIL;
  constructor(public payload: any) { }
}

export class ResetOrigen implements Action {
  readonly type = actions.RESET;
  constructor(public payload: any = null) {};
}

export type OrigenActions
  = AddOrigen
  | AddOrigenSuccess
  | AddOrigenFail
  | UpdateOrigen
  | UpdateOrigenSuccess
  | UpdateOrigenFail
  | DeleteOrigen
  | DeleteOrigenSuccess
  | DeleteOrigenFail
  | GetAllOrigen
  | GetAllOrigenSuccess
  | GetAllOrigenFail
  | DownloadOrigen
  | DownloadOrigenSuccess
  | DownloadOrigenFail
  | ResetOrigen;
