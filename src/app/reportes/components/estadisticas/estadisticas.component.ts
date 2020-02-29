import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { TemplateReporteComponent, ConfirmModalComponent, FormModalComponent, MdConfirmOpts, MdFormOpts, ButtonsCellRendererComponent, ObSwitchFilterGridComponent } from '../../../shared';
import { TYPES, Type, RESOURCE_ACTIONS, DEFAULT_SEPARATOR, getFormattedDate, getContextMenuItemsMantenimiento, joinWords, commonConfigTablaMantenimiento, updateGrid, configFormMd, manageCrudState, enableControls, commontConfigTablaServerSideScroll, autoSizeColumns, getContextMenuItemsConsultas, CUSTOM_MESSAGE_RESULT_NOT_FOUND, BUSQUEDA_SIN_RESULTADOS, getDateRange, getDaysInRange, CUSTOM_MESSAGE_MAX_RANGE_EXCEDED, BUSQUEDA_INVALIDA, getDateFromString, setValueControls, renderYesNoLabel, formatMoney } from '../../../shared/utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridOptions, GridApi, ColDef, ColGroupDef } from 'ag-grid-community';
import { EstadisticasFacade } from '../../facade';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgSelectComponent } from '@ng-select/ng-select';

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
  motivos: any[] = [];
  solicitantes: any[] = [];

  buscando: boolean = false;
  criteriosFilters: any;
  vssVisa: any;
  fechaProcesoForm: Date;


  constructor(
    private toastr: ToastrService,
    private store: Store<AppState>,
    private estadisticasFacade: EstadisticasFacade
  ) {
    this.type = TYPES.ESTADISTICAS;
  }

  ngOnInit() {
    this.form = new FormGroup({
      'fechaRegistro': new FormControl('', [Validators.required, Validators.maxLength(23)]),
      'pabellones': new FormControl([]),
      'tipoEspacios': new FormControl([]),
      'espacios': new FormControl([]),
      'tiposSolicitudes': new FormControl([]),
      'motivos': new FormControl([]),
      'solicitantes': new FormControl([]),
    });
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.id;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        autoSizeColumns(this.gridColumnApi);
        this.gridReady = true;
        this.gridReady = true;
      },
      getContextMenuItems: (params) => {
        return getContextMenuItemsConsultas(params, this.type, this.template.permisoExportacion);
      },
      groupIncludeFooter: true,
      groupIncludeTotalFooter: true,

    };

    this.manageState();
    //this.vssVisaFacade.initData();

  }

  ngAfterViewInit() {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    updateGrid(this.gridOptions, [], this.gridColumnApi, true, true);
    autoSizeColumns(this.gridColumnApi);
  }

  ngOnDestroy() {
    //this.vssVisaFacade.resetState();
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
    
  }
  
  
  onClickSearchBtn(){
    
  }
  
  initColumnDefs(): ColDef[]{
    return [
      {
        headerName: "Solicitud",
        field: "idSolicitud",
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },

      },
      {
        headerName: "Espacio",
        field: 'idEspacioAcademico',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idEspacioAcademico, params.data.descripcionEspacioAcademico);
        },
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Estado Solicitud",
        field: 'estadoSolicitud',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.estadoSolicitud, params.data.descripcionEstadoSolicitud);
        },
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Solicitante",
        field: 'dni',
        valueGetter: (params) => {
          if(params.data){
            return params.data.nombres + ' ' + params.data.nombres + ' ' + params.data.apellidoPaterno + params.data.apellidoMaterno
          }else{
            return '';
          }
        },
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Fecha",
        field: 'fechaReserva',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Inicio",
        field: 'horaInicio',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Fin",
        field: 'horaFin',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Motivo",
        field: 'motivo',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
    ]
  }

}
