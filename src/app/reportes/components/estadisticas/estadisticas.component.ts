import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { TemplateReporteComponent, ConfirmModalComponent, FormModalComponent, MdConfirmOpts, MdFormOpts, ButtonsCellRendererComponent, ObSwitchFilterGridComponent } from '../../../shared';
import { TYPES, Type, RESOURCE_ACTIONS, DEFAULT_SEPARATOR, MULTITAB_IDS, commonConfigTablaReportesAvanzados, getContextMenuItemsReportesAvanzados, getFormattedDate, getContextMenuItemsMantenimiento, joinWords, commonConfigTablaMantenimiento, updateGrid, configFormMd, manageCrudState, enableControls, commontConfigTablaServerSideScroll, autoSizeColumns, getContextMenuItemsConsultas, CUSTOM_MESSAGE_RESULT_NOT_FOUND, BUSQUEDA_SIN_RESULTADOS, getDateRange, getDaysInRange, CUSTOM_MESSAGE_MAX_RANGE_EXCEDED, BUSQUEDA_INVALIDA, getDateFromString, setValueControls, renderYesNoLabel, formatMoney } from '../../../shared/utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { EstadisticasFacade } from '../../facade';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgSelectComponent } from '@ng-select/ng-select';
import { MultitabDetFacade } from '../../../mantenimiento/facade';
import "ag-grid-enterprise/chartsModule";

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit, AfterViewInit, OnDestroy  {

  @ViewChild('template') template: TemplateReporteComponent;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  type: Type;
  form: FormGroup;
  gridOptions: GridOptions;
  gridApi: GridApi;
  private gridColumnApi;
  templateHtmlMsg: string;
  fechaProceso: string;
  gridReady: boolean = false;

  pabellones: any[] = [];
  tiposEspacios: any[] = [];
  espacios: any[] = [];
  tipoSolicitud: any[] = [];
  solicitantes: any[] = [];

  buscando: boolean = false;
  criteriosFilters: any;
  vssVisa: any;
  fechaProcesoForm: Date;

  constructor(
    private toastr: ToastrService,
    private store: Store<AppState>,
    private estadisticasFacade: EstadisticasFacade,
    private multitabDetFacade: MultitabDetFacade,
  ) {
    this.type = TYPES.ESTADISTICAS;
  }

  ngOnInit() {
    this.form = new FormGroup({
      'fechaRegistro': new FormControl(''),
      'fechaReserva': new FormControl(''),
      'pabellones': new FormControl([]),
      'tipoEspacios': new FormControl([]),
      'espacios': new FormControl([]),
      'tiposSolicitudes': new FormControl([]),
      'solicitantes': new FormControl([]),
    });
    this.gridOptions = {
      ...commonConfigTablaReportesAvanzados,
      paginationPageSize: 50,
      getRowNodeId: (data) => {
        return data.idSolicitud;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        autoSizeColumns(this.gridColumnApi);
        this.gridReady = true;
      },
      groupMultiAutoColumn: true,
      getContextMenuItems: (params) => {
        return getContextMenuItemsReportesAvanzados(params, undefined, true, 'Reporte');
      },
      //groupIncludeFooter: true,

    };
    this.estadisticasFacade.initCombos();
    this.manageState();
  }

  ngAfterViewInit() {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    updateGrid(this.gridOptions, [], this.gridColumnApi, true, true);
    autoSizeColumns(this.gridColumnApi);
  }

  ngOnDestroy() {
    this.estadisticasFacade.reset();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onChangeInstitucionSelect(items: any[]) {
    let filtrado = [];
    //items.forEach(m => filtrado.push(...this.bines.filter(s => s.idInstitucion === m.idInstitucion)));
    //this.binSelect.clearModel();
    //this.binesFiltrado = [...filtrado];
  }

  manageState() {
    this.store.select('espaciosAcademico').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      this.espacios = state.data;
    });
    this.store.select('solicitantes').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      this.solicitantes = state.data;
    });
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.tipoEspacio).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.tiposEspacios = data;
    });
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.tipoSolicitud).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.tipoSolicitud = data;
    });
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.pabellon).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.pabellones = data;
    });
  }
  
  
  onClickSearchBtn(){
    this.buscando = true;
    let criterios: any = this.form.getRawValue();
    let rangoFechaReserva = getDateRange(criterios.fechaReserva);
    criterios.fechaReservaInicio = rangoFechaReserva.fechaInicio;
    criterios.fechaReservaFin = rangoFechaReserva.fechaFin;
    let rangoFechaRegistro = getDateRange(criterios.fechaRegistro);
    criterios.fechaRegistroInicio = rangoFechaRegistro.fechaInicio;
    criterios.fechaRegistroFin = rangoFechaRegistro.fechaFin;
    this.estadisticasFacade.buscarPorCriterios(criterios).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      //OK
      (data) => {
        this.buscando = false;
        if (data.length == 0) {
          this.toastr.info(CUSTOM_MESSAGE_RESULT_NOT_FOUND, BUSQUEDA_SIN_RESULTADOS);
        }
        updateGrid(this.gridOptions, data, this.gridColumnApi, true, true);
        autoSizeColumns(this.gridColumnApi);
      },
      //Error
      (err) => {
        this.buscando = false;
      },
      //Complete
      () => {
        this.buscando = false;
      }
    );
  }
  
  initColumnDefs(): ColDef[]{
    return [
      {
        headerName: "Espacio",
        field: 'descripcionEspacioAcademico',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        enablePivot: false,
        enableRowGroup: true,
        chartDataType: "category",
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Tipo",
        field: 'descripcionTipoEspacio',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        enablePivot: false,
        enableRowGroup: true,
        chartDataType: "category",
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Pabellon",
        field: 'descripcionPabellon',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        enablePivot: false,
        enableRowGroup: true,
        chartDataType: "category",
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Solicitante",
        field: "nombreCompleto",
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        enablePivot: false,
        enableRowGroup: true,
        filterParams: { newRowsAction: "keep" },
      },
      {
        headerName: "Estado Solicitud",
        field: 'descripcionEstadoSolicitud',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        enablePivot: false,
        enableRowGroup: true,
        chartDataType: "category",
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Tipo Solicitud",
        field: 'descripcionTipoSolicitud',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        enablePivot: false,
        enableRowGroup: true,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Registro",
        field: 'fechaRegistro',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        enablePivot: false,
        enableRowGroup: true,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Reserva",
        field: 'fechaReserva',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        chartDataType: "category",
        enablePivot: false,
        enableRowGroup: true,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Inicio",
        field: 'horaInicio',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        enablePivot: false,
        enableRowGroup: true,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Fin",
        field: 'horaFin',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        chartDataType: "category",
        enablePivot: false,
        enableRowGroup: true,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Asistencia",
        field: 'descripcionEstadoAsistencia',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        chartDataType: "category",
        enablePivot: false,
        enableRowGroup: true,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Cantidad",
        field: 'cantidad',
        cellClass: 'ob-type-number',
        chartDataType: "series",
        enablePivot: true,
        enableRowGroup: false,
      },
    ]
  }

}
