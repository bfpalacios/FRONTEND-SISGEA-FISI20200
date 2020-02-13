import { getCommonCrudActions } from "../common-actions";
import { Action } from "@ngrx/store";
import { TipoMenu } from "../../../../seguridad/models";

export const actions = {
  ...getCommonCrudActions('TipoMenu')
};

export class GetAllTipoMenu implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload = null) {
  }
}
export class GetAllTipoMenuSuccess implements Action {
  readonly type = actions.GET_ALL_SUCCESS;
  constructor(public payload: TipoMenu[]) {
  }
}
export class GetAllTipoMenuFail implements Action {
  readonly type = actions.GET_ALL_FAIL;
  constructor(public payload: any) {
  }
}

export type TipoMenuActions =
  GetAllTipoMenu
  | GetAllTipoMenuSuccess
  | GetAllTipoMenuFail;
