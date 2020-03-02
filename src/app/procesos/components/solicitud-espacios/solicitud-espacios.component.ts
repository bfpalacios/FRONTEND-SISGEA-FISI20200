import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormModalComponent, ConfirmModalComponent, TemplateMantenimientoComponent, MdFormOpts, MdConfirmOpts, ButtonsCellRendererComponent } from '../../../shared';
import { TYPES, Type, RESOURCE_ACTIONS, MULTITAB_IDS, removeElementArr,getContextMenuItemsMantenimiento, getLocalString, addLabelToObjsArr, getFormattedDate, DEFAULT_SEPARATOR, joinWords, commonConfigTablaMantenimiento, enableControls, updateGrid, configFormMd, manageCrudState, FA_ICON_UPLOAD, MESSAGE_BODY_CARGA_SUCCESS, MESSAGE_TITLE_CARGA_SUCCESS, MESSAGE_BODY_CARGA_DUPLICADA_ERROR, MESSAGE_BODY_CARGA_VACIA_ERROR, MESSAGE_TITLE_CARGA_ERROR } from '../../../shared/utils';
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
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
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
  @ViewChild('mdAprobar') mdAprobar: FormModalComponent;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  type: Type;
  mdConfirmOpts: MdConfirmOpts;
  mdRegisterOpts: MdFormOpts;
  mdUpdateOpts: MdFormOpts;
  mdFormOpts: MdFormOpts;
  mdAprobarOpts: MdFormOpts;
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
  tipoSolicitud: any[] = [];
  pabellon: any[] = [];
  tipoEspacio: any[] = [];
  solicitantes: any[] = [];
  espacios: any[] = [];
  solicitantesFiltrado: any[] = [];
  estadoSolicitud: any[] = [];
  estadoAsistencia: any[] = [];
  tipoMotivo: any[] = [];


  configCarga: any ={
    accept: '.pdf',
    multiple: false,
    maxFileSize: 20971520, //20MB
    expandable: true,
    loading: false,
    class: FA_ICON_UPLOAD
  }
  files: File[] = [];
  cargando: boolean = false;

  filesNamesAdded: string[] = [];

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
    this.mdAprobarOpts = configFormMd.getUpdateMdOpts(this.type);
    this.mdRegisterOpts.modalClass = 'modal-reglas-compensacion';
    this.mdUpdateOpts.modalClass = 'modal-reglas-compensacion';
    this.mdAprobarOpts.modalClass = 'modal-reglas-compensacion';
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
      'idSolicitud':new FormControl('', ),
      'estadoAsistencia':new FormControl('', ),
      'pabellon': new FormControl('', ),
      'fechaRegistro':new FormControl('', ),
      'idTipoEspacio':new FormControl('', ),
      'tipoSolicitante': new FormControl('', [Validators.required]),
    });
    this.formHorario = new FormGroup({
      'idsEspacioAcademico': new FormControl([], [Validators.required]),
      'fechas': new FormControl('', [Validators.required]),
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
      rowData: [],
      getRowNodeId: (data) => {
        return data.horario;
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

  onSelect(event: NgxDropzoneChangeEvent) {
    event.addedFiles.filter(e=>{
      if(this.filesNamesAdded.indexOf(e.name)==-1){
          this.files.push(e);
          this.filesNamesAdded.push(e.name);
      }else{
        this.toastr.error(MESSAGE_BODY_CARGA_DUPLICADA_ERROR.replace('name',e.name),MESSAGE_TITLE_CARGA_ERROR);
      }
    });
  }

  onRemove(event) {
    removeElementArr(this.filesNamesAdded,event.name);
    this.files.splice(this.files.indexOf(event), 1);
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
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.tipoSolicitud).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.tipoSolicitud = data;
    });
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.pabellon).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.pabellon = data;
    });
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.tipoEspacio).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.tipoEspacio = data;
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
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.estadoAsistencia).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.estadoAsistencia = data;
    });

  }

  onClickBuscarHorarioEspacio(){
    this.buscando = true;
    updateGrid(this.gridOptionsHorario, [], this.gridColumnApiHorario, false, false);
    if(this.formHorario.getRawValue().fechas == null){
      this.buscando = false;
      return;
    }
    let criterio = this.formHorario.getRawValue();
    criterio = {
      ...criterio,
      fecha: getFormattedDate(this.formHorario.getRawValue().fechas,'YYYY-MM-DD')
    }
    this.solicitudEspaciosFacade.buscarEspaciosHorarios(criterio).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data: any[]) => {
        this.buscando = false;
        if(data.length == 0){
          return;
        }
        this.gridOptionsHorario.api.setColumnDefs(this.getInitColDefEspaciosDinamicos(data));
        updateGrid(this.gridOptionsHorario, this.getDataEspaciosDinamicos(data), this.gridColumnApiHorario, false, false);
      }
    );
  }

  getInitColDefEspaciosDinamicos(data: any[]): any[]{
    let columnResult: any[] = [];
    let espacios: any[] = [];
    let espaciosConDesc: any = {};
    data.forEach(e => {
      if(espacios.indexOf(e.idEspacioAcademico)==-1){
        espacios.push(e.idEspacioAcademico);
        espaciosConDesc[e.idEspacioAcademico] = e.descripcionEspacioAcademico;
      }
    });
    columnResult.push({
      headerName: "Horario",
      field: "horario",
      cellClass: 'ob-type-string-center',
    })
    espacios.forEach(e => {
      columnResult.push({
        headerName: espaciosConDesc[e],
        field: "descripcion"+e,
        id: e,
        cellClass: 'ob-type-string',
        cellStyle: function(params) {
          if(params.value!=0 && params.value!=null && params.value!=undefined) {
            let id = params.colDef.id;
            let indicador = params.data["indicador"+id];
            if(indicador == 'V'){
              return {'background-color': 'darkseagreen', 'color': 'white', 'font-weight': 'bold'};
            }
            if(indicador == 'R'){
              return {'background-color': 'indianred', 'color': 'white', 'font-weight': 'bold'};
            }
            if(indicador == 'G'){
              return {'background-color': 'goldenrod', 'color': 'white', 'font-weight': 'bold'};
            }
            return null;
          }else {
            return null;
          }
        }
      })
    });
    return columnResult;
  }

  getDataEspaciosDinamicos(data: any[]): any[]{
    let dataResult: any[] = [];
    let espacios: any[] = [];
    let horarios: any[] = [];
    let espaciosConDesc: any = {};
    data.forEach(e => {
      if(espacios.indexOf(e.idEspacioAcademico)==-1){
        espacios.push(e.idEspacioAcademico);
        espaciosConDesc[e.idEspacioAcademico] = e.descripcionEspacioAcademico;
      }
    });
    data.forEach(e => {
      if(horarios.indexOf(e.horario)==-1){
        horarios.push(e.horario);
      }
    });
    horarios.forEach(e => {
      let obj: any = {};
      obj["horario"] = e;
      espacios.forEach(m => {
        obj["descripcion"+m] = ''
        obj["indicador"+m] = ''
      });
      dataResult.push(obj);
    });
    dataResult.forEach(result => {
      data.forEach(d => {
        if(result.horario == d.horario){
          let descripcion = '';
          let curso = d.descripcionCurso == null ? '' :  d.descripcionCurso;
          let tipoHorario = d.tipoHorario == null ? '' : d.tipoHorario;
          let descTipoHorario = (tipoHorario == 'L' ? 'Laboratorio' : tipoHorario == 'T' ? 'Teoria' : tipoHorario == 'R' ? 'Reserva' : '');
          let indicador = '';
          switch(tipoHorario){
            case 'L':
              indicador = 'R';
              descripcion = curso + " - (" + tipoHorario + ") " + descTipoHorario;
            break;
            case 'P':
              indicador = 'R';
              descripcion = curso + " - (" + tipoHorario + ") " + descTipoHorario;
            break;
            case 'R':
              indicador = 'G';
              descripcion = curso + " - (" + tipoHorario + ") " + descTipoHorario;
              break;
            default:
              indicador = 'V';
              descripcion = ''
              break;
          }
          result["descripcion"+d.idEspacioAcademico] = descripcion;
          result["indicador"+d.idEspacioAcademico] = indicador;
        }
      });
    });
    console.log(dataResult);
    return dataResult;
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
          //
          console.log(this.files)
          this.solicitudEspaciosFacade.cargar(this.files).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
            if(this.files.length >= 1){
              this.toastr.success(MESSAGE_BODY_CARGA_SUCCESS, MESSAGE_TITLE_CARGA_SUCCESS);
            }else{
              this.toastr.error(MESSAGE_BODY_CARGA_VACIA_ERROR, MESSAGE_TITLE_CARGA_ERROR);
            }
          });
        //
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
    enableControls(this.form, true, 'tipoSolicitud');
    enableControls(this.form, true, 'idSolicitante');
    enableControls(this.form, true, 'motivo');
    enableControls(this.form, true, 'idEspacioAcademico');
    enableControls(this.form, true, 'fechaReserva');
    enableControls(this.form, true, 'horaInicio');
    enableControls(this.form, true, 'horaFin');
    this.mdSave.show({});
  }

