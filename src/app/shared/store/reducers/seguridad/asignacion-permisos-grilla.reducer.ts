import { State } from "../entity-state.model";
import { RecursoAsignacion, Accion } from '../../../../seguridad/models';
import { AsignacionPermisosGrillaActions, actions } from '../../actions/seguridad/asignacion-permisos-grilla.actions';
import { filterSimpleArray } from '../../../utils';

export interface RecursoAsignacionState extends State<RecursoAsignacion> {
  idCategoriaRecurso: number,
  accionesPermitidas: Accion[]
}

const INITIAL_STATE: RecursoAsignacionState = {
  data: [],
  accionesPermitidas: [],
  selected: null,
  action: null,
  loading: false,
  done: false,
  failed: false,
  errors: null,
  doneMessage: null,
  idCategoriaRecurso: null
}

export function asignacionPermisosGrillaReducer(state = INITIAL_STATE, action: AsignacionPermisosGrillaActions): RecursoAsignacionState {
  switch (action.type) {
    case actions.RESET:
      return { ...INITIAL_STATE };
    case actions.GET_ALL:
      let recursos = [...action.payload.recursos];
      action.payload.accionesPermitidas.forEach(accion => {
        recursos.map(r => {
          r[`${accion.idAccion}`] = {};
          r[`${accion.idAccion}`]['visible'] = filterSimpleArray(r.idsAccionesPermitidas, accion.idAccion) === null ? false : true;
          r[`${accion.idAccion}`]['value'] = filterSimpleArray(r.idsAccionesAsignadas, accion.idAccion) === null ? false : true;
        });
      });
      return {
        ...state,
        idCategoriaRecurso: action.payload.idCategoriaRecurso,
        accionesPermitidas: JSON.parse(JSON.stringify(action.payload.accionesPermitidas)),
        data: JSON.parse(JSON.stringify(recursos))
      }
    default:
      return state;
  }
}