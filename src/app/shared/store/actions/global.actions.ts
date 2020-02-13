import  { Action } from '@ngrx/store';

export const actions = {
  GET_ALL: '[Global] Get all data',
  UPDATE_PAGE: '[Global] Actualizando pagina'
};

export class GetAllGlobalData implements Action {
  readonly type = actions.GET_ALL;
  constructor(public payload:any = null){}
}

export type GlobalDataActions
  = GetAllGlobalData;
