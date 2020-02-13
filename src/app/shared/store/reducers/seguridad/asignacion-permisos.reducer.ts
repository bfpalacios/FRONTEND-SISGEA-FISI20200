import { State } from "../entity-state.model";
import { PerfilMenuRecursoNodo } from "../../../../seguridad/models";
import { RESOURCE_ACTIONS } from "../../../utils";
import { actions, PerfilMenuRecursoActions } from "../../actions/seguridad/asignacion-permisos.actions";

const INITIAL_STATE: State<PerfilMenuRecursoNodo> = {
  data: [],
  selected: null,
  action: null,
  loading: false,
  done: false,
  failed: false,
  errors: null,
  doneMessage: null
};

export function asignacionPermisosReducer(state = INITIAL_STATE, action: PerfilMenuRecursoActions): State<PerfilMenuRecursoNodo> {
  switch (action.type) {
    case actions.RESET:
      return { ...INITIAL_STATE };
    case actions.GET_BY_SISTEMA_PERFIL: {
      return {
        ...state,
        action: RESOURCE_ACTIONS.CONSULTA,
        loading: true,
        done: false,
        failed: false,
        errors: null,
        selected: null
      };
    }
    case actions.GET_BY_SISTEMA_PERFIL_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        done: true,
        failed: false,
        errors: null,
        selected: null
      };
    }
    case actions.GET_BY_SISTEMA_PERFIL_FAIL: {
      return {
        ...state,
        data: [],
        loading: false,
        done: false,
        failed: true,
        errors: action.payload,
        selected: null
      };
    }
    case actions.ADD: {
      return {
        ...state,
        action: RESOURCE_ACTIONS.REGISTRO,
        selected: null,
        loading: true,
        done: false,
        failed: false,
        errors: null
      };
    }
    case actions.ADD_SUCCESS: {
      return {
        ...state,
        selected: null,
        loading: false,
        done: true,
        failed: false,
        errors: null,
        doneMessage: action.payload.message
      };
    }
    case actions.ADD_FAIL: {
      return {
        ...state,
        selected: null,
        loading: false,
        done: false,
        failed: true,
        errors: action.payload
      };
    }
    default:
      return state;
  }
}
