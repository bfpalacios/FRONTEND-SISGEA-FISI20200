import { GridOptions, ColumnApi, Column, ProcessCellForExportParams, ProcessHeaderForExportParams, CsvExportParams, GetContextMenuItemsParams } from 'ag-grid-community';
import { getDateSystemToFile } from './dates.util';

export const localeTextGrid = {
  // for filter panel
  page: 'Página',
  more: '...',
  to: '-',
  of: 'de',
  next: 'Siguiente',
  last: 'Último',
  first: 'Primero',
  previous: 'Anterior',
  loadingOoo: 'Cargando...',

  // for set filter
  selectAll: 'Seleccionar todo',
  searchOoo: 'Buscando...',
  blanks: 'daBlanc',

  // for number filter and text filter
  filterOoo: 'Filtrando...',
  applyFilter: 'Aplicando filtro...',
  equals: 'Igual a',
  notEqual: 'No es igual a',

  // for number filter
  lessThan: 'Menor que',
  greaterThan: 'Mayor que',
  lessThanOrEqual: 'Menor o igual que',
  greaterThanOrEqual: 'Mayor o igual que',
  inRange: 'Está entre',

  // for text filter
  contains: 'Contiene',
  notContains: 'No contiene',
  startsWith: 'Empieza con',
  endsWith: 'Termina con',

  // the header of the default group column
  //group: 'Grupo',

  // tool panel
  columns: 'Columnas',
  filters: 'Filtros',
  rowGroupColumns: 'Pivote',
  rowGroupColumnsEmptyMessage: 'Arrastre para agrupar',
  valueColumns: 'Modo Columnas',
  pivotMode: 'Modo Pivote',
  groups: 'Grupos',
  values: 'Valores',
  pivots: 'Pivotes',
  valueColumnsEmptyMessage: 'Arrastre para agregar',
  pivotColumnsEmptyMessage: 'Arrastre para pivotear',
  toolPanelButton: 'Menú',

  // other
  noRowsToShow: 'No hay registros para mostrar.',

  // enterprise menu
  pinColumn: 'Fijar columna',
  valueAggregation: 'Agregar valor',
  autosizeThiscolumn: 'Ajustar esta columna',
  autosizeAllColumns: 'Ajustar todas las columnas',
  groupBy: 'Agrupar por',
  ungroupBy: 'Desagrupar por',
  resetColumns: 'Reniciar columnas',
  collapseAll: 'Contraer todo',
  expandAll: 'Expandir todo',
  eAll: 'Contraer todo',
  toolPanel: 'Panel de herramientas',
  export: 'Exportar',
  csvExport: 'CSV',
  excelExport: 'Excel',

  // enterprise menu pinning
  pinLeft: '<< Fijar columna',
  pinRight: 'Fijar columna >>',
  noPin: 'No fijar',

  // enterprise menu aggregation and status bar
  sum: 'Suma',
  min: 'Mínimo',
  max: 'Máximo',
  none: 'Ninguno',
  count: 'Conteo',
  average: 'Promedio',
  avg: 'Promedio',

  // enterprise menu aggregation and status bar
  filteredRows: 'Filas filtradas',
  selectedRows: 'Filas seleccionadas',
  totalRows: 'Total de filas',
  totalAndFilteredRows: 'Filas filtradas',

  // standard menu
  copy: 'Copiar',
  copyWithHeaders: 'Copiar con cabecera',
  ctrlC: 'Ctrl C',
  paste: 'Pegar',
  ctrlV: 'Ctrl V',

  //Graficos
  // enterprise menu (charts)
  pivotChartAndPivotMode: 'Gráfico y Modo Pivote',
  pivotChart: 'Gráfica Pivote',
  chartRange: 'Gráficar...',
  columnChart: 'Gráfica de barras',
  groupedColumn: 'Barra agrupada',
  stackedColumn: 'Barra apilada ',
  normalizedColumn: '100% apilada',
  barChart: 'Gráfico de barras',
  groupedBar: 'Barras agrupadas',
  stackedBar: 'Barras apiladas',
  normalizedBar: '100% apliada',
  pieChart: 'Gráfico pastel',
  pie: 'Pastel',
  doughnut: 'Gráfico de dona',
  line: 'Gráfica Lineal',
  xyChart: 'Gráfica XY',
  scatter: 'Grafica de dispersión',
  bubble: 'Gráfica burbuja',
  areaChart: 'Gráfico de área',
  area: 'Área',
  stackedArea: 'Área apliada',
  normalizedArea: '100% apilada',

};

