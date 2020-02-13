import { UiActions, actions } from '../actions/ui.actions';
import { NavData, navItems } from '../../../_nav';

export interface State {
  baseTitle: string,
  currentTitle: string,
}

export const INITIAL_STATE: State = {
  baseTitle: 'SISGEA',
  currentTitle: 'SISGEA'
}

export function uiReducer(state = INITIAL_STATE, action: UiActions) {
  switch (action.type) {
    case actions.SET_CURRENT_TITLE:
      return { ...state, currentTitle: state.baseTitle + action.payload };
    default:
      return state;
  }
}
