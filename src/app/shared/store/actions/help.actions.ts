import  { Action } from '@ngrx/store';

export const actions = {
  UPDATE_PAGE: '[Help] Actualizando pagina'
};

export class UpdatePage implements Action {
  readonly type = actions.UPDATE_PAGE;
  constructor(public payload: any){}
}

export type HelpActions
  = UpdatePage;
