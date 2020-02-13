import { GridOptions, GridApi, IServerSideGetRowsParams } from 'ag-grid-community';
import { objectIsEmpty } from '../utils/object.util';
import { upperFirstWord } from '../utils/strings.util';
import { getFormattedDateFromYYYYMMDDtoDDMMYYYY } from '../utils/dates.util';

export const FIRST_PAGE = 1;
export const PAGE_SIZE_CONSULTAS = 50;

export const NEXT_PAGE = "NEXT_PAGE";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const PAGE = "PAGE";

export interface Page{
  pageNum : number,
  pageSize: number,
}

export interface ManagePagination{
  pageSize: number, // cantidad de lineas por pagina
  totalRows: number, // cantidad de filas de todo el bloque
  actualPage : number, //"pageNum" - pagina actual
  isFirstPage : boolean, // ¿Es la primera pagina?
  isLastPage : boolean, // ¿Es la ultima pagina?
  actualRow : number, // linea dentro de la pagina
  totalPages? : number, // numero de paginas de todo el bloque
  indexFirstOfRows? : number, //Indice de la primera fila de la pagina
  indexLastOfRows? : number //Indice de la ultima fila de la pagina
  loadingData? : boolean //Debe ser true cuando se hace la consulta y false cuando finaliza
  filtredData? : boolean //Esta variable me indica si se han usado filtros en al grilla
}

export function setStatePagination(data: any, manage: ManagePagination){
  manage.pageSize = data.pageSize;
  manage.totalRows = data.total;
  manage.actualPage = data.pageNum; //pageNum
  manage.isFirstPage  = data.firstPage;
  manage.isLastPage = data.lastPage;
  manage.totalPages = data.pages;
  manage.indexFirstOfRows = data.indexFirstOfRows + 1;
  manage.indexLastOfRows = data.indexLastOfRows;
  manage.loadingData = false;
  manage.filtredData = false;
  if(manage.totalRows === 0){
    manage.indexFirstOfRows = 0;
    manage.indexLastOfRows = 0;
  }
}

export function setStatePaginationFilters(data: any, manage: ManagePagination){
  manage.pageSize = data.pageSize;
  manage.totalRows = data.total;
  manage.actualPage = data.pageNum; //pageNum
  manage.isFirstPage  = data.firstPage;
  manage.isLastPage = data.lastPage;
  manage.totalPages = data.pages;
  manage.indexFirstOfRows = data.indexFirstOfRows + 1;
  manage.indexLastOfRows = data.indexLastOfRows;
  manage.loadingData = false;
  manage.filtredData = true;
  if(manage.totalRows === 0){
    manage.indexFirstOfRows = 0;
    manage.indexLastOfRows = 0;
  }
}

export function resetDataSourceAndPaggination(gridApi : GridApi, manage: ManagePagination){
  resetDataAggridPagination(gridApi,[]);
  manage.totalRows = 0;
  manage.actualPage = 0;
  manage.isFirstPage = false;
  manage.isLastPage = false;
  manage.actualRow = 0;
  manage.totalPages = 0;
  manage.indexFirstOfRows = 0;
  manage.indexLastOfRows = 0;
}

export function setRowInPagination(numberRow : number, manage: ManagePagination){
  manage.actualRow = numberRow;
}

export function configAggridPagination(gridOptions: GridOptions, manage: ManagePagination){
  gridOptions.cacheBlockSize = manage.totalRows;
  gridOptions.paginationPageSize = manage.pageSize;
}

export function isNecessaryNextPage(manage: ManagePagination) : boolean {
  return manage.actualRow === manage.pageSize && !manage.isLastPage ? true : false;
}

export function isNecessaryPreviousPage(manage: ManagePagination) : boolean {
  return manage.actualRow === 1 && !manage.isFirstPage ? true : false;
}

export function setPageSizeToPagination(len: number, manage: ManagePagination){
  manage.pageSize = len;
}

export function resetPagination(manage: ManagePagination) : ManagePagination{
  return {
    ...manage,
    totalRows: 0,
    actualPage : 0,
    isFirstPage : false,
    isLastPage : false,
    actualRow: 0,
    totalPages: 0,
    indexFirstOfRows: 0,
    indexLastOfRows: 0
  }
}

export function resetDataAggridPagination(gridApi: GridApi, data: any[]){
  let dataSource = {
    rowCount: 0,
    getRows: (params: IServerSideGetRowsParams) => {
      params.successCallback(data, 0);
    }
  }
  gridApi.setServerSideDatasource(dataSource);
}


//Nuevo - filtro
export function processingFiltersPagination(params: IServerSideGetRowsParams) : any{
  let objectResult: any = {}
  console.log(params)
  if(!objectIsEmpty(params.request.filterModel)){
    let clavesFiltros = Object.keys(params.request.filterModel);
    clavesFiltros.forEach(function(item){
      let filterType = params.request.filterModel[item].filterType;
      let type = params.request.filterModel[item].type;
      let valorFiltro;
      if(type === "contains"){
        switch(filterType){
          case 'date':
          valorFiltro = getFormattedDateFromYYYYMMDDtoDDMMYYYY(params.request.filterModel[item].dateFrom);
          break;
          case 'text':
          valorFiltro = params.request.filterModel[item].filter;
          break;
        }
      }
      if(type==="equals"){
        switch(filterType){
          case 'text':
            if(params.request.filterModel[item].filter == 'true' || params.request.filterModel[item].filter == 1){
              valorFiltro = 1;
            } else if(params.request.filterModel[item].filter == 'false' || params.request.filterModel[item].filter == 0){
              valorFiltro = 0;
            } else {
              valorFiltro = params.request.filterModel[item].filter;
            }
            break;
          case 'date':
            valorFiltro = getFormattedDateFromYYYYMMDDtoDDMMYYYY(params.request.filterModel[item].dateFrom);
            break;
        }
      }
      objectResult['filtro'+upperFirstWord(item)] = valorFiltro;
    });
  }
  return objectResult;
}


//Nuevo - filtro
export function processingOrdersPagination(params: IServerSideGetRowsParams) : any{
  let objectResult: any = {}
  if(params.request.sortModel.length!==0){
    let clavesFiltros = Object.keys(params.request.sortModel);
    clavesFiltros.forEach(function(item){
      let sortType = params.request.sortModel[item].sort;
      let column = params.request.sortModel[item].colId;
      objectResult['orden'+upperFirstWord(column)] = sortType;
    });
  }
  return objectResult;
}


//Genera un objeto para los criterios de busqueda
export function processingRangePagination(params: IServerSideGetRowsParams) : any{
  let objectResult: any = {}
  if(!objectIsEmpty(params.request.filterModel)){
    let clavesFiltros = Object.keys(params.request.filterModel);
    clavesFiltros.forEach(function(item){
      let type = params.request.filterModel[item].type;
      if(type === "inRange"){
        if(!isNaN(params.request.filterModel[item].filter) && !isNaN(params.request.filterModel[item].filterTo)){
          objectResult['rango'+upperFirstWord(item)+"Min"] = params.request.filterModel[item].filter;
          objectResult['rango'+upperFirstWord(item)+"Max"] = params.request.filterModel[item].filterTo;
        }
      }
    });
  }
  return objectResult;
}
