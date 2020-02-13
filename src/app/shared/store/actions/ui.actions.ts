import { Action } from '@ngrx/store';

export const actions = {
  SET_CURRENT_TITLE: '[Titulo] Establecer titulo actual'
}

export class SetCurrentTitleAction implements Action {
  readonly type = actions.SET_CURRENT_TITLE;
  constructor(public payload:string){}
}

export type UiActions 
  = SetCurrentTitleAction;