import { Action } from '@ngrx/store';
import { MultitabDet } from '../../../../mantenimiento/models';
import { getCommonCrudActions } from '../common-actions';

export const actions = {
  ...getCommonCrudActions('MultitabDet'),
  GET_BY_MULTITABCAB: '[MultitabDet] Obtener por cabecera',
  GET_BY_MULTITABCAB_SUCCESS: '[MultitabDet] Obtener por cabecera correcto',
  GET_BY_MULTITABCAB_FAIL: '[MultitabDet] Error al obtener por cabecera',

  GET_BY_MULTITABCAB_B: '[MultitabDet] Obtener tabla por cabecera',
  GET_BY_MULTITABCAB_B_SUCCESS: '[MultitabDet] Obtener tabla por cabecera correcto',
  GET_BY_MULTITABCAB_B_FAIL: '[MultitabDet] Error al obtener tabla por cabecera',

  GET_ESTADO_TRANSACCION : `[Estado Transacción] Obtener estado transacción`,
  GET_ESTADO_TRANSACCION_SUCCESS : `[Estado Transacción] Obtener estado transacción correcto`,
  GET_ESTADO_TRANSACCION_FAIL : `[Estado Transacción] Error al obtener estado transacción`,
}

export class AddMultitabDet implements Action {
  readonly type = actions.ADD;
  constructor(public payload: any) {}
}
export class AddMultitabDetSuccess implements Action {
  readonly type = actions.ADD_SUCCESS;
  constructor(public payload: any) {}
}
export class AddMultitabDetFail implements Action {
  readonly type = actions.ADD_FAIL;
  constructor(public payload: any) {}
}

export class UpdateMultitabDet implements Action {
  readonly type = actions.UPDATE;
  constructor(public payload: any) {}
}
export class UpdateMultitabDetSuccess implements Action {
  readonly type = actions.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateMultitabDetFail implements Action {
  readonly type = actions.UPDATE_FAIL;
  constructor(public payload: any) {}
}

export class DeleteMultitabDet implements Action {
  readonly type = actions.DELETE;
  constructor(public payload: any) {}
}
export class DeleteMultitabDetSuccess implements Action {
  readonly type = actions.DELETE_SUCCESS;
  constructor(public payload: any) {}
}
export class DeleteMultitabDetFail implements Action {
  readonly type = actions.DELETE_FAIL;
  constructor(public payload: any) {}
}

export class GetAllMultitabDet implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload = null) {}
}
export class GetAllMultitabDetSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: MultitabDet[]) {}
}
export class GetAllMultitabDetFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: any) {}
}

export class GetByMultitabCab implements Action {
  readonly type = actions.GET_BY_MULTITABCAB;
  constructor(public payload: any) {}
}
export class GetByMultitabCabSuccess implements Action {
  readonly type = actions.GET_BY_MULTITABCAB_SUCCESS;
  constructor(public payload: MultitabDet[]) {}
}
export class GetByMultitabCabFail implements Action {
  readonly type = actions.GET_BY_MULTITABCAB_FAIL;
  constructor(public payload: any) {}
}

export class GetByMultitabCabB implements Action {
  readonly type = actions.GET_BY_MULTITABCAB_B;
  constructor(public payload: any) {}
}
export class GetByMultitabCabBSuccess implements Action {
  readonly type = actions.GET_BY_MULTITABCAB_B_SUCCESS;
  constructor(public payload: MultitabDet[]) {}
}
export class GetByMultitabCabBFail implements Action {
  readonly type = actions.GET_BY_MULTITABCAB_B_FAIL;
  constructor(public payload: any) {}
}

export class GetEstadoTransaccion implements Action {
  readonly type = actions.GET_ESTADO_TRANSACCION;
  constructor(public payload = null) { }
}
export class GetEstadoTransaccionSuccess implements Action {
  readonly type = actions.GET_ESTADO_TRANSACCION_SUCCESS;
  constructor(public payload: MultitabDet[]) { }
}
export class GetEstadoTransaccionFail implements Action {
  readonly type = actions.GET_ESTADO_TRANSACCION_FAIL;
  constructor(public payload: any) { }
}

export class ResetMultitabDet implements Action {
  readonly type = actions.RESET;
  constructor(public payload: any = null) {}
}

export type MultitabDetActions
  = AddMultitabDet
  | AddMultitabDetSuccess
  | AddMultitabDetFail
  | UpdateMultitabDet
  | UpdateMultitabDetSuccess
  | UpdateMultitabDetFail
  | DeleteMultitabDet
  | DeleteMultitabDetSuccess
  | DeleteMultitabDetFail
  | GetAllMultitabDet
  | GetAllMultitabDetSuccess
  | GetAllMultitabDetFail
  | GetByMultitabCab
  | GetByMultitabCabSuccess
  | GetByMultitabCabFail
  | GetByMultitabCabB
  | GetByMultitabCabBSuccess
  | GetByMultitabCabBFail
  | GetEstadoTransaccion
  | GetEstadoTransaccionSuccess
  | GetEstadoTransaccionFail
  | ResetMultitabDet;