showMdUpdate(params) {
  let data: SolicitudEspacio = params.node.data;
  this.mdFormOpts = this.mdUpdateOpts;
  enableControls(this.form, false, 'idSolicitud');
  enableControls(this.form, false, 'fechaRegistro');
  enableControls(this.form, false, 'fechaReserva');
  enableControls(this.form, true, 'idEspacioAcademico');
  enableControls(this.form, true, 'horaInicio');
  enableControls(this.form, true, 'horaFin');
  enableControls(this.form, true, 'tipoSolicitud');
  enableControls(this.form, true, 'idSolicitante');
  enableControls(this.form, true, 'motivo');
  enableControls(this.form, true, 'estadoSolicitud');
  enableControls(this.form, true, 'estadoAsistencia');

  this.mdUpdate.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
}

showMdAprobar(params) {
  let data: SolicitudEspacio = params.node.data;
  this.mdFormOpts = this.mdAprobarOpts;
  enableControls(this.form, false, 'tipoSolicitud');
  enableControls(this.form, false, 'idSolicitante');
  enableControls(this.form, false, 'motivo');
  enableControls(this.form, false, 'pabellon');
  enableControls(this.form, false, 'fechaReserva');
  enableControls(this.form, false, 'idEspacioAcademico');
  enableControls(this.form, false, 'horaInicio');
  enableControls(this.form, false, 'horaInicio');
  enableControls(this.form, false, 'horaFin');
  enableControls(this.form, false, 'idTipoEspacio');
  this.mdAprobar.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
}


