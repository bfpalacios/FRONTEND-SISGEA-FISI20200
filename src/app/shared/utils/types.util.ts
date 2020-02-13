import { HelpText, HELPS } from './help.util';

export interface Type {
    name: string,
    title: string,
    otherTitle?: string, //Mario: si se desea aniadir un titulo diferente al normal en los mantenimientos
    resource: string,
    fileNameExport?: string,
    module?: string,
    btnIcon?: string,
    btnText?: string,
    helpText?: HelpText,
}

export const MODULE = {
  MANTENIMIENTO: '1',
  CONSULTAS: '2',
  REPORTES: '3',
  PROCESOS: '4',
  SEGURIDAD: '5'
};

export const TYPES = {
  /* Mantenimientos */
  ORIGEN: { name: 'Origen', title: 'Origen', resource: 'MANT_ORIGEN', fileNameExport:"Origenes" , module: MODULE.MANTENIMIENTO},
  CURSO: { name: 'Cursos', otherTitle: 'Carga de Cursos', title: 'Curso', resource: 'MANT_CURSO', fileNameExport:"Cursos" , module: MODULE.MANTENIMIENTO},
  HORARIO: { name: 'Horarios', otherTitle: 'Carga de Horarios', title: 'Curso', resource: 'MANT_HORARIO', fileNameExport:"Horarios" , module: MODULE.MANTENIMIENTO},
  PLAN_ACADEMICO: { name: 'Cursos', otherTitle: 'Carga de Plan Académico', title: 'Plan Académico', resource: 'MANT_PLANACADEMICO', fileNameExport:"PlanAcademico" , module: MODULE.MANTENIMIENTO},
  PROGRAMACION_ACADEMICA: { name: 'Programación Académica', otherTitle: 'Carga de Programación Académica', title: 'Programación Académica', resource: 'MANT_PROGACEDEMICA', fileNameExport:"ProgramacionAcademica" , module: MODULE.MANTENIMIENTO},
  DETALLE_HORARIO: { name: 'Detalle Horario', otherTitle: 'Carga de Detalle Horario', title: 'Detalle Horario', resource: 'MANT_DETHORARIO', fileNameExport:"DetalleHorario" , module: MODULE.MANTENIMIENTO},
  DOCENTES: { name: 'Docentes', otherTitle: 'Carga de Docentes', title: 'Docente', resource: 'MANT_DOCENTE', fileNameExport:"Docentes" , module: MODULE.MANTENIMIENTO},
  SOLICITANTE: { name: 'Solicitante', title: 'Solicitante', resource: 'MANT_SOLICITANTE', fileNameExport:"Solicitantes" , module: MODULE.MANTENIMIENTO},
  ESPACIO_ACADEMICO: { name: 'Espacio Académico', title: 'Espacio académico', resource: 'MANT_ESPACIO_ACADEMICO', fileNameExport:"EspaciosAcademicos" , module: MODULE.MANTENIMIENTO},

  /* Consultas */
  COMPENSACION:{name:'Log Contable',title: 'Log Contable',resource:'CON_COMPENSACION', fileNameExport:"LogContable", module: MODULE.CONSULTAS},
  /*Seguridad*/
  PERFIL: { name: 'Perfil', title: 'Perfil', resource: 'MANT_PERFIL' , fileNameExport:"Perfiles" , module: MODULE.SEGURIDAD},
  USUARIOSEG : {name: 'Usuario', title: 'Usuario', resource: 'MANT_USUARI' , fileNameExport:"Usuarios" , module: MODULE.SEGURIDAD},
  TIPO_AUTENTICACION : {name: 'Tipo Autenticación', title: 'Tipo Autenticación', resource: 'MANT_TIPAUT' , fileNameExport:"Usuarios", module: MODULE.SEGURIDAD},
  PARAMETRO_SEGURIDAD : {name: 'Parámetro Seguridad', title: 'Parametro Seguridad', resource: 'MANT_PARSEG' , fileNameExport:"ParametrosSeguridad", module: MODULE.SEGURIDAD},
  CATEGORIA_RECURSO : {name: 'Categoría Recurso', title: 'Categoría Recurso', resource: 'MANT_CATREC', fileNameExport:"CategoriasRecursos", module: MODULE.SEGURIDAD},
  SISTEMA : {name: 'Sistema', title: 'Sistema', resource: 'MANT_SISTEM' , fileNameExport:"Sistemas", module: MODULE.SEGURIDAD},
  RECURSO: {name: 'Recurso', title: 'Recurso', resource: 'MANT_RECURS', fileNameExport:"Rercusos", module: MODULE.SEGURIDAD},
  MENU: { name: 'Menú', title: 'Menú', resource: 'MANT_MENU', fileNameExport:"Menu" , module: MODULE.SEGURIDAD},
  CTA_USUARIO: { name: 'Cuenta Usuario', title: 'Cuenta Usuario', resource: 'MANT_CTAUSU', fileNameExport:"CuentaUsuario", module: MODULE.SEGURIDAD},
  ASIG_PERMIS: { name: 'Asignación de permisos', title: 'Asignación de permisos', resource: 'ASIG_PERMIS', module: MODULE.SEGURIDAD },
  MENU_RECURSO: { name: 'Aisgnación de recursos', title: 'Asignación de recursos', resource: 'MANT_MEN_REC', module: MODULE.SEGURIDAD },
  /*Procesos*/
  ASIG_ESPACIOS: { name: 'Aisgnación de espacios', otherTitle: 'Asignación de espacios', btnText:'Asignar', btnIcon:'fa-bolt', title: 'Asignación de espacios', resource: 'EJEC_ASIGESPACIOS', module: MODULE.PROCESOS },
  SOLI_ESPACIOS: { name: 'Solicitud de espacios', otherTitle: 'Solicitud de espacios', btnText:'Prestar', btnIcon:'fa-bolt', title: 'Solicitud de espacios', resource: 'EJEC_SOLIESPACIOS', module: MODULE.PROCESOS }
};

export const RESOURCE_ACTIONS = {
  REGISTRO: '1',
  ACTUALIZACION: '3',
  CONSULTA: '2',
  ELIMINACION: '4',
  EXPORTACION: '5',
  CONSULTA_DETALLE: '7',
  EJECUCION: '6'
};
