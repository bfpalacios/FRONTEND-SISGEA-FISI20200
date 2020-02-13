import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ErrorService } from '../../../shared/services/errors/error.service';
import { TYPES, Type, configFormMd, commonConfigTablaMantenimiento, manageCrudState, updateGrid, autoSizeColumns, joinWords, DEFAULT_SEPARATOR, renderYesNoLabel, RESOURCE_ACTIONS, enableControls } from '../../../shared/utils';
import { RecursoFacade } from '../../facade';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { TemplateMantenimientoComponent, ConfirmModalComponent, FormModalComponent, MdConfirmOpts, MdFormOpts, ButtonsCellRendererComponent, ObSwitchFilterGridComponent } from '../../../shared';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridApi, GridOptions, ColDef } from 'ag-grid-community';
import { CategoriaRecurso, RecursoSeg } from '../../models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.scss']
})
export class RecursoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateRecurso') template: TemplateMantenimientoComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @ViewChild('mdSave') mdSave: FormModalComponent;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  mdConfirmOpts: MdConfirmOpts;
  mdRegisterOpts: MdFormOpts;
  mdUpdateOpts: MdFormOpts;
  mdFormOpts: MdFormOpts;
  type: Type;
  form: FormGroup;
  gridApi: GridApi;
  private gridColumnApi;
  gridOptions: GridOptions;
  templateHtmlMsg: string;
  categoriasRecurso: CategoriaRecurso[] = [];

  constructor(private recursoFacade: RecursoFacade, private toastr: ToastrService,
    private store: Store<AppState>, private errorService: ErrorService) {
    this.type = TYPES.RECURSO;
  }

  ngOnInit() {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar el recurso <strong>[codigo]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.form = new FormGroup({
      'idRecurso': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
      'descripcionRecurso': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      'idCategoriaRecurso': new FormControl('', [Validators.required]),
      'auditable': new FormControl(false),
      'asignable': new FormControl(false)
    });
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idRecurso;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        //autoSizeColumns(this.gridColumnApi);
      }
    };
    this.recursoFacade.initData();
    this.store.select('categoriasRecurso').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(state => this.categoriasRecurso = state.data);
  }

  ngAfterViewInit(){
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.recursoFacade.buscarTodos();
    this.manageState();
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState(): void {
    this.store.select('recursos').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete,
        this.toastr, this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi, false, true);
        });
    });
  }

  showMdRegister(): void {
    this.mdFormOpts = this.mdRegisterOpts;
    enableControls(this.form, true, 'idRecurso');
    this.mdSave.show({}, RESOURCE_ACTIONS.REGISTRO);
  }

  showMdUpdate(params): void {
    let data: RecursoSeg = params.node.data;
    this.mdFormOpts = this.mdUpdateOpts;
    enableControls(this.form, false, 'idRecurso');
    this.mdSave.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params): void {
    let data: RecursoSeg = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[codigo]/gi, data.descripcionRecurso);
    this.mdDelete.show(data);
  }
  
  save(){
    const action = this.mdSave.action;
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO: {
        this.recursoFacade.registrar(this.form.getRawValue());
        break;
      }
      case RESOURCE_ACTIONS.ACTUALIZACION: {
        this.recursoFacade.actualizar(this.form.getRawValue());
        break;
      }
    }
  }

  eliminarRecurso(){
    this.recursoFacade.eliminar(this.mdDelete.data);
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: 'Id',
        field: 'idRecurso',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
      },
      {
        headerName: 'Descripción',
        field: 'descripcionRecurso',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
      },
      {
        headerName: 'Categoría recurso',
        field: 'idCategoriaRecurso',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        valueGetter: (params) => {
          return joinWords(DEFAULT_SEPARATOR, params.data.idCategoriaRecurso, params.data.descripcionCategoriaRecurso);
        }
      },
      {
        headerName: 'Auditable',
        field: 'auditable',
        cellClass: 'text-center',
        filter: 'agTextColumnFilter',
        floatingFilterComponentFramework: ObSwitchFilterGridComponent,
        floatingFilterComponentParams: {
          yesOption: 'true',
          noOption: 'false',
          suppressFilterButton: true
        },
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value)
        }
      },
      {
        headerName: 'Asignable',
        field: 'asignable',
        cellClass: 'text-center',
        filter: 'agTextColumnFilter',
        floatingFilterComponentFramework: ObSwitchFilterGridComponent,
        floatingFilterComponentParams: {
          yesOption: 'true',
          noOption: 'false',
          suppressFilterButton: true
        },
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value)
        },
      },
      {
        headerName: 'Acción',
        pinned: 'right', 
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
    ]
  }

}
