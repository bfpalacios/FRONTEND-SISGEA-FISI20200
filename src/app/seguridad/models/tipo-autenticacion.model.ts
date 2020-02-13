export interface TipoAutenticacion {
  idTipoAutenticacion: number,
  descripcionTipoAutenticacion: string,
  servicioAutenticacion: string,
  autenticacionLocal: boolean,
  ldapURL?: string,
  ldapDominio?: string,
  ldapNivelSeguridad?: string,
  ldapClaseFactory?: string
}