export function getOverlayNoRowsTemplate(message: string = 'No hay registros para mostrar.') {
  return `<span style="padding: 10px; border: 1px solid #444; background: white;">${message}</span>`;
}

export function getOverlayLadingTemplate(message: string = 'Cargando...') {
  return `<span style="padding: 10px; border: 1px solid #444; background: white;">${message}</span>`;
}

export function getCheckOrCancelLabel(indicador: number) {
let text = '';
  switch(indicador){
    case 1:
      text=`<i class="fa fa-check" aria-hidden="true" style="color: #23853A;"></i>`;
      break;
    case 0:
      text=`<i class="fa fa-times" aria-hidden="true"  style="color: #D30E0D;"></i>`;
      break;
  }
  return text;
}

export function getFlaggCountryByIso3166(countryCode: string, texto: string): string {
  countryCode = countryCode.toLowerCase();
  return `<span class="flag-icon flag-icon-${countryCode} flag-icon-squared" style="height: 12px; width: 20px;"></span>  ${texto}`;
}

export function autoSizeColumns(gridColumnApi: ColumnApi) {
  if (gridColumnApi) {
    let allColumnIds = [];
    gridColumnApi.getAllColumns().forEach((column: Column) => {
      allColumnIds.push(column.getColId());
    });
    gridColumnApi.autoSizeColumns(allColumnIds);
  }
}

export function getAllRows(gridApi: any) : any{
  let rowData = [];
  gridApi.forEachNode(node => rowData.push(node.data));
  return rowData;
}

export const PATH_AGGRID_IMG_EXCEL = '<img src="assets/img/aggrid/excelExport.png"/>';
export const PATH_AGGRID_IMG_CSV = '<img src="assets/img/aggrid/csvExport.png"/>';

const ALL_BORDERS_EXCEL = {
  borderBottom: {
    color: "#000000",
    lineStyle: "Continuous",
    weight: 1
  },
  borderLeft: {
    color: "#000000",
    lineStyle: "Continuous",
    weight: 1
  },
  borderRight: {
    color: "#000000",
    lineStyle: "Continuous",
    weight: 1
  },
  borderTop: {
    color: "#000000",
    lineStyle: "Continuous",
    weight: 1
  }
};

export const CELL_ACCION = {
  borderLeft: {
    color: "#000000",
    lineStyle: "Continuous",
    weight: 1,
    interior: {
      color: "#FFFFFF", pattern: "Solid"
    },
  },
}

export const EXCEL_STYLES_COMMONS_MANTENIMIENTOS = [
  {
    id: "header",
    interior: {
      color: "#215967",
      pattern: "Solid"
    },
    alignment: {
      horizontal: "Center",
      fontName: ""
    },
    font: { color: "#FFFFFF", size: 11 },
    borders: ALL_BORDERS_EXCEL
  },
  {
    id: "ob-type-boolean",
    dataType: "boolean",
    alignment: {
      horizontal: "Center"
    },
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-string",
    dataType: "string",
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-string-center",
    dataType: "string",
    alignment: {
      horizontal: "Center"
    },
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-string-red",
    dataType: "string",
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-string-blue",
    dataType: "string",
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-fecha",
    dataType: "string",
    alignment: {
      horizontal: "Center"
    },
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-date",
    alignment: {
      horizontal: "Center"
    },
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
    dataType: "string",
    //dataType: "dateTime",
    //numberFormat: { format: "dd/mm/yyyy;@" }
  },
  {
    id: "ob-type-datetime",
    alignment: {
      horizontal: "Center"
    },
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
    dataType: "string",
    //dataType: "dateTime",
    //numberFormat: { format: "dd/mm/yyyy hh:mm:ss" }
  },
  {
    id: "ob-type-number",
    dataType: "number",
    alignment: {
      horizontal: "Right"
    },
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
    numberFormat: { format: "#,##0" }
  },
  {
    id: "ob-type-number-negative",
    dataType: "number",
    alignment: {
      horizontal: "Right"
    },
    font: { size: 11, color: '#AA000A' },
    borders:  ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-money",
    dataType: "number",
    alignment: {
      horizontal: "Right"
    },
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  }

];

