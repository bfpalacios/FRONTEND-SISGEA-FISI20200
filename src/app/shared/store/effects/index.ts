import { AuthEffects } from './auth/auth.effects';
import { AuthSistemaEffects } from './auth/auth-sistema.effects';
// Mantenimientos
import { SolicitanteEffects } from './mantenimiento/solicitante.effects';
import { EspacioAcademicoEffects } from './mantenimiento/espacio-academico.effects';
import { MultitabCabEffects } from './mantenimiento/multitab-cab.effects';
import { MultitabDetEffects } from './mantenimiento/multitab-det.effects';
// Consultas

// Seguridad
import { SistemaEffects } from './seguridad/sistema.effects';
import { UsuarioSegEffects } from './seguridad/usuario-seg.effects';
import { TipoAutenticacionEffects } from './seguridad/tipo-autenticacion.effects';
import { ParametroSeguridadEffects } from './seguridad/parametro-seguridad.effects';
import { CategoriaRecursoEffects } from './seguridad/categoria-recurso.effects';
import { AccionEffects } from './seguridad/accion.effects';
import { RecursoEffects } from './seguridad/recurso.effects';
import { MenuEffects } from './seguridad/menu.effects';
import { TipoMenuEffects } from './seguridad/tipo-menu.effects';
import { PerfilEffects } from './seguridad/perfil.effects';
import { AsignacionPermisosEffects } from './seguridad/asignacion-permisos.effects';
import { MenuRecursoEffects } from './seguridad/menu-recurso.effects';
import { PerfilRecursoEffects } from './seguridad/perfil-recurso.effects';
import { PerfilUsuarioEffects } from './seguridad/perfil-usuario.effects';

// Procesos
import { AsignacionEspaciosEffects } from './procesos/asignacion-espacios.effects';
import { SolicitudEspaciosEffects } from './procesos/solicitud-espacios.effects';

export const effectsArr = [
  AuthEffects,
  AuthSistemaEffects,
  // Mantenimientos
  SolicitanteEffects,
  EspacioAcademicoEffects,
  MultitabCabEffects,
  MultitabDetEffects,
  // Consultas
  // Seguridad
  SistemaEffects,
  UsuarioSegEffects,
  TipoAutenticacionEffects,
  ParametroSeguridadEffects,
  CategoriaRecursoEffects,
  AccionEffects,
  RecursoEffects,
  MenuEffects,
  TipoMenuEffects,
  PerfilEffects,
  AsignacionPermisosEffects,
  MenuRecursoEffects,
  PerfilRecursoEffects,
  PerfilUsuarioEffects,
  //Procesos
  AsignacionEspaciosEffects,
  SolicitudEspaciosEffects,
];

export * from './auth/auth.effects';
export * from './auth/auth-sistema.effects';
// Mantenimientos
export * from './mantenimiento/solicitante.effects';
export * from './mantenimiento/espacio-academico.effects';
export * from './mantenimiento/multitab-cab.effects';
export * from './mantenimiento/multitab-det.effects';
// Consultas
// Seguridad
export * from './seguridad/sistema.effects';
export * from './seguridad/usuario-seg.effects';
export * from './seguridad/tipo-autenticacion.effects';
export * from './seguridad/parametro-seguridad.effects';
export * from './seguridad/categoria-recurso.effects';
export * from './seguridad/accion.effects';
export * from './seguridad/recurso.effects';
export * from './seguridad/menu.effects';
export * from './seguridad/tipo-menu.effects';
export * from './seguridad/perfil.effects';
export * from './seguridad/asignacion-permisos.effects';
export * from './seguridad/menu-recurso.effects';
export * from './seguridad/perfil-recurso.effects';
export * from './seguridad/perfil-usuario.effects';
// Proceso
export * from './procesos/solicitud-espacios.effects';
export * from './procesos/asignacion-espacios.effects';
