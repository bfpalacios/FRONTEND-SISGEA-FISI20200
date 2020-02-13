import { getCommonCrudActions } from '../common-actions';
import { Action } from '@ngrx/store';
import { CriterioBusquedaPerfilMenuRecurso, PerfilMenuRecursoRequest, PerfilMenuRecursoNodo } from '../../../../seguridad/models';

export const actions = {
  ...getCommonCrudActions('AsignacionPermisos'),
  GET_BY_SISTEMA_PERFIL: '[AsignacionPermisos] Obtener por sistema y perfil',
  GET_BY_SISTEMA_PERFIL_SUCCESS: '[AsignacionPermisos] Obtener por sistema y perfil correcto',
  GET_BY_SISTEMA_PERFIL_FAIL: '[AsignacionPermisos] Error al obtener por sistema y perfil',
}

export class GetMenuBySistemaPerfil implements Action {
  readonly type = actions.GET_BY_SISTEMA_PERFIL;
  constructor(public payload: CriterioBusquedaPerfilMenuRecurso) { }
}
export class GetMenuBySistemaPerfilSuccess implements Action {
  readonly type = actions.GET_BY_SISTEMA_PERFIL_SUCCESS;
  constructor(public payload: PerfilMenuRecursoNodo[]) { }
}
export class GetMenuBySistemaPerfilFail implements Action {
  readonly type = actions.GET_BY_SISTEMA_PERFIL_FAIL;
  constructor(public payload: any) { }
}

export class AddPerfilMenuRecurso implements Action {
  readonly type = actions.ADD;
  constructor(public payload: { idSistema: number, idPerfil: number, data: PerfilMenuRecursoRequest[] }) { }
}
export class AddPerfilMenuRecursoSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) { }
}
export class AddPerfilMenuRecursoFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) { }
}

export class ResetPerfilMenuRecurso implements Action {
  readonly type = actions.RESET;
  constructor(public payload = null) { }
}

export type PerfilMenuRecursoActions =
  GetMenuBySistemaPerfil
  | GetMenuBySistemaPerfilSuccess
  | GetMenuBySistemaPerfilFail
  | AddPerfilMenuRecurso
  | AddPerfilMenuRecursoSuccess
  | AddPerfilMenuRecursoFail
  | ResetPerfilMenuRecurso;