export const EXCEL_STYLES_COMMONS_CONSULTAS = [
  {
    id: "header",
    interior: {
      color: "#215967",
      pattern: "Solid"
    },
    alignment: {
      horizontal: "Center",
      fontName: ""
    },
    font: { color: "#FFFFFF", size: 11 },
    borders: ALL_BORDERS_EXCEL
  },
  {
    id: "ob-type-string",
    dataType: "string",
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-string-center",
    dataType: "string",
    alignment: {
      horizontal: "Center"
    },
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-string-red",
    dataType: "string",
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-string-blue",
    dataType: "string",
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-fecha",
    dataType: "string",
    alignment: {
      horizontal: "Center"
    },
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-number",
    dataType: "number",
    alignment: {
      horizontal: "Right"
    },
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-number-negative",
    dataType: "number",
    alignment: {
      horizontal: "Right"
    },
    font: { size: 11, color: '#AA000A' },
    borders:  ALL_BORDERS_EXCEL,
  },
  {
    id: "ob-type-money",
    dataType: "number",
    alignment: {
      horizontal: "Right"
    },
    font: { size: 11 },
    borders: ALL_BORDERS_EXCEL,
  },
];


/**
 * Actualiza la grilla
 * @param gridOptions
 * @param data data to update
 * @param gridColumnApi
 * @param autosizeColumns true by default
 * @param fitColumns false by default
 */
export function updateGrid(gridOptions: GridOptions, data: any[], gridColumnApi?: ColumnApi,
  autosizeColumns: boolean = true, fitColumns: boolean = false) {
  if (gridOptions.api) {
    gridOptions.api.setRowData(data);
    if (autosizeColumns && gridColumnApi) {
      autoSizeColumns(gridColumnApi);
    }
    if (fitColumns) {
      gridOptions.api.sizeColumnsToFit();
    }
  }
}

/*
 * Configuracion para grillas de mantenimiento
*/
export const commonConfigTablaMantenimiento: GridOptions = {
  localeText: localeTextGrid,
  defaultColDef: {
    enableValue: true,
    sortable: true,
    filter: true,
    resizable: true,
    //suppressMenu: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    }
  },
  multiSortKey: 'ctrl',
  //  colResizeDefault: 'shift',
  suppressMultiRangeSelection: true,
  paginationPageSize: 10,
  deltaRowDataMode: true,
  floatingFilter: true,
  rowMultiSelectWithClick: true,
  pagination: true,
  suppressNoRowsOverlay: false,
  overlayNoRowsTemplate: getOverlayNoRowsTemplate(),
  suppressLoadingOverlay: false,
  overlayLoadingTemplate: getOverlayLadingTemplate(),
  rowHeight: 32,
  animateRows: true,
  sideBar: {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
        }
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      }
    ]
  },
  rowSelection: 'multiple',
  excelStyles: EXCEL_STYLES_COMMONS_MANTENIMIENTOS,
};

/*
 * Configuracion unicamente para grilla de master detail
*/
export const commonConfigTablaMasterDetail: GridOptions = {
  localeText: localeTextGrid,
  defaultColDef: {
    enableValue: true,
    sortable: true,
    filter: true,
    resizable: true,
  },
  paginationPageSize: 10,
  deltaRowDataMode: true,
  rowMultiSelectWithClick: true,
  floatingFilter: true,
  pagination: true,
  suppressNoRowsOverlay: false,
  overlayNoRowsTemplate: getOverlayNoRowsTemplate(),
  suppressLoadingOverlay: false,
  overlayLoadingTemplate: getOverlayLadingTemplate(),
  rowHeight: 32,
  suppressMultiRangeSelection: true,
  animateRows: true,
  rowSelection: 'multiple',
  excelStyles: EXCEL_STYLES_COMMONS_MANTENIMIENTOS,
};

