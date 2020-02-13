import { Action } from '@ngrx/store';
import { Solicitante } from '../../../../mantenimiento/models';
import { getCommonCrudActions } from '../common-actions';

export const actions = {
  ...getCommonCrudActions('Solicitante')
}

export class AddSolicitante implements Action {
  readonly type = actions.ADD;
  constructor(public payload: any) {}
}
export class AddSolicitanteSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {}
}
export class AddSolicitanteFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {}
}

export class UpdateSolicitante implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) {}
}
export class UpdateSolicitanteSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateSolicitanteFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {}
}

export class DeleteSolicitante implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) {}
}
export class DeleteSolicitanteSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {}
}
export class DeleteSolicitanteFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {}
}

export class GetAllSolicitante implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload = null) {}
}
export class GetAllSolicitanteSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: Solicitante[]) {}
}
export class GetAllSolicitanteFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: any) {}
}

export class DownloadSolicitante implements Action {
  readonly type = actions.DOWNLOAD;
  constructor(public payload: any = null) { }
}
export class DownloadSolicitanteSuccess implements Action {
  readonly type = actions.DOWNLOAD_SUCCESS;
  constructor(public payload: any) { }
}
export class DownloadSolicitanteFail implements Action {
  readonly type = actions.DOWNLOAD_FAIL;
  constructor(public payload: any) { }
}

export class ResetSolicitante implements Action {
  readonly type = actions.RESET;
  constructor(public payload: any = null) {};
}

export type SolicitanteActions
  = AddSolicitante
  | AddSolicitanteSuccess
  | AddSolicitanteFail
  | UpdateSolicitante
  | UpdateSolicitanteSuccess
  | UpdateSolicitanteFail
  | DeleteSolicitante
  | DeleteSolicitanteSuccess
  | DeleteSolicitanteFail
  | GetAllSolicitante
  | GetAllSolicitanteSuccess
  | GetAllSolicitanteFail
  | DownloadSolicitante
  | DownloadSolicitanteSuccess
  | DownloadSolicitanteFail
  | ResetSolicitante;
