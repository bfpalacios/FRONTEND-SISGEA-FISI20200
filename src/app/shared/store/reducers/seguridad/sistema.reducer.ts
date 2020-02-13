import { State } from '../entity-state.model';
import { Sistema } from '../../../../seguridad/models';
import { SistemaActions, actions } from '../../actions/seguridad/sistema.actions';
import { RESOURCE_ACTIONS } from '../../../utils';

export interface SistemaSegState extends State<Sistema> {
  autLocal: { idSistema: number, data: boolean }
}

const INITIAL_STATE: SistemaSegState = {
  action: null,
  data: [],
  loading: false,
  errors: null,
  done: false,
  doneMessage: null,
  failed: false,
  selected: null,
  autLocal: null
}

export function sistemaReducer(state = INITIAL_STATE, action: SistemaActions): SistemaSegState {
  switch (action.type) {
    case actions.GET_ALL:
      return {
        ...state,
        action: RESOURCE_ACTIONS.CONSULTA,
        loading: true,
        done: false,
        failed: false,
        errors: null,
        selected: null
      }
    case actions.GET_ALL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        done: true,
        failed: false,
        errors: null,
        selected: null
      };
    case actions.GET_ALL_FAIL:
      return {
        ...state,
        data: [],
        loading: false,
        done: false,
        failed: true,
        errors: action.payload,
        selected: null
      };

      case actions.ADD: {
        return {
          ...state,
          action: RESOURCE_ACTIONS.REGISTRO,
          selected: action.payload,
          loading: true,
          done: false,
          failed: false,
          errors: null
        };
      }
      case actions.ADD_SUCCESS: {
        const data = [
          ...state.data,
          action.payload.data
        ];
        return {
          ...state,
          data: data,
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
      case actions.UPDATE: {
        return {
          ...state,
          action: RESOURCE_ACTIONS.ACTUALIZACION,
          selected: action.payload,
          loading: true,
          done: false,
          failed: false,
          errors: null
        };
      }
      case actions.UPDATE_SUCCESS: {
        const index = state.data.findIndex(sistema => sistema.idSistema === state.selected.idSistema);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            action.payload.data,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            loading: false,
            done: true,
            failed: false,
            errors: null,
            doneMessage: action.payload.message
          }
        }
        return state;
      }
      case actions.UPDATE_FAIL: {
        return {
          ...state,
          selected: null,
          loading: false,
          done: false,
          failed: true,
          errors: action.payload
        };
      }
      case actions.DELETE: {
        return {
          ...state,
          action: RESOURCE_ACTIONS.ELIMINACION,
          selected: action.payload,
          loading: true,
          done: false,
          errors: null,
          failed: false,
          doneMessage: null
        };
      }
      case actions.DELETE_SUCCESS: {
        const data = state.data.filter(sistema => sistema.idSistema !== state.selected.idSistema);
        return {
          ...state,
          data,
          selected: null,
          loading: false,
          errors: null,
          done: true,
          failed: false,
          doneMessage: action.payload.message
        };
      }
      case actions.DELETE_FAIL: {
        return {
          ...state,
          selected: null,
          loading: false,
          done: false,
          failed: true,
          errors: action.payload
        };
      }
      case actions.GET_ES_AUT_LOCAL:
        return {
          ...state,
          action: RESOURCE_ACTIONS.CONSULTA,
          loading: true,
          done: false,
          failed: false,
          errors: null,
          selected: null
        }
      case actions.GET_ES_AUT_LOCAL_SUCCESS:
        return {
          ...state,
          autLocal: action.payload,
          loading: false,
          done: true,
          failed: false,
          errors: null,
          selected: null
        };
      case actions.GET_ES_AUT_LOCAL_FAIL:
        return {
          ...state,
          autLocal: null,
          loading: false,
          done: false,
          failed: true,
          errors: action.payload,
          selected: null
        };
    default:
      return state;
  }
}