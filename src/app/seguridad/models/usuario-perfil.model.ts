export interface UsuarioPerfil {
  idUsuarioPerfil: number,
  username: number,
  idSistema: number,
  descripcionSistema?: string,
  idPerfil: number,
  descripcionPerfil?: string,
  contrasenia: string,
  confirmaContrasenia?: string, 
  activo: boolean,
  visualizaPAN: boolean
}