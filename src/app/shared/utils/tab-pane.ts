export interface TabPane {
  tituloTabPane?: string; //Titulo del TabPane
  tituloId? : string; //id de la etiqueta <a>
  divContenidoPane?: string; // id de la etiqueta <div>
  divVisible?: boolean; //Indicar si es el div estara visible, OJO: solo uno puede ser true,
  item?: any // para guardar el valor del item 
}
