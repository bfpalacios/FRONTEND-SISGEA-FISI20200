import { Accion } from './accion.model';

export interface PerfilMenuRecursoNodo {
  idMenu?: number,
  descripcionMenu?: string,
  idTipoMenu?: string,
  categoriasRecursos?: CategoriaRecursoAsignacion[]
  subPerfilMenuRecursoArbolAsignacionResponse?: PerfilMenuRecursoNodo[]
}

export interface CategoriaRecursoAsignacion {
  idCategoriaRecurso: number,
  descripcionCategoriaRecurso: string,
  accionesPermitidas: Accion[],
  recursos: RecursoAsignacion[]
}

export interface RecursoAsignacion {
  idRecurso: string,
  descripcionRecurso?: string,
  idsAccionesPermitidas: number[],
  idsAccionesAsignadas: number[],
  [s: string]: any
}

export interface PerfilMenuRecursoRequest {
  idSistema: number,
  idPerfil: number,
  idMenu: number,
  idRecurso: string,
  idsAccionesAsignadas: number[]
}

export interface CriterioBusquedaPerfilMenuRecurso {
  idSistema: number,
  idPerfil: number,
  presentacion: string
}
