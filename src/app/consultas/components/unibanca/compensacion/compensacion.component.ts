import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-compensacion',
  templateUrl: './compensacion.component.html',
  styleUrls: ['./compensacion.component.scss']
})

export class CompensacionComponent implements OnInit{
  constructor(
  ) {
  }

  ngOnInit() {
  }
}

/*import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { TemplateConsultaComponent, ButtonsCellRendererComponent, ConsultaModalComponent } from '../../../../shared';
import { ManagePagination, commontConfigTablaServerSideScroll, processingRangePagination, processingFiltersPagination, getDaysInRange, processingOrdersPagination, setStatePaginationFilters, setHiddenDefaultPaginationAggrid, PAGE, resetPagination, configAggridPagination, setStatePagination, isNecessaryNextPage, formatMoney, isNecessaryPreviousPage, setRowInPagination, Type, NEXT_PAGE, PREVIOUS_PAGE, TYPES, RESOURCE_ACTIONS, autoSizeColumns, getFormattedDate, commontConfigTablaInfiniteScroll, commonConfigTablaMantenimiento, getContextMenuItemsConsultas, joinWords, getDateRange, DEFAULT_SEPARATOR, BUSQUEDA_SIN_RESULTADOS, CUSTOM_MESSAGE_MAX_RANGE_EXCEDED, CUSTOM_MESSAGE_RESULT_NOT_FOUND, PARAMETROS_REPORTES, BUSQUEDA_INVALIDA, PAGE_SIZE_CONSULTAS, FIRST_PAGE, renderYesNoLabel, updateGrid, configFormMd, getFormattedDateRangePicker } from '../../../../shared/utils';
import { CriterioCompensacionForm, CriterioCompensacionRequest } from '../../../models/criterios';
import { ComisCompensacion, DetalleCompensacion } from '../../../models';
import { Membresia, Servicio, ClaseTransaccion, CodigoTransaccion, Institucion, Bin } from '../../../../mantenimiento/models';
import { TabPane } from '../../../../shared/utils/tab-pane';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/store/app.reducers';
import { CompensacionFacade } from '../../../facade';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridOptions, ColDef, GridApi, IServerSideGetRowsParams, IGetRowsParams, RowNode } from 'ag-grid-community';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ParametroRep } from '../../../../reportes/config-generales/models';


@Component({
  selector: 'app-compensacion',
  templateUrl: './compensacion.component.html',
  styleUrls: ['./compensacion.component.scss']
})
export class CompensacionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateCompensacion') template: TemplateConsultaComponent;
  @ViewChild('mdCompensacion') mdDetalleCompensacion: ConsultaModalComponent;
  @ViewChild('mdComisCompensacion') mdComisionCompensacion: ConsultaModalComponent;
  @ViewChild('servicioSelect') servicioSelect: NgSelectComponent;
  @ViewChild('codigoTransaccionSelect') codigoTransaccionSelect: NgSelectComponent;
  @ViewChild('binSelect') binSelect: NgSelectComponent;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  managePagination: ManagePagination = {
    pageSize: 0,
    totalRows: 0,
    actualPage: 0,
    isFirstPage: false,
    isLastPage: false,
    actualRow: 0,
    totalPages: 0,
    indexFirstOfRows: 0,
    indexLastOfRows: 0,
    loadingData: false
  };

  form: FormGroup;
  gridOptions: GridOptions;
  gridApi: GridApi;
  gridOptions2: GridOptions;
  gridApi2: GridApi;
  private gridColumnApi;
  private gridColumnApi2;
  rowNodeSelected: RowNode;
  gridReady: boolean = false;
  rowNodeSelected2: RowNode;
  gridReady2: boolean = false;
  criteriosReq: CriterioCompensacionRequest;
  criteriosFilters: any;
  buscando: boolean = false;
  presionoBotonDetalle: string = "";
  usoBotonesDetalleSiguienteAnterior: boolean = false;
  totalRowsCount: number = 0;
  totalRowsCount2: number = 0;

  compensacion: any[] = [];
  membresias: any[] = [];
  servicios: any[] = [];
  serviciosFiltrado: Servicio[] = [];
  origenes: any[] = [];
  origenesArchivos: any = [];
  clasesTransaccion: any[] = [];
  codigosTransaccion: any[] = [];
  codigosTransaccionFiltrado: CodigoTransaccion[] = [];

  parametroRep: ParametroRep[];

  canales: any[] = [];
  instituciones: any[] = [];
  institucionesReceptoras: any[] = [];
  bines: any[] = [];
  binesFiltrado: any[] = [];
  codigosRptaSwitch: any[] = [];
  monedasCompensacion: any[] = [];


  compensacionDetalle: DetalleCompensacion;
  comisCompensacion: ComisCompensacion[];
  listaTab: TabPane[] = [
    {
      tituloTabPane: 'Transacción',
      tituloId: 'aTransaccion',
      divContenidoPane: 'divCompensacionDetalleTransaccional',
      divVisible: true
    }];

  type: Type;

  filtrando: boolean = false;
  ordenando: boolean = false;

  constructor(
    private compensacionFacade: CompensacionFacade,
    private store: Store<AppState>,
    private toasterService: ToastrService,
  ) {
    this.type = TYPES.COMPENSACION;
  }

  ngOnInit() {
    this.form = new FormGroup({
      'fechaProceso': new FormControl('', [Validators.required, Validators.maxLength(23)]),
      'fechaTransaccion': new FormControl('', [Validators.maxLength(23)]),
      'idSecuencia': new FormControl('', [Validators.maxLength(20), Validators.nullValidator]),
      'numeroTrace': new FormControl('', [Validators.maxLength(15)]),
      'membresias': new FormControl('', ),
      'servicios': new FormControl(''),
      'origenes': new FormControl(''),
      'clasesTransaccion': new FormControl(''),
      'codigosTransaccion': new FormControl(''),
      'canales': new FormControl(''),
      'monedasCompensacion': new FormControl(''),
      'valorCompensacion': new FormControl(null),
      'instituciones': new FormControl(''),
      'numeroTarjeta': new FormControl('', [Validators.minLength(16), Validators.maxLength(19)]),
      'codigosRespuesta': new FormControl(''),
      'bines': new FormControl(''),
      'institucionesReceptoras': new FormControl(''),
      'origenesArchivo' : new FormControl([]),
    });
    this.gridOptions = {
      ...commontConfigTablaServerSideScroll,
      getRowNodeId: (data) => {
        return `${data.idSecuencia}|${data.fechaProceso}`;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        autoSizeColumns(this.gridColumnApi);
        this.gridReady = true;
      },
      getContextMenuItems: (params) => {
        return getContextMenuItemsConsultas(params,this.type,this.template.permisoExportacion);
      }
    }
    this.gridOptions2 = {
      ...commontConfigTablaInfiniteScroll,

      getRowNodeId: (data) => {
        return `${data.idSecuencia}|${data.fechaProceso}`;
      },
      onGridReady: (params) => {
        this.gridApi2 = params.api;

        this.gridColumnApi2 = params.columnApi;
        autoSizeColumns(this.gridColumnApi);
        this.gridReady2 = true;
      }
    }
    this.compensacionFacade.initData();
    this.manageState();
  }

  ngAfterViewInit() {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.gridOptions2.api.setColumnDefs(this.initComisColumnDefs());
    setHiddenDefaultPaginationAggrid(document.getElementsByClassName("ag-paging-panel ag-unselectable"));
  }

  ngOnDestroy() {
    this.compensacionFacade.resetCompensacion();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState() {
    this.store.select('parametroRep').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { console.log(state.data); this.parametroRep = state.data; });
    this.store.select('membresias').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.membresias = state.data; });
    this.store.select('servicios').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.servicios = state.data; });
    this.store.select('origenes').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.origenes = state.data; });
    this.store.select('clasesTransaccion').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.clasesTransaccion = state.data; });
    this.store.select('codigosTransaccion').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.codigosTransaccion = state.data; });
    //this.store.select('rolTransaccion').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.rolesTransaccion = state.data; });
    this.store.select('canales').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.canales = state.data; });
    this.store.select('instituciones').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.instituciones = state.data; });
    this.store.select('instituciones').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.institucionesReceptoras = state.data; });
    this.store.select('codigosRptaSwitch').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.codigosRptaSwitch = state.data; });
    this.store.select('bines').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.bines = state.data; });
    this.store.select('monedas').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.monedasCompensacion = state.data; });
    this.store.select('origenesArchivos').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => { this.origenesArchivos = state.data; });
    this.store.select('compensaciones').pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => {
      if (state.pagination) {
        if (state.loading) {
          if (state.action === RESOURCE_ACTIONS.CONSULTA) {
            this.buscando = true;
          }
        }
        if (state.done) {
          if (state.action === RESOURCE_ACTIONS.CONSULTA) {
            this.buscando = false;
            let dataConsulta: any = state.data;
            if (dataConsulta.listaDatos.length == 0) {
              this.toasterService.info(CUSTOM_MESSAGE_RESULT_NOT_FOUND, BUSQUEDA_SIN_RESULTADOS);
              return;
            } else {
              setStatePagination(state.data, this.managePagination);
              configAggridPagination(this.gridOptions, this.managePagination);
              let dataSource = {
                rowCount: this.managePagination.totalRows,
                getRows: (params: IServerSideGetRowsParams) => {
                  let lastRow = -1;
                  if (this.filtrando || this.ordenando) {
                    this.criteriosFilters = {
                      ...processingFiltersPagination(params),
                      ...processingOrdersPagination(params),
                      ...processingRangePagination(params)
                    }
                    this.compensacionFacade.buscarFiltrosOrdenamiento(this.criteriosFilters, this.criteriosReq).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
                      if (data.listaDatos.length <= params.request.endRow) {
                        lastRow = data.listaDatos.length;
                      }
                      params.successCallback(data.listaDatos, lastRow);
                      setStatePaginationFilters(data, this.managePagination);
                    });
                    this.filtrando = false;
                    this.ordenando = false;
                  } else {
                    let rowsThisPage = dataConsulta.listaDatos.slice(params.request.startRow, params.request.endRow);
                    if (dataConsulta.listaDatos.length <= params.request.endRow) {
                      lastRow = dataConsulta.listaDatos.length;
                    }
                    params.successCallback(rowsThisPage, lastRow);
                  }
                }
              };
              if (this.gridReady) {
                this.gridApi.setServerSideDatasource(dataSource);
                autoSizeColumns(this.gridColumnApi);
              }
            }
            if (this.usoBotonesDetalleSiguienteAnterior) {

              this.presionoBotonDetalle === NEXT_PAGE ? this.managePagination.actualRow = 1 : '';
              this.presionoBotonDetalle === PREVIOUS_PAGE ? this.managePagination.actualRow = dataConsulta.pageSize : '';

              let idSecuencia = dataConsulta.listaDatos[this.managePagination.actualRow - 1].idSecuencia;
              this.compensacionFacade.buscarDetalle(idSecuencia);
              this.usoBotonesDetalleSiguienteAnterior = false;
            }
          }
        }
        if (state.failed) {
          if (state.action === RESOURCE_ACTIONS.CONSULTA) {
            this.buscando = false;
          }
        }

      } else {
        if (state.action === RESOURCE_ACTIONS.CONSULTA_DETALLE) {

          if (state.done) {
            this.compensacionDetalle = state.currentDetail;
            this.compensacionDetalle.valorCompensacionFormatoMoneda = formatMoney(this.compensacionDetalle.valorCompensacion,2);
            this.compensacionDetalle.valorTransaccionFormatoMoneda = formatMoney(this.compensacionDetalle.valorTransaccion,2);
            this.compensacionDetalle.comisionTHBFormatoMoneda = formatMoney(this.compensacionDetalle.comisionTarjetahabiente,2);
          }

        }
      }
    });
    this.store.select('comisCompensaciones').pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => {
      if (state.action === RESOURCE_ACTIONS.CONSULTA_DETALLE) {
        if (state.done) {
          this.comisCompensacion = state.data;
          let dataConsult2: any = state.data;
          let dataSource = {
            rowCount: null,
            getRows: (params: IGetRowsParams) => {
              this.totalRowsCount2 = dataConsult2.length;
              let rowsThisPage = dataConsult2.slice(params.startRow, params.endRow);
              let lastRow = -1;
              if (dataConsult2.length <= params.endRow) {
                lastRow = dataConsult2.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }
          };
          if (this.gridReady2) {
            this.gridApi2.setDatasource(dataSource);

          }
        }
      }
    });
  }

  onClickSearchBtn() {
    this.managePagination = resetPagination(this.managePagination);
    let criterios: CriterioCompensacionForm = this.form.getRawValue();
    let rangoFechasProceso = getDateRange(criterios.fechaProceso);
    let rangoFechasTransaccion = getDateRange(criterios.fechaTransaccion);
    let valorCompensacion;

    console.log(this.parametroRep[PARAMETROS_REPORTES.MAX_INTERVAL_CONSULTA].valor)
    if(getDaysInRange(rangoFechasProceso.fechaInicio,rangoFechasProceso.fechaFin) > this.parametroRep[PARAMETROS_REPORTES.MAX_INTERVAL_CONSULTA].valor){
      this.toasterService.info(CUSTOM_MESSAGE_MAX_RANGE_EXCEDED+this.parametroRep[PARAMETROS_REPORTES.MAX_INTERVAL_CONSULTA].valor, BUSQUEDA_INVALIDA);
      return;
    }

    if(getDaysInRange(rangoFechasTransaccion.fechaInicio,rangoFechasTransaccion.fechaFin) > this.parametroRep[PARAMETROS_REPORTES.MAX_INTERVAL_CONSULTA].valor){
      this.toasterService.info(CUSTOM_MESSAGE_MAX_RANGE_EXCEDED+this.parametroRep[PARAMETROS_REPORTES.MAX_INTERVAL_CONSULTA].valor, BUSQUEDA_INVALIDA);
      return;
    }

    criterios.valorCompensacion === null ? valorCompensacion = -1 : valorCompensacion = criterios.valorCompensacion;
    this.criteriosReq = {
      ...criterios,
      fechaProcesoInicio: rangoFechasProceso.fechaInicio,
      fechaProcesoFin: rangoFechasProceso.fechaFin,
      fechaTransaccionInicio: rangoFechasTransaccion.fechaInicio,
      fechaTransaccionFin: rangoFechasTransaccion.fechaFin,
      pageNum: FIRST_PAGE,
      pageSize: this.managePagination.pageSize,
      valorCompensacion: valorCompensacion
    }
    this.compensacionFacade.buscarCriterios(this.criteriosReq, this.criteriosFilters);
  }

  showMdDetail(params) {
    this.rowNodeSelected = params.node;
    this.compensacionDetalle = this.rowNodeSelected.data;
    let secuencia = this.rowNodeSelected.data.idSecuencia;
    setRowInPagination(this.rowNodeSelected.rowIndex + 1, this.managePagination);
    this.compensacionFacade.buscarDetalle(secuencia);
    this.mdDetalleCompensacion.show();
  }

  showMdComisionCompensacion(params) {
    this.rowNodeSelected2 = params.node;
    this.comisCompensacion = this.rowNodeSelected2.data;
    let secuencia = this.rowNodeSelected2.data.idSecuencia;
    setRowInPagination(this.rowNodeSelected2.rowIndex + 1, this.managePagination);
    this.compensacionFacade.buscarComisiones(secuencia);
    this.mdComisionCompensacion.show();
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Fecha Proceso",
        pinned: true,
        cellClass: 'ob-type-fecha',
        field: 'fechaProceso',
        filter: 'agDateColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Emisor",
          pinned: true,
        field: 'idInstitucionEmisora',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idInstitucionEmisora, params.data.descInstitucionEmisora);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Receptor",
          pinned: true,
        field: 'idInstitucionReceptora',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idInstitucionReceptora, params.data.descInstitucionReceptora);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: 'Membresía',
        field: 'idMembresia',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idMembresia, params.data.descMembresia);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Servicio",
        field: "idServicio",
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idServicio, params.data.descServicio);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Origen",
        field: 'idOrigen',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idOrigen, params.data.descOrigen);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Transacción",
        field: 'idTransaccion',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR,params.data.idTransaccion , params.data.descCodigoTransaccion);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Canal",
        field: 'idCanal',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idCanal, params.data.descCanal);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "BIN",
        field: 'bin',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.bin, params.data.descBin);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "N° Tarjeta",
        field: 'numeroTarjeta',
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Fecha Txn",
        cellClass: 'ob-type-fecha',
        field: 'fechaTransaccion',
        filter: 'agDateColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Hora Txn",
        field: 'horaTransaccion',
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Moneda Compensación",
        field: 'idMonedaCompensacion',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idMonedaCompensacion, params.data.descMonedaCompensacion);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Monto Compensación",
        field: 'valorCompensacion',
        cellClass: 'ob-type-number',
        valueFormatter: (params) => {
          return formatMoney(params.value, 2);
        },
        floatingFilterComponentParams: { suppressFilterButton: false },
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true, //elimina la condicion AND y OR del filtro cabecera
          filterOptions: [
            {
              displayKey: "inRange",
              displayName: "Rango de monto",
              type: 'inRange',
              filterType: 'number',
              test: function(filterValue, cellValue) {
                if (cellValue == null) return false;
                return cellValue !== filterValue;
              }
            }
          ]
        }
      },
      {
        headerName: "Código Respuesta",
        field: 'codigoRespuesta',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.codigoRespuesta, params.data.descCodigoRespuesta);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Autorización",
        field: 'codigoAutorizacion',
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Referencia Intercambio",
        field: 'referenciaIntercambio',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Adquirente",
        field: 'nombreAdquirente',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "País",
        field: 'paisAdquirente',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.paisAdquirente, params.data.descPaisAdquirente);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Trace",
        field: 'numeroTrace',
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: 'Origen Archivo',
        cellClass: 'ob-type-string',
        field: 'idOrigenArchivo',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idOrigenArchivo, params.data.descOrigenArchivo);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' }
      },
      {
        headerName: 'Secuencia',
        cellClass: 'ob-type-fecha',
        field: 'idSecuencia',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' }
      },
      {
        headerName: 'Acción',
        pinned: 'right',
        cellClass: 'text-center',
        cellRendererFramework: ButtonsCellRendererComponent,
        cellRendererParams: {
          details: [{
            visible: true,
            buttonClass: 'btn-primary btn-xs',
            tooltip: 'Ver detalle',
            icon: 'fa-eye',
            action: this.showMdDetail.bind(this)
          },
          {
            visible: true,
            buttonClass: 'btn-success btn-xs',
            tooltip: 'Ver Comisiones',
            icon: 'fa fa-money',
            action: this.showMdComisionCompensacion.bind(this)
          }]
        },
        sortable: true
      }
    ];
  }

  initComisColumnDefs(): ColDef[] {
    return [
      {
        headerName: 'Fecha Proceso',
        pinned: true,
        cellClass: 'text-center',
        field: 'fechaProceso',
        suppressMenu: true,
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
      },
      {
        headerName: "Comisión",
        suppressMenu: true,
        sortable: false,
        field: "idComision",
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idComision, params.data.descripcionComision);
        },
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
      },
      {
        headerName: "Cuenta Compensación",
        suppressMenu: true,
        sortable: false,
        field: 'idCuentaCompensacion',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idCuentaCompensacion, params.data.descIdCuentaCompensacion);
        },
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
      },
      {
        headerName: "Registro Contable",
        suppressMenu: true,
        cellClass: 'text-center',
        sortable: false,
        field: 'registroContable',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.registroContable, params.data.descRegistroContable);
        },
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
      },
      {
        headerName: "Valor Comisión",
        suppressMenu: true,
        cellClass: 'text-right',
        sortable: false,
        field: 'valorComision',
        valueFormatter: (params) => {
          return formatMoney(params.value, 4);
        },
        floatingFilterComponentParams: {
            suppressFilterButton: true
        }

      },
      {
        headerName: "Nivel Tarifario",
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'nivelTarifario',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
      },
      {
        headerName: "Moneda Compensacion",
        field: 'idMonedaCompensacion',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idMonedaCompensacion, params.data.descMonedaCompensacion);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Moneda Tarifa",
        field: 'idMonedaTarifario',
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idMonedaTarifario, params.data.descMonedaTarifario);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Tipo Cambio Aplicado",
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'tipoCambioAplicado',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
        valueFormatter: (params) => {
          return formatMoney(params.value, 4);
        },
      },
      {
        headerName: "Aplica Tarifa Flat",
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'aplicaTarifaFlat',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value);
        }
      },
      {
        headerName: "Tarifa Flat",
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'tarifaFlat',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
        valueFormatter: (params) => {
          return formatMoney(params.value, 4);
        },

      },
      {
        headerName: "Aplica Tarifa Porcentual",
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'aplicaTarifaPorcentual',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value);
        },

      },
      {
        headerName: "Tarifa Porcentual (%)",
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'tarifaPorcentual',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
        valueFormatter: (params) => {
          return formatMoney(params.value, 4);
        },
      },
      {
        headerName: "Contador Txn",
        suppressMenu: true,
        cellClass: 'text-right',
        sortable: false,
        field: 'contadorTxn',
        floatingFilterComponentParams: {
            suppressFilterButton: true
        }
      },
      {
        headerName: "Aplica IGV",
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'aplicaIgv',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value);
        }
      },
      {
        headerName: "Aplicación IGV (%)",
        suppressMenu: true,
        cellClass: 'text-right',
        sortable: false,
        field: 'igvAplicacionTarifa',
        floatingFilterComponentParams: {
            suppressFilterButton: true
        }

      },
      {
        headerName: "Aplica Grupo BIN",
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'aplicaGrupoBin',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value);
        }
      },
      {
        headerName: "Grupo BIN",
        suppressMenu: true,
        cellClass: 'text-right',
        sortable: false,
        field: 'idGrupoBin',
        floatingFilterComponentParams: {
            suppressFilterButton: true
        }

      },
      {
        headerName: "Ind. Tarifa Emisor",
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'infTarifaEmisor',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value);
        }
      },
      {
        headerName: "Ind. Compensación",
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'indicadorCompensacion',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.indicadorCompensacion, params.data.descIndicadorCompensacion);
        },

      },
      {
        headerName: "Compensa Comisión",
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'compensaComisiones',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value);
        }
      }


      ,{
        headerName: 'Secuencia',
        suppressMenu: true,
        cellClass: 'text-center',
        field: 'idSecuencia',
        sortable: false,
        floatingFilterComponentParams: {
            suppressFilterButton: true
        },

      }
    ];
  }

  onChangeMembresiaSelect(items: Membresia[]) {
    let filtrado = [];
    items.forEach(m => filtrado.push(...this.servicios.filter(s => s.idMembresia === m.idMembresia)))
    this.servicioSelect.clearModel();
    this.serviciosFiltrado = [...filtrado];
  }

  onChangeClaseTransaccionSelect(items: ClaseTransaccion[]) {
    let filtrado = [];
    items.forEach(m => filtrado.push(...this.codigosTransaccion.filter(s => s.idClaseTransaccion === m.idClaseTransaccion)))
    this.codigoTransaccionSelect.clearModel();
    this.codigosTransaccionFiltrado = [...filtrado];
  }

  onChangeInstitucionSelect(items: Institucion[]) {
    let filtrado = [];
    items.forEach(m => filtrado.push(...this.bines.filter(s => s.idInstitucion === m.idInstitucion)))
    this.binSelect.clearModel();
    this.binesFiltrado = [...filtrado];
  }

  onClickAnterior() {
    if (!isNecessaryPreviousPage(this.managePagination)) {
      this.rowNodeSelected = this.gridApi.getModel().getRow(this.rowNodeSelected.rowIndex - 1);
      setRowInPagination(this.managePagination.actualRow - 1, this.managePagination);
      this.compensacionDetalle = this.rowNodeSelected.data;
      this.compensacionFacade.buscarDetalle(this.compensacionDetalle.idSecuencia);
    } else {
      this.requestPage(PREVIOUS_PAGE);
    }
  }

  onClickSiguiente() {
    if (!isNecessaryNextPage(this.managePagination)) {
      let newIndex = this.rowNodeSelected.rowIndex + 1;
      let rowNode = this.gridApi.getModel().getRow(newIndex);
      setRowInPagination(this.managePagination.actualRow + 1, this.managePagination);
      if (!rowNode.data) {
        setTimeout(() => {
          this.rowNodeSelected = this.gridApi.getModel().getRow(newIndex);
        }, 100);
      } else {
        this.rowNodeSelected = rowNode;
        this.compensacionDetalle = this.rowNodeSelected.data;
        this.compensacionFacade.buscarDetalle(this.compensacionDetalle.idSecuencia);
      }
    } else {
      this.requestPage(NEXT_PAGE);
    }

  }

  requestPage(pageMode: string, pageRequest?: number) {
    if (pageMode === NEXT_PAGE) {
      this.criteriosReq.pageNum = this.managePagination.actualPage + 1;
      this.presionoBotonDetalle = NEXT_PAGE;
      this.usoBotonesDetalleSiguienteAnterior = true;
    }
    if (pageMode === PREVIOUS_PAGE) {
      this.criteriosReq.pageNum = this.managePagination.actualPage - 1;
      this.presionoBotonDetalle = PREVIOUS_PAGE;
      this.usoBotonesDetalleSiguienteAnterior = true;
    }
    if (pageMode === PAGE) {
      this.criteriosReq.pageNum = pageRequest;
      this.presionoBotonDetalle = PAGE;
      this.usoBotonesDetalleSiguienteAnterior = false;
    }
    this.criteriosReq.pageSize = this.managePagination.pageSize;
    this.managePagination.loadingData = true; //nuevo
    this.compensacionFacade.buscarCriterios(this.criteriosReq, this.criteriosFilters);
  }

  onPageChanged(numRequestPage: number) {
    this.requestPage(PAGE, numRequestPage);
  }

  onPageLenghtChanged() {
    this.requestPage(PAGE, 1);
  }

  onFilter() {
    this.filtrando = true;
  }

  onSorter() {
    this.ordenando = true;
  }


}*/
