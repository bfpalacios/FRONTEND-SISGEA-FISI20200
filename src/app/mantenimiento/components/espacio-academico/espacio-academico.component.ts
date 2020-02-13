import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormModalComponent, ConfirmModalComponent, TemplateMantenimientoComponent, MdFormOpts, MdConfirmOpts, ButtonsCellRendererComponent } from '../../../shared';
import { TYPES, Type, RESOURCE_ACTIONS, getContextMenuItemsMantenimiento, DEFAULT_SEPARATOR, joinWords, commonConfigTablaMantenimiento, enableControls, updateGrid, configFormMd, manageCrudState,renderYesNoLabel,MULTITAB_IDS } from '../../../shared/utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { EspacioAcademico } from '../../models';
import { EspacioAcademicoFacade ,MultitabDetFacade} from '../../facade';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { ErrorService } from '../../../shared/services/errors/error.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-espacio-academico',
  templateUrl: './espacio-academico.component.html',
  styleUrls: ['./espacio-academico.component.scss']
})
export class EspacioAcademicoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateEspacioAcademico') template: TemplateMantenimientoComponent;
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
  tipoEspacio:any[]= [];
  constructor(
    private espacioAcademicoFacade: EspacioAcademicoFacade,
    private multitabDetFacade: MultitabDetFacade,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private errorService: ErrorService
  ) {
    this.type = TYPES.ESPACIO_ACADEMICO;
  }

  ngOnInit() {
    this.templateHtmlMsg =`<p>¿Está seguro que desea eliminar el Espacio Academico <strong>[codigo]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.form = new FormGroup({
      'idEspacioAcademico': new FormControl('', [Validators.required ,Validators.min(0), Validators.min(0), Validators.max(999)]),
      'tipoEspacio': new FormControl('', []),
      'descripcionEspacioAcademico': new FormControl('', [Validators.required, Validators.maxLength(40)]),
      'aforo': new FormControl('', [Validators.required, Validators.maxLength(3)]),
      'pabellon': new FormControl('', [Validators.required, Validators.maxLength(20)]),
      'asignable': new FormControl('', [Validators.required, Validators.maxLength(1)]),

    })
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idEspacioAcademico;
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
  }

  ngAfterViewInit(){
    this.template.permisoEliminacion = true;
    this.template.permisoActualizacion = true;

    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.espacioAcademicoFacade.buscarTodos();
    this.manageState();
  }

  ngOnDestroy() {
    this.espacioAcademicoFacade.resetEspacioAcademico();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState() {
    this.multitabDetFacade.buscarPorMultitabCabSync(MULTITAB_IDS.tipoEspacio).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      console.log(data);
      this.tipoEspacio=data;
    });
    this.store.select('espaciosAcademico').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete, this.toastr,
        this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi);
        });
    });
  }

  showMdRegister() {
    this.mdFormOpts = this.mdRegisterOpts;
    enableControls(this.form, true, 'idEspacioAcademico');
    this.mdSave.show({}, RESOURCE_ACTIONS.REGISTRO);
  }

  showMdUpdate(params){
    let data: EspacioAcademico = params.node.data;
    this.mdFormOpts = this.mdUpdateOpts;
    enableControls(this.form, false, 'idEspacioAcademico');
    this.mdSave.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params) {
    let data: any = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[codigo\]/gi,
      joinWords(DEFAULT_SEPARATOR, data.idEspacioAcademico, data.descripcionEspacioAcademico));
    this.mdDelete.show(data);
  }

  save() {
    const action = this.mdSave.action;
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO:
        this.espacioAcademicoFacade.registrar(this.form.getRawValue());
        break;
      case RESOURCE_ACTIONS.ACTUALIZACION:
        this.espacioAcademicoFacade.actualizar(this.form.getRawValue());
        break;
    }
  }

  eliminarEspacioAcademico() {
    this.espacioAcademicoFacade.eliminar(this.mdDelete.data);
  }

  onClickExport(){
    this.espacioAcademicoFacade.exportar();
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Código",
        field: "idEspacioAcademico",
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },

      },{
        headerName: "Descripción",
        field: 'descripcionEspacioAcademico',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },{
        headerName: "Tipo Espacio",
        field: 'tipoEspacio',
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.tipoEspacio, params.data.descripcionTipoEspacio);
        },
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },{
        headerName: "Aforo",
        field: 'aforo',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },{
        headerName: "Pabellón",
        field: 'pabellon',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },{
        headerName: "Asignable",
        field: 'asignable',
        cellClass: 'ob-type-string-center',
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value);
        },
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
