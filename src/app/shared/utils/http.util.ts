import {HttpParams} from '@angular/common/http'

/* mcoes: Función que sirve para convertir un objeto a formato HttpParams

  Objeto:
  {
    'idATM' : 508,
    'descripcionATM' : 'CAC Centro Civico',
    'codigoRptaSwitch' : '00',
    'bins' : ['433894', '433895', '433896']
  }
  HttpParams:
      idATM=508&codigoRptaSwitch=00&descripcionATM=CAC Centro Civico&bins=433894&bins=433895&bins=433896 --version toString

*/
export function generarURLPeticionGet(criterios: any): HttpParams {

  var params = new HttpParams();

  let atributos = Object.keys(criterios);
  let valores = Object.values(criterios);
  //Recorrer el objeto e ir creando los parametros
  for(var i=0; i<atributos.length; i++){
    if(typeof valores[i] === 'object'){
      let attr = Object.values(valores[i]);
      for(var j=0; j<attr.length; j++){
        params = params.append(atributos[i],String(attr[j]));
      }
    }else{
      params = params.set(atributos[i],String(valores[i]));
    }
  }
  return params;
}
