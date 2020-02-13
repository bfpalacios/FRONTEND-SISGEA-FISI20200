import { Action } from '@ngrx/store';
import { UsuarioPerfil } from '../../../../seguridad/models';
import { getCommonCrudActions } from '../common-actions';

export const actions = {
  ...getCommonCrudActions('UsuarioPerfil'),
  GET_BY_USUARIO: '[UsuarioPerfil] Obtener por usuario',
  GET_BY_USUARIO_SUCCESS: '[UsuarioPerfil] Obtener por usuario correcto',
  GET_BY_USUARIO_FAIL: '[UsuarioPerfil] Error al obtener por usuario'
}

export class AddUsuarioPerfil implements Action {
  readonly type = actions.ADD;
  constructor(public payload: any) { }
}
export class AddUsuarioPerfilSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) { }
}
export class AddUsuarioPerfilFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) { }
}

export class UpdateUsuarioPerfil implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) { }
}
export class UpdateUsuarioPerfilSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) { }
}
export class UpdateUsuarioPerfilFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) { }
}

export class DeleteUsuarioPerfil implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) { }
}
export class DeleteUsuarioPerfilSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) { }
}
export class DeleteUsuarioPerfilFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) { }
}

export class GetUsuarioPerfilByUsuario implements Action {
  readonly type = actions.GET_BY_USUARIO;
  constructor(public payload: string) { }
}
export class GetUsuarioPerfilByUsuarioSuccess implements Action {
  readonly type = actions.GET_BY_USUARIO_SUCCESS;
  constructor(public payload: UsuarioPerfil[]) { }
}
export class GetUsuarioPerfilByUsuarioFail implements Action {
  readonly type = actions.GET_BY_USUARIO_FAIL;
  constructor(public payload: any) { }
}

export class ResetUsuarioPerfil implements Action {
  readonly type = actions.RESET;
  constructor(public payload: any = null) { }
}

export type UsuarioPerfilActions
  = AddUsuarioPerfil
  | AddUsuarioPerfilSuccess
  | AddUsuarioPerfilFail
  | UpdateUsuarioPerfil
  | UpdateUsuarioPerfilSuccess
  | UpdateUsuarioPerfilFail
  | DeleteUsuarioPerfil
  | DeleteUsuarioPerfilSuccess
  | DeleteUsuarioPerfilFail
  | GetUsuarioPerfilByUsuario
  | GetUsuarioPerfilByUsuarioSuccess
  | GetUsuarioPerfilByUsuarioFail
  | ResetUsuarioPerfil;
