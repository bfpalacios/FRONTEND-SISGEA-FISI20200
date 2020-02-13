import { HelpActions, actions } from '../actions/help.actions';

export interface PageState {
  component: any,
}

const INITIAL_STATE: PageState = {
  component: null
}

export function helpReducer(state = INITIAL_STATE, action: HelpActions): PageState {
  switch (action.type) {
    case actions.UPDATE_PAGE:
      return {
        component: action.payload
      };
    default:
      return state;
  }
}
