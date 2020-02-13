import { Action } from '@ngrx/store';
import { EspacioAcademico } from '../../../../mantenimiento/models';
import { getCommonCrudActions } from '../common-actions';

export const actions = {
  ...getCommonCrudActions('EspacioAcademico')
}

export class AddEspacioAcademico implements Action {
  readonly type = actions.ADD;
  constructor(public payload: any) {}
}
export class AddEspacioAcademicoSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {}
}
export class AddEspacioAcademicoFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {}
}

export class UpdateEspacioAcademico implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) {}
}
export class UpdateEspacioAcademicoSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateEspacioAcademicoFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {}
}

export class DeleteEspacioAcademico implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) {}
}
export class DeleteEspacioAcademicoSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {}
}
export class DeleteEspacioAcademicoFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {}
}

export class GetAllEspacioAcademico implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload = null) {}
}
export class GetAllEspacioAcademicoSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: EspacioAcademico[]) {}
}
export class GetAllEspacioAcademicoFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: any) {}
}

export class DownloadEspacioAcademico implements Action {
  readonly type = actions.DOWNLOAD;
  constructor(public payload: any = null) { }
}
export class DownloadEspacioAcademicoSuccess implements Action {
  readonly type = actions.DOWNLOAD_SUCCESS;
  constructor(public payload: any) { }
}
export class DownloadEspacioAcademicoFail implements Action {
  readonly type = actions.DOWNLOAD_FAIL;
  constructor(public payload: any) { }
}

export class ResetEspacioAcademico implements Action {
  readonly type = actions.RESET;
  constructor(public payload: any = null) {};
}

export type EspacioAcademicoActions
  = AddEspacioAcademico
  | AddEspacioAcademicoSuccess
  | AddEspacioAcademicoFail
  | UpdateEspacioAcademico
  | UpdateEspacioAcademicoSuccess
  | UpdateEspacioAcademicoFail
  | DeleteEspacioAcademico
  | DeleteEspacioAcademicoSuccess
  | DeleteEspacioAcademicoFail
  | GetAllEspacioAcademico
  | GetAllEspacioAcademicoSuccess
  | GetAllEspacioAcademicoFail
  | DownloadEspacioAcademico
  | DownloadEspacioAcademicoSuccess
  | DownloadEspacioAcademicoFail
  | ResetEspacioAcademico;
