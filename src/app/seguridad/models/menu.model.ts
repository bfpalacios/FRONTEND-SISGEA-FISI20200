import { Accion } from './accion.model';

export interface Menu {
  idSistema: number,
  idMenu: number,
  descripcionMenu: string,
  idMenuPadre?: number,
  icono?: string,
  url?: string,
  idTipoMenu?: string,
  menusRecursos?: MenuRecurso[],
  descripcionSistema?: string,
  descripcionMenupadre?: string,
  descripcionTipoMenu?: string
}

export interface MenuRecurso {
  idSistema?: number,
  idMenu?: number,
  idRecurso: string,
  idsAccionesPermitidas?: number[],
  descripcionRecurso?: string,
  accionesPermitidas?: Accion[],
}

export interface CriterioBusquedaMenu {
  idSistema: number,
  presentacion: string
}

export const TIPO_PRES_MENU = {
  SIMPLE: 'simple',
  ARBOL: 'arbol'
}