/*
 * Configuracion unicamente para grilla de reportes avanzados (reporteador)
*/
export const commonConfigTablaReportesAvanzados: GridOptions = {
  localeText: localeTextGrid,
  defaultColDef: {
    enableValue: true,
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    }
  },
  statusBar:{
    statusPanels: [
        {
          statusPanel: "agTotalAndFilteredRowCountComponent",
          align: "left"
        },
        {
          statusPanel: "agTotalRowCountComponent",
          align: "center"
        },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" }
      ]
  },
  multiSortKey: 'ctrl',
  suppressMultiRangeSelection: true,
  paginationPageSize: 50,
  deltaRowDataMode: true,
  floatingFilter: true,
  pagination: true,
  rowMultiSelectWithClick: true,
  groupIncludeFooter: true,
  suppressNoRowsOverlay: false,
  overlayNoRowsTemplate: getOverlayNoRowsTemplate(),
  suppressLoadingOverlay: false,
  overlayLoadingTemplate: getOverlayLadingTemplate(),
  rowHeight: 32,
  animateRows: true,
  sideBar: true,
  rowSelection: 'multiple',
  enableCharts: true,
  enableRangeSelection: true,
  excelStyles: EXCEL_STYLES_COMMONS_MANTENIMIENTOS,
};

/*
 * Configuracion para grillas que usan la paginacion por el servidor
*/
export const commontConfigTablaServerSideScroll: GridOptions = {
  localeText: localeTextGrid,
  defaultColDef: {
    enableValue: true,
    sortable: true,
    filter: false,
    resizable: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    }
  },
  floatingFilter: true,
  rowModelType: 'serverSide',
  paginationPageSize: 10,
  cacheOverflowSize: 2,
  maxConcurrentDatasourceRequests: 2,
  infiniteInitialRowCount: 2,
  maxBlocksInCache: 2,
  pagination: true,
  rowHeight: 32,
  animateRows: true,
  sideBar: {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
        }
      },
    ]
  },
  rowSelection: 'multiple',
  excelStyles: EXCEL_STYLES_COMMONS_CONSULTAS,
};

/*
 * Configuracion para grillas que su scroll es infinito, nunca terminan de bajar, esta configuracion aun no esta acorde a su definicion
*/
export const commontConfigTablaInfiniteScroll: GridOptions = {
  localeText: localeTextGrid,
  defaultColDef: {
    enableValue: true,
    sortable: false,
    filter: false,
    resizable: true,
    suppressMenu: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    }
  },
  rowModelType: 'infinite',
  paginationPageSize: 10,
  cacheOverflowSize: 2,
  rowMultiSelectWithClick: true,
  maxConcurrentDatasourceRequests: 2,
  infiniteInitialRowCount: 2,
  maxBlocksInCache: 2,
  suppressNoRowsOverlay: false,
  overlayNoRowsTemplate: getOverlayNoRowsTemplate(),
  suppressLoadingOverlay: false,
  overlayLoadingTemplate: getOverlayLadingTemplate(),
  pagination: true,
  rowHeight: 32,
  animateRows: true,
  sideBar: {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
        }
      }
    ]
  },
  getContextMenuItems: () => {
    return [
      "copy",
      "copyWithHeaders",
      "paste",
    ]
  }
};

