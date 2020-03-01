export interface NavData {
  id?: number,
  name?: string;
  url?: string;
  icon?: string;
  badge?: any;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: object;
  divider?: boolean;
  class?: string;
  permissions?: string[],
  autorizado?: boolean
}

export const navItems: NavData[] = [
  {
    name: 'Carga de datos',
    icon: 'fa fa-upload nivel-0',
    children: [
      {
        name: 'Plan Académico',
        icon: 'fa fa-upload nivel-1',
        url: '/mantenimiento/plan-academico',
        permissions: ['MANT_PLANACADEMICO']
      },
      {
        name: 'Cursos',
        icon: 'fa fa-upload nivel-1',
        url: '/mantenimiento/cursos',
        permissions: ['MANT_CURSO']
      },
      {
        name: 'Docentes',
        icon: 'fa fa-upload nivel-1',
        url: '/mantenimiento/docente',
        permissions: ['MANT_DOCENTE']
      },
      {
        name: 'Programación Académica',
        icon: 'fa fa-upload nivel-1',
        url: '/mantenimiento/programacion-academica',
        permissions: ['MANT_PROGACEDEMICA']
      },
      {
        name: 'Horario',
        icon: 'fa fa-upload nivel-1',
        url: '/mantenimiento/horario',
        permissions: ['MANT_HORARIO']
      },
      {
        name: 'Detalle Horario',
        icon: 'fa fa-upload nivel-1',
        url: '/mantenimiento/detalle-horario',
        permissions: ['MANT_DETHORARIO']
      }
    ]
  },{
    name: 'Mantenimientos',
    icon: 'fa fa-table nivel-0',
    children: [
      {
        name: 'Solicitantes',
        icon: 'fa fa-table nivel-1',
        url: '/mantenimiento/solicitante',
        permissions: ['MANT_SOLICITANTE']
      },
      {
        name: 'Espacio Académico',
        icon: 'fa fa-table nivel-1',
        url: '/mantenimiento/espacio-academico',
        permissions: ['MANT_ESPACIO_ACADEMICO']
      },
      {
        name: 'Tabla de Tablas',
        icon: 'fa fa-table nivel-1',
        url: '/mantenimiento/multitab',
        permissions: ['MANT_MULTITABLAS']
      }
    ]
  },
  {
    name: 'Procesos',
    icon: 'fa fa-columns nivel-0',
    children: [
      {
        name: 'Asignación de espacios',
        icon: 'fa fa-columns nivel-1',
        url: '/procesos/asignacion-espacios',
        permissions: ['EJEC_ASIGESPAC']
      },
      {
        name: 'Solicitud de espacios',
        icon: 'fa fa-columns nivel-1',
        url: '/procesos/solicitud-espacios',
        permissions: ['EJEC_SOLIESPACIOS']
      },
    ]
  },
  {
    name: 'Reportes',
    icon: 'fa fa-bar-chart nivel-0',
    children: [
      {
        name: 'Estadisticas',
        url: '/reportes/estadisticas',
        icon: 'fa fa-pie-chart nivel-1',
        permissions: ['RPT_ESTADISTICAS']
      }
    ]
  },
  {
    name: 'Seguridad',
    icon: 'fa fa-shield nivel-0',
    children: [
      {
        name: 'Usuarios',
        url: '/seguridad/usuarios',
        icon: 'fa fa-user nivel-1',
        permissions: ['MANT_USUARIO']
      },
      {
        name: 'Recursos',
        url: '/seguridad/recursos',
        icon: 'fa fa-cogs nivel-1',
        permissions: ['MANT_REC']
      },
      {
        name: 'Perfiles',
        url: '/seguridad/perfiles',
        icon: 'fa fa-university nivel-1',
        permissions: ['MANT_SISTEM']
      }
    ]
  }
];