save() {
  const action = this.mdUpdate.action;
  switch (action) {

    case RESOURCE_ACTIONS.ACTUALIZACION:
      this.solicitudEspaciosFacade.actualizar(this.form.getRawValue()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (data) => {
          this.mdUpdate.hide();
          this.solicitudEspaciosFacade.buscarTodos().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
            updateGrid(this.gridOptions, data, this.gridColumnApi);
            this.toastr.success('Realizado con exito','Prestamo de espacios');
          });
            },

        (err) => {

                  this.toastr.error('Ocurrio un problema en el prestamo del espacio','Prestamo de espacios');
              },
        () =>{

              }


      );
  }
}


aprobar() {
  const action = this.mdUpdate.action;
  switch (action) {

    case RESOURCE_ACTIONS.ACTUALIZACION:

      this.solicitudEspaciosFacade.aprobar(this.form.getRawValue()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (data) => {
          this.mdUpdate.hide();
          this.solicitudEspaciosFacade.buscarTodos().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
            updateGrid(this.gridOptions, data, this.gridColumnApi);
            this.toastr.success('Realizado con exito','Prestamo de espacios');
          });
            },

        (err) => {

                  this.toastr.error('Ocurrio un problema en el prestamo del espacio','Prestamo de espacios');
              },
        () =>{

              }


      );



      break;
  }
}

hide(){
  console.log("saliendo");
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
          },
          delete: {
            visible: this.template.permisoEliminacion,
            action: this.showMdAprobar.bind(this)
          }
        },
        filter: false,
        sortable: false
      }
    ];
  }

}
