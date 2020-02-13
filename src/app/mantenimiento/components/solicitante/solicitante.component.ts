import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormModalComponent, ConfirmModalComponent, TemplateMantenimientoComponent, MdFormOpts, MdConfirmOpts, ButtonsCellRendererComponent } from '../../../shared';
import { TYPES, Type, RESOURCE_ACTIONS, getContextMenuItemsMantenimiento, DEFAULT_SEPARATOR, joinWords, commonConfigTablaMantenimiento, enableControls, updateGrid, configFormMd, manageCrudState,MULTITAB_IDS } from '../../../shared/utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { Solicitante ,MultitabDet} from '../../models';
import { SolicitanteFacade, MultitabDetFacade } from '../../facade';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { ErrorService } from '../../../shared/services/errors/error.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrls: ['./solicitante.component.scss']
})
export class SolicitanteComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateSolicitante') template: TemplateMantenimientoComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @ViewChild('mdSave') mdSave: FormModalComponent;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  type: Type;
  mdConfirmOpts: MdConfirmOpts;
  mdRegisterOpts: MdFormOpts;
  mdUpdateOpts: MdFormOpts;
  mdFormOpts: MdFormOpts;
  form:FormGroup;
  gridOptions: GridOptions;
  gridApi: GridApi;
  private gridColumnApi;
  templateHtmlMsg:string;

  base:any[]= [];
  escuela:any[]= [];
  tipoSolicitante:any[]= [];
  constructor(
    private solicitanteFacade: SolicitanteFacade,
    private multitabDetFacade: MultitabDetFacade,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private errorService: ErrorService
  ) {
    this.type = TYPES.SOLICITANTE;
  }

  ngOnInit() {
    this.templateHtmlMsg =`<p>¿Está seguro que desea eliminar el Solicitante <strong>[codigo]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.form = new FormGroup({
      'idSolicitante' : new FormControl([]),
      'dni': new FormControl('', [Validators.required, Validators.maxLength(8)]),
      'nombres': new FormControl('', [Validators.required, Validators.maxLength(40)]),
      'apellidoMaterno': new FormControl('', [Validators.required, Validators.maxLength(40)]),
      'apellidoPaterno': new FormControl('', [Validators.required, Validators.maxLength(40)]),
      'celular': new FormControl('', [Validators.required, Validators.maxLength(9)]),
      'email': new FormControl('', [Validators.required, Validators.maxLength(30)]),
      'tipoSolicitante' : new FormControl([]),
      'escuela' : new FormControl([]),
      'base' : new FormControl([]),

    })
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idSolicitante;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
      },
      getContextMenuItems: (params) => {
        return getContextMenuItemsMantenimiento(params,this.type,this.template.permisoExportacion);
      }
    }

    this.manageState();
    this.solicitanteFacade.initData();
  }



  ngAfterViewInit(){
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.solicitanteFacade.buscarTodos();
    this.manageState();
  }

  ngOnDestroy() {
    this.solicitanteFacade.resetSolicitante();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState() {
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.base).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.base=data;
    });
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.tipoSolicitante).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.tipoSolicitante=data;
    });
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.escuelaAcademica).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.escuela=data;
    });
    this.store.select('solicitantes').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete, this.toastr,
        this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi);
        });
    });
  }

  showMdRegister() {
    this.mdFormOpts = this.mdRegisterOpts;
    console.log("registroo");
    console.log(this.mdFormOpts);

    this.mdSave.show({}, RESOURCE_ACTIONS.REGISTRO);
  }

  showMdUpdate(params){
    console.log(params.node.data);
    let data: Solicitante = params.node.data;
    this.mdFormOpts = this.mdUpdateOpts;
    enableControls(this.form, false, 'idSolicitante');
    this.mdSave.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params) {

    let data: Solicitante = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[codigo\]/gi,
      joinWords(DEFAULT_SEPARATOR, data.idSolicitante, data.dni));
    this.mdDelete.show(data);
  }

  save() {
    const action = this.mdSave.action;
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO:
        console.log(this.form.getRawValue());
        this.solicitanteFacade.registrar(this.form.getRawValue());
        break;
      case RESOURCE_ACTIONS.ACTUALIZACION:
        this.solicitanteFacade.actualizar(this.form.getRawValue());
        break;
    }
  }

  eliminarSolicitante() {
    this.solicitanteFacade.eliminar(this.mdDelete.data);
  }

  onClickExport(){
    this.solicitanteFacade.exportar();
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Código",
        field: "idSolicitante",
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },

      },{
        headerName: "DNI",
        field: "dni",
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },

      },{
        headerName: "Nombres",
        field: 'nombres',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },{
        headerName: "Apellido Paterno",
        field: 'apellidoPaterno',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },{
        headerName: "Apellido Materno",
        field: 'apellidoMaterno',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },{
        headerName: "Celular",
        field: 'celular',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },{
        headerName: "Email",
        field: 'email',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },{
        headerName: "Tipo Solicitante",
        field: 'tipoSolicitante',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },{
        headerName: "Base",
        field: 'base',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },{
        headerName: "Escuela Académica",
        field: 'escuela',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: 'Acción',
        cellStyle: { 'text-align': "center" },
        cellRendererFramework: ButtonsCellRendererComponent,
        cellRendererParams: {
          edit: {
            visible: this.template.permisoActualizacion,
            action: this.showMdUpdate.bind(this)
          },
          delete: {
            visible: this.template.permisoEliminacion,
            action: this.showMdDelete.bind(this)
          }
        },
        filter: false,
        sortable: false
      }
    ];
  }

}
