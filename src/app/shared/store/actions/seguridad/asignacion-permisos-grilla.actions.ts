import { getCommonCrudActions } from '../common-actions';
import { Action } from '@ngrx/store';
import { CategoriaRecursoAsignacion } from '../../../../seguridad/models';

export const actions = {
  ...getCommonCrudActions('Asignacion Permisos Grilla'),
}

export class ResetAsignacionPermisosGrilla implements Action {
  readonly type = actions.RESET;
  constructor(public payload = null) { }
}

export class GetAllAsignacionPermisosGrilla implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload: CategoriaRecursoAsignacion) { }
}

export type AsignacionPermisosGrillaActions =
  ResetAsignacionPermisosGrilla
  | GetAllAsignacionPermisosGrilla;