export interface MenuArbol {
  idMenu: number,
  descripcionMenu: string,
  icono: string, 
  url: string,
  idsRecursosPermitidos?: string[],
  subMenusArboles: MenuArbol[]
}