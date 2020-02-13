import { Compensacion } from '../../../../consultas/models';
import { CompensacionActions, actions } from '../../actions/consultas/compensacion.actions';
import { RESOURCE_ACTIONS } from '../../../utils';
import { ConsultaState } from '../entity-state.model';


const INITIAL_STATE: ConsultaState<Compensacion> = {
  data: [],
  selected: null,
  action: null,
  loading: false,
  done: false,
  failed: false,
  errors: null,
  doneMessage: null,
  currentDetail: null,
  pagination: false
}
export function consultaCompensacionReducer(state = INITIAL_STATE, action: CompensacionActions): ConsultaState<Compensacion> {
  switch (action.type) {
    case actions.RESET:
      return {
      ...INITIAL_STATE
    };
    case actions.GET_CRITERIO_PAGINADO:
        //console.log("get_criterio");
      return {
        ...state,
        action: RESOURCE_ACTIONS.CONSULTA,
        loading: true,
        done: false,
        failed: false,
        pagination: true,
        errors: null,
        selected: null,

      };
    case actions.GET_CRITERIO_PAGINADO_SUCCESS:
      //console.log("get_criterio bueno");
      return {
        ...state,
        data: action.payload,
        loading: false,
        done: true,
        failed: false,
        pagination: true,
        errors: null,
        selected: null,

      };
    case actions.GET_CRITERIO_PAGINADO_FAIL:
  //console.log("get_criterio false");
      return {
        ...state,
        data: [],
        loading: false,
        done: false,
        failed: true,
        pagination: true,
        errors: action.payload,
        selected: null,

      };
      case actions.GET_DETALLE:
        return {
          ...state,
          action: RESOURCE_ACTIONS.CONSULTA_DETALLE,
          loading: true,
          done: false,
          failed: false,
          pagination: false,
          errors: null,
          selected: action.payload,
          currentDetail: {}

        };
      case actions.GET_DETALLE_SUCCESS:
        return {
          ...state,
          loading: false,
          done: true,
          failed: false,
          pagination: false,
          errors: null,
        currentDetail: action.payload

        };
      case actions.GET_DETALLE_FAIL:
        return {
          ...state,
          loading: false,
          done: false,
          failed: true,
          pagination: false,
          errors: action.payload,
          currentDetail: {}
        };
    default:
        return state;
  }

  }
