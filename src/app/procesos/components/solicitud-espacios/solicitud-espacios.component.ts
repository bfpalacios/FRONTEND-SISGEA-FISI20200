import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormModalComponent, ConfirmModalComponent, TemplateMantenimientoComponent, MdFormOpts, MdConfirmOpts, ButtonsCellRendererComponent } from '../../../shared';
import { TYPES, Type, RESOURCE_ACTIONS, MULTITAB_IDS, getContextMenuItemsMantenimiento, addLabelToObjsArr, getFormattedDate, DEFAULT_SEPARATOR, joinWords, commonConfigTablaMantenimiento, enableControls, updateGrid, configFormMd, manageCrudState } from '../../../shared/utils';
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
import { SolicitudEspacio } from '../../model/index'
@Component({
  selector: 'app-solicitud-espacios',
  templateUrl: './solicitud-espacios.component.html',
  styleUrls: ['./solicitud-espacios.component.scss']
})
export class SolicitudEspaciosComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  @ViewChild('template') template: TemplateMantenimientoComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @ViewChild('mdSave') mdSave: FormModalComponent;
  @ViewChild('mdUpdate') mdUpdate: FormModalComponent;
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
  espacios: any[] = [];
  solicitantesFiltrado: any[] = [];
  estadoSolicitud: any[] = [];

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
      'tipoSolicitud': new FormControl('', [Validators.required]),
      'idSolicitante': new FormControl('', [Validators.required]),
      'motivo': new FormControl('', [Validators.required, Validators.maxLength(200)]),
    //  'idsEspacioAcademico': new FormControl('', ),
      'idEspacioAcademico': new FormControl('', [Validators.required]),
      'fechaReserva': new FormControl('', [Validators.required]),
      'horaFin': new FormControl('', [Validators.required]),
      'horaInicio': new FormControl('', [Validators.required]),
      'estadoSolicitud':new FormControl('', ),
      'idSolicitud':new FormControl('', )
    });
    this.formHorario = new FormGroup({
      'idsEspacioAcademico': new FormControl([], [Validators.required]),
      'fecha': new FormControl('', [Validators.required]),
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
    this.store.select('solicitudEspacios').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
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
    this.solicitudEspaciosFacade.buscarEspacios().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.espacios = data;
    });
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.estadoSolicitud).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.estadoSolicitud = data;
    });
  }

  onClickBuscarHorarioEspacio(){
    this.buscando = true;
    let criterio = this.formHorario.getRawValue();
    this.solicitudEspaciosFacade.buscarEspaciosHorarios(criterio).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data) => {
        this.buscando = false;
        console.log(data);
      }
    );
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
    form = {
      ...form,
      fechaReserva: getFormattedDate(this.form.getRawValue().fechaReserva,'YYYY-MM-DD')
    }
    this.prestando = true;
    this.solicitudEspaciosFacade.registrar(form).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data) => {
          this.prestando = false;
          this.mdSave.hide();
          this.solicitudEspaciosFacade.buscarTodos().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
            updateGrid(this.gridOptions, data, this.gridColumnApi);
            this.toastr.success('Realizado con exito','Prestamo de espacios');
          });
      },
      (err) => {
          this.prestando = false;
          this.toastr.error('Ocurrio un problema en el prestamo del espacio','Prestamo de espacios');
      },
      () =>{
          this.prestando = false;
      }
    );
  }

  abrirModalRegistrar(){
    this.mdSave.show({});
  }

  showMdUpdate(params) {
  let data: SolicitudEspacio = params.node.data;
console.log(data);
  this.mdFormOpts = this.mdUpdateOpts;
  enableControls(this.form, false, 'idSolicitud');
  this.mdUpdate.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
}
save() {
  const action = this.mdUpdate.action;
  switch (action) {

    case RESOURCE_ACTIONS.ACTUALIZACION:
      this.solicitudEspaciosFacade.actualizar(this.form.getRawValue()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (data) => {
          this.mdUpdate.hide();
            },

        (err) => {

                  //this.prestando = false;
                  this.toastr.error('Ocurrio un problema en el prestamo del espacio','Prestamo de espacios');
              },
        () =>{
                //  this.prestando = false;
              }


      );



      break;
  }
}




  initColumnDefs(): ColDef[] {
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
      {
        headerName: 'Acción',
        cellClass: 'text-center',
        cellRendererFramework: ButtonsCellRendererComponent,
        cellRendererParams: {
          edit: {
            visible: true,
            action: this.showMdUpdate.bind(this)
          }
        },
        filter: false,
        sortable: false
      }
    ];
  }

}
