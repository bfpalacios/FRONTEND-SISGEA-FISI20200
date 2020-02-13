import { HttpErrorResponse } from '@angular/common/http';

export interface State<T> {
  data: Array<T>,
  selected: T,
  action: string,
  loading: boolean,
  done: boolean,
  failed: boolean,
  errors?: HttpErrorResponse,
  doneMessage?: string,
  dataOtherRequest?: Array<T>,
  otherRequest?: number //por si se hace otra peticion: 0-none, 1-cargando, 2-exito, 3-fallido
}

export interface ConsultaState<T> extends State<T> {
  currentDetail: any,
  pagination?: boolean,
  filtering?: boolean,
  sorting?: boolean,
  filtered?: boolean,
  sorted?: boolean,
}

export interface ComisCompensacionState<T> extends ConsultaState<T> {
  currentCommissions:boolean,
}

export interface DetalleConsultaState<T> extends ConsultaState<T> {
  currentDetails : boolean,
}


export interface CargaState<T> {
  data: Array<T>,
  selected: T,
  action: string,
  loading: boolean,
  done: boolean,
  failed: boolean,
  errors?: HttpErrorResponse,
  doneMessage?: string,
}


/*
{
  idReporte:number,
  nombre: string,
  descripcion:string,
  descCorta:string, // CAMELCASE e.e
  queryReporte:string,
  frecuencia:number,
  tablas:[
    {
      idReporte: null,
      idTabla: 1,
      tabla: "MAE_CAMPO",
      instancia: c,
      orden : 1,
      esBase: 1
    },{
      idReporte: null,
      idTabla: 2,
      tabla: "MAE_TABLA",
      instancia: t,
      orden : 2,
      esBase: 1
    },{
      idReporte: null,
      idTabla: 3,
      tabla: "MAE_TIPO_TABLA",
      instancia: tt,
      orden : 3,
      esBase: 0
    }

  ]
  campos:[
    {
      idReporte: number,
      idTabla: 1,
      tabla: "MAE_CAMPO",
      idInstanciaTabla: c,
      idCampo:40,
      campo: "ID_TABLA",
      idTablaFrom: 0,
      idCampoFrom: 0,
      orderBy: null,
      enSelect: 0,
      enGroupBy: 0,
      funcionGrupo: null
    },{
      idReporte: number,
      idTabla: 2,
      tabla: "MAE_TABLA",
      idInstanciaTabla: t,
      idCampo:47,
      campo: "ID_TABLA",
      idTablaFrom: 1,
      idCampoFrom: 40,
      orderBy: null,
      enSelect: 0,
      enGroupBy: 0,
      funcionGrupo: null
    },{
      idReporte: number,
      idTabla: 2,
      tabla: "MAE_TABLA",
      idInstanciaTabla: t,
      idCampo:67,
      campo: "ID_TIPO_TABLA",
      idTablaFrom: 0,
      idCampoFrom: 0,
      orderBy: null,
      enSelect: 0,
      enGroupBy: 0,
      funcionGrupo: null
    },{
      idReporte: number,
      idTabla: 3,
      tabla: "MAE_TIPO_TABLA",
      idInstanciaTabla: tt,
      idCampo:87,
      campo: "ID_TIPO_TABLA",
      idTablaFrom: 2,
      idCampoFrom: 67,
      orderBy: null,
      enSelect: 0,
      enGroupBy: 0,
      funcionGrupo: null
    },{
      idReporte: number,
      idTabla: 1,
      tabla: "MAE_CAMPO",
      idInstanciaTabla: c,
      idCampo:24,
      campo: "NOMBRE",
      idTablaFrom: 0,
      idCampoFrom: 0,
      orderBy: null,
      enSelect: 1,
      enGroupBy: 0,
      funcionGrupo: null
     },{
      idReporte: number,
      idTabla: 2,
      tabla: "MAE_TABLA",
      idInstanciaTabla: t,
      idCampo:45,
      campo: "NOMBRE",
      idTablaFrom: 1,
      idCampoFrom: 40,
      orderBy: "ASC",
      enSelect: 1,
      enGroupBy: 0,
      funcionGrupo: null
    }
  ],
  filtros:[
    {
      idReporte: number,
      idTabla: 2,
      idCampo:45,
      idInstanciaTabla: t,
      idOperador:98,
      simboloOperador:">",
      valor:"50"
      operadorLogico:null,
      tipoFiltro:1
    }
  ]

}
*/

/*
  Estructura general de las tablas
  tabla={
     //Los añade Mario con el modal incluir tabla o desde el combo tabla base
     idTabla:7,
     tabla:'MAE_BIN',
     //Los añade Cristhian en su algoritmo
     idInstancia:bin,
     idQuery:1,
     orden:1
  }
  //Nota: Karen solo debes añadir en la tabla-generar-reporte los campos cuyo valor de enSelect=1
  campo={
    //Los añade Vieri con el modal incluir campo o Mario con modal incluir tabla
    idTabla:7,
    tabla:'MAE_BIN'
    idCampo:78,
    campo:'ID_BIN',
    idTablaFrom:null,
    tablaFrom:'',
    idCampoFrom:null,
    enSelect:1,
    //Los añade Karen en tabla-generar-reporte
    orderBy:'DESC', //puede tomar valores null, DESC o ASC
    //Los añade Cristhian en su algoritmo
    idInstancia:'bin',
    orden:1 //Hace referencia al orden de la tabla a la que pertenece el campo
  }
  filtro={
    //Los añade Bryan con modal filtro campo
    idTabla:7,
    idCampo:78,
    idInstancia:'bin',
    idOperador:1,
    valor:5,
    tipoFiltro:'WHERE', //puede ser WHERE o HAVING
    operadorLogico:null //puede ser AND, OR, null
  }
*/