export function getContextMenuItemsConsultas(getContextMenuItemsParams: GetContextMenuItemsParams, type: any, permisoExportacion: boolean, nameExport?: string) {
  var result: any[] = [
    "copy",
    "copyWithHeaders",
    "paste",
  ];
  if(permisoExportacion){
    result = [
      ...result,
      "separator",
      "separator", //genera una linea divisoria
      {
        name: "Exportar Excel (.xlsx)",
        icon: PATH_AGGRID_IMG_EXCEL,
        subMenu: [
          {
            name: "Exportar página",
            action: function () {
              var paramsExportExcel = {
                sheetName: type !== undefined ? type.fileNameExport : nameExport,
                fileName: type !== undefined ? type.fileNameExport : nameExport + "_" + getDateSystemToFile(),
                data: "String",
                processCellCallback: (processCellForExportParams: ProcessCellForExportParams) => {
                  return processCellCallbackForExport(processCellForExportParams);
                },
                processHeaderCallback: (params: ProcessHeaderForExportParams) => {
                  if(params.column.getColDef().headerName === "Acción"){
                    console.log(params);
                    return null;
                  }
                  return params.column.getColDef().headerName;
                },
              }
              getContextMenuItemsParams.api.exportDataAsExcel(paramsExportExcel);
            },
          },
          {
            name: "Exportar seleccionado",
            action: function () {
              var paramsExportExcel = {
                sheetName: type !== undefined ? type.fileNameExport : nameExport,
                fileName: type !== undefined ? type.fileNameExport : nameExport + "_" + getDateSystemToFile(),
                onlySelected: true,
                processCellCallback: (processCellForExportParams: ProcessCellForExportParams) => {
                  return processCellCallbackForExport(processCellForExportParams);
                }
              }
              getContextMenuItemsParams.api.exportDataAsExcel(paramsExportExcel);
            },
          },
          {
            name: "Exportar todo",
            disabled: true,
            action: function () {
            },
          }
        ]
      },
      {
        name: "Exportar CSV (.csv)",
        icon: PATH_AGGRID_IMG_CSV,
        action: function () {
          var paramsExportCsv = {
            sheetName: type !== undefined ? type.fileNameExport : nameExport,
            fileName: type !== undefined ? type.fileNameExport : nameExport + "_" + getDateSystemToFile(),
            columnSeparator: ',',
            processCellCallback: (processCellForExportParams: ProcessCellForExportParams) => {
              return processCellCallbackForExport(processCellForExportParams);
            }
          }
          getContextMenuItemsParams.api.exportDataAsCsv(paramsExportCsv);
        },
      }
    ]
  }
  return result;
}


export function getContextMenuItemsMantenimiento(getContextMenuItemsParams: GetContextMenuItemsParams, type: any, permisoExportacion: boolean, nameExport?: string) {
  var result: any[] = [
    "copy",
    "copyWithHeaders",
    "paste",
  ];
  if(permisoExportacion){
    result = [
      ...result,
      "separator",
      {
        name: "Exportar Excel (.xlsx)",
        icon: PATH_AGGRID_IMG_EXCEL,
        subMenu: [
          {
            name: "Exportar seleccionado",
            action: function () {
              var paramsExportExcel = {
                sheetName: type !== undefined ? type.fileNameExport : nameExport,
                fileName: type !== undefined ? type.fileNameExport : nameExport + "_" + getDateSystemToFile(),
                onlySelected: true,
                processCellCallback: (processCellForExportParams: ProcessCellForExportParams) => {
                  return processCellCallbackForExport(processCellForExportParams);
                }
              }
              getContextMenuItemsParams.api.exportDataAsExcel(paramsExportExcel);
            },
          },
          {
            name: "Exportar todo",
            action: function () {
              var paramsExportExcel = {
                sheetName: type !== undefined ? type.fileNameExport : nameExport,
                fileName: type !== undefined ? type.fileNameExport : nameExport + "_" + getDateSystemToFile(),
                data: "String",
                processCellCallback: (processCellForExportParams: ProcessCellForExportParams) => {
                  return processCellCallbackForExport(processCellForExportParams);
                },
                processHeaderCallback: (params: ProcessHeaderForExportParams) => {
                  if(params.column.getColDef().headerName === "Acción"){
                    return null;
                  }
                  return params.column.getColDef().headerName;
                },
              }
              getContextMenuItemsParams.api.exportDataAsExcel(paramsExportExcel);
            },
          },
        ]
      },
      {
        name: "Exportar CSV (.csv)",
        icon: PATH_AGGRID_IMG_CSV,
        action: function () {
          var paramsExportCsv = {
            sheetName: type !== undefined ? type.fileNameExport : nameExport,
            fileName: type !== undefined ? type.fileNameExport : nameExport + "_" + getDateSystemToFile(),
            columnSeparator: ',',
            processCellCallback: (processCellForExportParams: ProcessCellForExportParams) => {
              return processCellCallbackForExport(processCellForExportParams);
            }
          }
          getContextMenuItemsParams.api.exportDataAsCsv(paramsExportCsv);
        },
      }
    ]
  }
  return result;
}

