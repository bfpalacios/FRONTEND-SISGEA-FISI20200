import { State } from "../entity-state.model";
import { TipoMenu } from "../../../../seguridad/models";
import { RESOURCE_ACTIONS } from "../../../utils";
import { actions, TipoMenuActions } from "../../actions/seguridad/tipo-menu.action";

const INITIAL_STATE: State<TipoMenu> = {
  data: [],
  selected: null,
  action: null,
  loading: false,
  done: false,
  failed: false,
  errors: null,
  doneMessage: null
};

export function tipoMenuReducer(state = INITIAL_STATE, action: TipoMenuActions): State<TipoMenu> {
  switch (action.type) {
    case actions.GET_ALL: {
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
    case actions.GET_ALL_SUCCESS: {
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
    case actions.GET_ALL_FAIL: {
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
    default:
      return state;
  }
}
