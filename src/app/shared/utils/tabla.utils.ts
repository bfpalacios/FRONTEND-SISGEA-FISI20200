export interface Table {
  listaCabecera: string [],
  listaFilas: Row [],
  listaPie: string [],
}

export interface Row{
  fila : Cell[],
}

export interface Cell{
  //Si la celda es un checkbox
  check? : boolean,
  checked? : boolean,
  valueCheckBox? : string,
  //Si la celda es un label
  text? : string,
  label?: boolean,
  data? : string;
  //Si la celda es un boton
  btn?: boolean,
  btnClass?: string,
  iClass? : string,
  eventClickBtn? : any,
}

export interface ColumnDef{
  nombreData? : string,
  nombreText? : string,
}


export function addRow(data : object, table: Table){
  let valores = Object.values(data);
  let celda : Cell [];
  if(valores.length === table.listaCabecera.length){
    for(let i=0; i<valores.length; i++){
      let aux : Cell = {
        'text' : valores[i].toString(),
        'label' : true,
      };
      celda.push(aux);
    }
    let fila :  Row = {
      fila : celda
    };
    table.listaFilas.push(fila);
  }else{
    return new Error('ERROR!! Las cantidad de columnas de la tabla definida no son iguales al data enviada')
  }
}
