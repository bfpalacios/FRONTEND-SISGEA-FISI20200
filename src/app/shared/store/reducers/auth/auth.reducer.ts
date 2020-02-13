import * as actions from '../../actions/auth/auth.actions';
import { NavData } from '../../../../_nav';

export interface Permission {
  idRecurso: string,
  accionesAsignadas: string
}

export interface State {
  loaded: boolean,
  loading: boolean,
  failed: boolean,
  user: any | null,
  errorMessage: string,
  permissions: Permission[],
  menuOptions: NavData[],
}

const INITIAL_STATE: State = {
  loaded: false,
  loading: false,
  failed: false,
  user: 'DEFAULT',
  errorMessage: null,
  permissions: [],
  menuOptions: []
}

export function authReducer(state = INITIAL_STATE, action: actions.Actions): State {
  switch (action.type) {
    case actions.authActions.RESET:
      return { ...INITIAL_STATE }
    case actions.authActions.LOGIN:
    case actions.authActions.LOGOUT:
      return {
        ...state,
        loading: true,
        loaded: false,
        failed: false,
        errorMessage: null,
        permissions: [],
        menuOptions: []
      };
    case actions.authActions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        failed: false,
        errorMessage: null,
        user: action.payload.user,
        permissions: action.payload.permisos,
        menuOptions: action.payload.options
      };
    case actions.authActions.LOGOUT_SUCCESS:
      return { ...INITIAL_STATE };
    case actions.authActions.LOGIN_FAIL:
      return {
        ...INITIAL_STATE,
        failed: true,
        errorMessage: action.payload,
        menuOptions: [],
        permissions: []
      };
    case actions.authActions.LOGOUT_FAIL:
      return { ...INITIAL_STATE, failed: true };
    case actions.authActions.SET_MENU_OPTIONS:
      return {
        ...state,
        menuOptions: action.payload
      };
    case actions.authActions.SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload
      }
    case actions.authActions.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case actions.authActions.INIT_APP_FAIL:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}