export function getContextMenuItemsReportesAvanzados(getContextMenuItemsParams: GetContextMenuItemsParams, type: any, permisoExportacion: boolean, nameExport?: string) {
  var result: any[] = [
    "copy",
    "copyWithHeaders",
    "paste",
    "separator",
    "chartRange",
  ];
  if(permisoExportacion){
    result = [
      ...result,
      "separator",
      {
        name: "Exportar Excel (.xlsx)",
        icon: PATH_AGGRID_IMG_EXCEL,
        subMenu: [
          {
            name: "Exportar seleccionado",
            action: function () {
              var paramsExportExcel = {
                sheetName: type !== undefined ? type.fileNameExport : nameExport,
                fileName: type !== undefined ? type.fileNameExport : nameExport + "_" + getDateSystemToFile(),
                onlySelected: true,
                processCellCallback: (processCellForExportParams: ProcessCellForExportParams) => {
                  return processCellCallbackForExport(processCellForExportParams);
                }
              }
              getContextMenuItemsParams.api.exportDataAsExcel(paramsExportExcel);
            },
          },
          {
            name: "Exportar todo",
            action: function () {
              var paramsExportExcel = {
                sheetName: type !== undefined ? type.fileNameExport : nameExport,
                fileName: type !== undefined ? type.fileNameExport : nameExport + "_" + getDateSystemToFile(),
                data: "String",
                processCellCallback: (processCellForExportParams: ProcessCellForExportParams) => {
                  return processCellCallbackForExport(processCellForExportParams);
                },
                processHeaderCallback: (params: ProcessHeaderForExportParams) => {
                  if(params.column.getColDef().headerName === "Acción"){
                    return null;
                  }
                  return params.column.getColDef().headerName;
                },
              }
              getContextMenuItemsParams.api.exportDataAsExcel(paramsExportExcel);
            },
          },
        ]
      },
      {
        name: "Exportar CSV (.csv)",
        icon: PATH_AGGRID_IMG_CSV,
        action: function () {
          var paramsExportCsv = {
            sheetName: type !== undefined ? type.fileNameExport : nameExport,
            fileName: type !== undefined ? type.fileNameExport : nameExport + "_" + getDateSystemToFile(),
            columnSeparator: ',',
            processCellCallback: (processCellForExportParams: ProcessCellForExportParams) => {
              return processCellCallbackForExport(processCellForExportParams);
            }
          }
          getContextMenuItemsParams.api.exportDataAsCsv(paramsExportCsv);
        },
      }
    ]
  }
  return result;
}

export function renderYesNoLabel(value: boolean | number | string, yesText: string = 'SI', noText: string = 'NO') {
  let yesLabel = `<label class="text-center px-1 custom-sicf-success margenes-circulares-etiquetas" style="width: 30px !important;">${yesText}</label>`;
  let noLabel = `<label class="text-center px-1 custom-sicf-danger margenes-circulares-etiquetas" style="width: 30px !important;">${noText}</label>`;
  let undefinedLabel = `-`;
  if (value === null || value === undefined) {
    return undefinedLabel;
  }
  if (value === true || value === 1 || value === '1' || value === 'SI') {
    return yesLabel;
  }
  if (value === false || value === 0 || value === '0' || value === 'NO') {
    return noLabel;
  }
}

export function setHiddenDefaultPaginationAggrid(div: HTMLCollection) {
  if (div.length !== 0) {
    div.item(0).remove();
  }
}

function processCellCallbackForExport(processCellForExportParams: ProcessCellForExportParams): any{
  let dataTypes = typeof processCellForExportParams.value;
  switch (dataTypes) {
    case 'boolean':
      if (processCellForExportParams.value === true) {
        return "SI";
      }
      if (processCellForExportParams.value === false) {
        return "NO";
      }
    default:
      return processCellForExportParams.value;
  }
}
