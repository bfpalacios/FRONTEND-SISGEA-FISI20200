import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormModalComponent, ConfirmModalComponent, TemplateMantenimientoComponent, MdFormOpts, MdConfirmOpts, ButtonsCellRendererComponent } from '../../../shared';
import { TYPES, Type, RESOURCE_ACTIONS, MULTITAB_IDS, getContextMenuItemsMantenimiento, addLabelToObjsArr, DEFAULT_SEPARATOR, joinWords, commonConfigTablaMantenimiento, enableControls, updateGrid, configFormMd, manageCrudState } from '../../../shared/utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { ErrorService } from '../../../shared/services/errors/error.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MultitabDetFacade } from '../../../mantenimiento/facade';
import { SolicitudEspaciosFacade } from '../../facade/solicitud-espacios.facade';

@Component({
  selector: 'app-solicitud-espacios',
  templateUrl: './solicitud-espacios.component.html',
  styleUrls: ['./solicitud-espacios.component.scss']
})
export class SolicitudEspaciosComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  @ViewChild('template') template: TemplateMantenimientoComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @ViewChild('mdSave') mdSave: FormModalComponent;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  type: Type;
  mdConfirmOpts: MdConfirmOpts;
  mdRegisterOpts: MdFormOpts;
  mdUpdateOpts: MdFormOpts;
  mdFormOpts: MdFormOpts;
  form:FormGroup;
  formHorario:FormGroup;
  gridOptions: GridOptions;
  gridApi: GridApi;
  private gridColumnApi;


  gridOptionsHorario: GridOptions;
  gridApiHorario: GridApi;
  private gridColumnApiHorario;

  templateHtmlMsg:string;

  loading: boolean = false;
  buscando: boolean = false;
  prestando: boolean = false;

  tipoSolicitante: any[] = [];
  solicitantes: any[] = [];
  solicitantesFiltrado: any[] = [];

  constructor(
    private solicitudEspaciosFacade: SolicitudEspaciosFacade,
    private multitabDetFacade: MultitabDetFacade,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private errorService: ErrorService,
    private cdRef : ChangeDetectorRef
  ) {
    this.type = TYPES.SOLI_ESPACIOS;
  }

  ngOnInit() {
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.mdRegisterOpts.modalClass = 'modal-reglas-compensacion';
    this.mdUpdateOpts.modalClass = 'modal-reglas-compensacion';
    this.mdRegisterOpts.buttons.ok.hidden = true;
    this.form = new FormGroup({
      'tipoSolicitud': new FormControl('', [Validators.required ,Validators.min(0), Validators.min(0), Validators.max(99)]),
      'solicitante': new FormControl('', [Validators.required, Validators.maxLength(30)]),
      'motivo': new FormControl('', [Validators.required, Validators.maxLength(30)]),
    });
    this.formHorario = new FormGroup({
      'pabellon': new FormControl('', [Validators.required ,Validators.min(0), Validators.min(0), Validators.max(99)]),
      'tipoEspacio': new FormControl('', [Validators.required, Validators.maxLength(30)]),
      'fecha': new FormControl('', [Validators.required, Validators.maxLength(30)]),
    })
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idSolicitud;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
      },
      getContextMenuItems: (params) => {
        return getContextMenuItemsMantenimiento(params,this.type,this.template.permisoExportacion);
      }
    };
    this.gridOptionsHorario = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idOrigen;
      },
      onGridReady: (params) => {
        this.gridApiHorario = params.api;
        this.gridColumnApiHorario = params.columnApi;
        params.api.sizeColumnsToFit();
      },
      getContextMenuItems: (params) => {
        return getContextMenuItemsMantenimiento(params,this.type,this.template.permisoExportacion);
      }
    };
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(){
    this.template.permisoRegistro = false;
    this.template.permisoCarga = false;
    this.template.permisoExportacion = true;
    this.template.permisoProcesar = true;
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.solicitudEspaciosFacade.initData();
    this.manageState();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState() {
    this.store.select('asignacionEspacios').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete, this.toastr,
        this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi);
        });
    });
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.tipoSolicitante).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.tipoSolicitante = data;
    });
    this.solicitudEspaciosFacade.buscarSolicitantes().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.solicitantes = data;
      this.solicitantesFiltrado = data;
    });
  }

  onChangeTipoSolicitante(item){
    if(item==undefined || item==null){
      this.solicitantes = [];
      return;
    }
    this.solicitantesFiltrado = this.solicitantes.filter(e=>e.tipoSolicitante == item.idMultitabDet);
  }

  clickSolicitar(){
    let form = this.form.getRawValue();
    console.log(form);
    this.solicitudEspaciosFacade.registrar(form).pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      console.log(state);
    });
  }

  abrirModalRegistrar(){
    this.mdSave.show({});
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Tipo",
        field: "tipoSolicitud",
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },

      },
      {
        headerName: "Espacio",
        field: 'idEspacioAcademico',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Estado",
        field: 'estado',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "DNI",
        field: 'dni',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Solicitante",
        field: 'solicitante',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Registro",
        field: 'registro',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Reserva",
        field: 'reserva',
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
      }
    ];
  }

}
