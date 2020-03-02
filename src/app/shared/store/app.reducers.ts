import { ActionReducerMap } from '@ngrx/store';

import * as fromGlobalData from './reducers/global.reducer';
import * as fromUi from './reducers/ui.reducer';
import * as fromAuth from './reducers/auth/auth.reducer';
import * as fromHelp from './reducers/help.reducer';
/*Mantenimientos*/
import * as fromSolicitante from './reducers/mantenimiento/solicitante.reducer';
import * as fromEspacioAcademico from './reducers/mantenimiento/espacio-academico.reducer';
import * as fromMultitabCab from './reducers/mantenimiento/multitab-cab.reducer';
import * as fromMultitabDet from './reducers/mantenimiento/multitab-det.reducer';
/*Consultas*/

/*Seguridad*/
import * as fromSistema from './reducers/seguridad/sistema.reducer';
import * as fromUsuarioSeg from './reducers/seguridad/usuario.reducer';
import * as fromTipoAutenticacion from './reducers/seguridad/tipo-autenticacion.reducer';
import * as fromParametroSeguridad from './reducers/seguridad/parametro-seguridad.reducer';
import * as fromAccion from './reducers/seguridad/accion.reducer';
import * as fromCategoriaRecurso from './reducers/seguridad/categoria-recurso.reducer';
import * as fromRecursos from './reducers/seguridad/recurso.reducer';
import * as fromMenu from './reducers/seguridad/menu.reducer';
import * as fromTipoMenu from './reducers/seguridad/tipo-menu.reducer';
import * as fromRecursoGrilla from './reducers/seguridad/menu-recurso.reducer';
import * as fromPerfilSeg from './reducers/seguridad/perfil.reducer';
import * as fromPerfilRecurso from './reducers/seguridad/perfil-recurso.reducer';
import * as fromPerfilUsuario from './reducers/seguridad/perfil-usuario.reducer';
import * as fromAsignacionPermisos from './reducers/seguridad/asignacion-permisos.reducer';
import * as fromRecursoAsignacionGrilla from './reducers/seguridad/asignacion-permisos-grilla.reducer';
/*Procesos*/
import * as fromAsignacionEspacios from './reducers/procesos/asignacion-espacios.reducer';
import * as fromSolicitudEspacios from './reducers/procesos/solicitud-espacios.reducer';

/* Mantenimientos */
import {
  Solicitante,
  EspacioAcademico,
  MultitabCab,
MultitabDet,
} from '../../mantenimiento/models';
/* Consultas */
/* Seguridad */
import {
  UsuarioSeg,
  ParametroSeguridad,
  Accion,
  CategoriaRecurso,
  RecursoSeg,
  Menu,
  TipoMenu,
  MenuRecurso,
  Perfil,
  PerfilMenuRecursoNodo
} from '../../seguridad/models';
import { TipoAutenticacion } from '../../seguridad/models/tipo-autenticacion.model';


import { ConsultaState, State } from './reducers/entity-state.model';

export interface AppState {
  // General
  globalData: fromGlobalData.State,
  ui: fromUi.State,
  auth: fromAuth.State,
  help: fromHelp.PageState,
  // Mantenimientos
  solicitantes: State<Solicitante>,
  espaciosAcademico: State<EspacioAcademico>,
  multitabCabs: State<MultitabCab>,
  multitabDets: State<MultitabDet>,
  // Consultas
  // Seguridad
  sistema: fromSistema.SistemaSegState,
  usuariosSeg: State<UsuarioSeg>,
  tiposAutenticacion: State<TipoAutenticacion>,
  parametrosSeguridad: State<ParametroSeguridad>,
  acciones: State<Accion>,
  categoriasRecurso: State<CategoriaRecurso>,
  recursos: State<RecursoSeg>,
  menus: fromMenu.MenuState,
  tiposMenu: State<TipoMenu>,
  menuRecursos: State<MenuRecurso>,
  perfilesSeg: State<Perfil>,
  perfilRecurso: State<any>,
  perfilUsuario: State<any>,
  asignacionPermisos: State<PerfilMenuRecursoNodo>,
  asignacionPermisosGrilla: fromRecursoAsignacionGrilla.RecursoAsignacionState,
  // Procesos
  asignacionEspacios: State<any>,
  solicitudEspacios: State<any>,
}

export const appReducers: ActionReducerMap<AppState> = {
  globalData: fromGlobalData.globalReducer,
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  help: fromHelp.helpReducer,
  // Mantenimientos
  solicitantes: fromSolicitante.solicitanteReducer,
  espaciosAcademico: fromEspacioAcademico.espacioAcademicoReducer,
  multitabCabs: fromMultitabCab.multitabCabReducer,
  multitabDets: fromMultitabDet.multitabDetReducer,
  // Consultas
  // Seguridad
  sistema: fromSistema.sistemaReducer,
  usuariosSeg: fromUsuarioSeg.usuarioReducer,
  tiposAutenticacion: fromTipoAutenticacion.tipoAutenticacionReducer,
  parametrosSeguridad: fromParametroSeguridad.parametroSeguridadReducer,
  acciones: fromAccion.accionReducer,
  categoriasRecurso: fromCategoriaRecurso.categoriaRecursoReducer,
  recursos: fromRecursos.recursoReducer,
  menus: fromMenu.menuReducer,
  tiposMenu: fromTipoMenu.tipoMenuReducer,
  menuRecursos: fromRecursoGrilla.menuRecursoReducer,
  perfilesSeg: fromPerfilSeg.perfilSegReducer,
  perfilRecurso: fromPerfilRecurso.perfilRecursoReducer,
  perfilUsuario: fromPerfilUsuario.perfilUsuarioReducer,
  asignacionPermisos: fromAsignacionPermisos.asignacionPermisosReducer,
  asignacionPermisosGrilla: fromRecursoAsignacionGrilla.asignacionPermisosGrillaReducer,
  asignacionEspacios: fromAsignacionEspacios.asignacionEspaciosReducer,
  solicitudEspacios: fromSolicitudEspacios.solicitudEspaciosReducer,
};
