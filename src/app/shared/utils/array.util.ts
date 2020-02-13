import { joinWords, DEFAULT_SEPARATOR } from './strings.util';

export function filterObjArray<T>(arr: T[], key: string, value: any): T {
  let res = arr.filter(item => item[key] === value);
  return res.length === 0 ? null : res[0];
}

export function filterObjsArray<T>(arr: T[], key: string, value: any): T[] {
  let res = arr.filter(item => item[key] === value);
  return res.length === 0 ? null : res;
}

export function filterSimpleArray(arr: any[], value: any): any {
  let res = arr.filter(item => item === value);
  return res.length === 0 ? null : res[0];
}

export function extractSimpleArrayFromObjArray(arr: any[], key: string): any[] {
  let out = [];
  arr.forEach(e => out.push(e[key]));
  return out;
}

export function arrayToCadenaComas(arr: any[], key: string): string{
  let arrAux: any[] = [];
  let strComas: string = '';
  arr.forEach(e => arrAux.push(e[key]));
  strComas = arrAux.join(',');
  return strComas;
}

/**
 * Agrega un atributo a cada objeto de un arreglo en base a las propiedades
 * que se le pase como parámetro. Esta función se usará generalmente
 * en un effect luego de obtener los datos (cuando la data se vaya a utilizar en un select
 * en algun componente)
 * Ejemplo de uso:
 * codigosTransaccion = addLabelToObjsArr(data, 'label', true, 'idCodigoTransaccion','descripcionCodigoTransaccion')
 * @param arr Data
 * @param keyLabelName Nombre de la propiedad a agregar
 * @param getNew Indicador de si se obtendra un nuevo array o se modificará el mismo,
 *  true: cuando se llame a la funcion fuera de un effect
 *  false: cuando se llame a la funcion dentro de un effect
 * @param keys Lista de atributos a considerar
 * @returns nuevo array en caso getNew sea true
 */
export function addLabelToObjsArr(arr: any[], keyLabelName: string, getNew: boolean, ...keys: string[]) {
  let newArr = getNew ? JSON.parse(JSON.stringify(arr)) : arr;
  newArr.map(item => {
    let values = [];
    keys.forEach(key => values.push(item[key]));
    item[keyLabelName] = joinWords(DEFAULT_SEPARATOR, ...values);
  })
  return newArr;
}

/**
 * Agrega un atributo a cada objeto de un arreglo en base a la función que se le
 * pase como parámetro
 * Ejemplo de uso:
 * codigosTransaccion = addLabelFnToObjsArray(data, 'label', true, (item) =>
        joinWords(DEFAULT_SEPARATOR, item.idClaseTransaccion*100+item.idCodigoTransaccion, item.descripcionCodigoTransaccion))
 * @param arr Data
 * @param keyLabelName Nombre de la propiedad a agregar
 * @param getNew Indicador de si se obtendra un nuevo array o se modificará el mismo,
 *  true: cuando se llame a la funcion fuera de un effect
 *  false: cuando se llame a la funcion dentro de un effect
 * @param fn Función que retornará el valor del label
 * @returns nuevo array en case getNew sea true
 */
export function addLabelFnToObjsArray(arr: any[], keyLabelName: string, getNew: boolean, fn: Function): any[] {
  let newArr = getNew ? JSON.parse(JSON.stringify(arr)) : arr;
  newArr.map(item => item[keyLabelName] = fn(item))
  return newArr;
}

/**
 * Devuelve un arreglo ordenado de objetos, dado el atributo por el cual se va a ordenar.
 * @param arr Arreglo
 * @param attrName Nombre de la propiedad por la cual se van a ordenar los objetos del arreglo
 */
export function sortByAttr(arr: any[], attrName: string): any[] {
  return arr.sort((item1, item2) => {
    if (!isNaN(item1[attrName]) && !isNaN(item2[attrName]))
      return item1[attrName] - item2[attrName]

    if (!item1[attrName] && item2[attrName])
      return -1;
    if (item1[attrName] && !item2[attrName])
      return 1;
    return item1[attrName] > item2[attrName] ? 1 : item1[attrName] < item2[attrName] ? -1 : 0
  });
}

export function addIndexToArray(arr: any[], key: string): any[] {
  return arr.map((item, index) => item[key] = index);
}

export function removeElementArr(array: any[], element: any){
  var index = array.indexOf(element);
  if (index >= -1) {
    // modifies array in place
    array.splice(index, 1);
  }
}

export function removeElementArrObject(array: any[], element: any){
  let index: number = -1;
  array.forEach(function(item,idx){
    if(element == Object.keys(item)[0]){
      index = idx;
    }
  });
  if (index >= -1)  {
    // modifies array in place
    array.splice(index, 1);
  }
}

export function removeAll(array: any[], element: any): any[] {
  return array.filter(function (item) {
    return item !== element;
  });
}
