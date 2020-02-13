import { Accion } from './accion.model';

export interface CategoriaRecurso {
  idCategoriaRecurso: number,
  descripcionCategoriaRecurso: string,
  accionesPermitidas: Accion[],
  idsAccionesPermitidas: number[]

}
