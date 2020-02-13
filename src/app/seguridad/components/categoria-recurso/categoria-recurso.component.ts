import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  ButtonsCellRendererComponent,
  ConfirmModalComponent,
  FormModalComponent,
  MdConfirmOpts,
  MdFormOpts,
  TemplateMantenimientoComponent
} from "../../../shared/components";
import {
  commonConfigTablaMantenimiento,
  configFormMd,
  DEFAULT_SEPARATOR,
  enableControls,
  joinWords,
  manageCrudState,
  RESOURCE_ACTIONS,
  Type,
  TYPES,
  updateGrid
} from "../../../shared/utils";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GridOptions, GridApi, ColDef } from "ag-grid-community";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import { AppState } from "../../../shared/store/app.reducers";
import { ErrorService } from "../../../shared/services/errors/error.service";
import { CategoriaRecursoFacade } from "../../facade";
import { CategoriaRecurso, Accion } from "../../models";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-categoria-recurso',
  templateUrl: './categoria-recurso.component.html',
  styleUrls: ['./categoria-recurso.component.scss']
})
export class CategoriaRecursoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateCategoriaRecurso') template: TemplateMantenimientoComponent;
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
  acciones: Accion[];

  constructor(private categoriaRecursoFacade: CategoriaRecursoFacade, private toastr: ToastrService,
    private store: Store<AppState>, private errorService: ErrorService) {
    this.type = TYPES.CATEGORIA_RECURSO;
  }

  ngOnInit(): void {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar el tipo de autenticación <strong>[codigo]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.form = new FormGroup(
      {
        'idCategoriaRecurso': new FormControl('', [Validators.required, Validators.min(1),
        Validators.max(99)]),
        'descripcionCategoriaRecurso': new FormControl('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(60)]),
        'idsAccionesPermitidas': new FormControl('', [Validators.required])
      });
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idCategoriaRecurso;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
      }
    };
    this.initData();
    this.store.select('acciones').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => this.acciones = state.data);
  }

  ngAfterViewInit(): void {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.manageState();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState(): void {
    this.store.select('categoriasRecurso').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete,
        this.toastr, this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi, false, true);
        });
    });
  }

  initData(): void {
    this.categoriaRecursoFacade.buscarAcciones();
    this.categoriaRecursoFacade.buscarTodos();
  }

  showMdRegister(): void {
    this.mdFormOpts = this.mdRegisterOpts;
    enableControls(this.form, true, 'idCategoriaRecurso');
    this.mdSave.show({}, RESOURCE_ACTIONS.REGISTRO);
  }

  showMdUpdate(params): void {
    let data: CategoriaRecurso = params.node.data;
    data.idsAccionesPermitidas = []
    data.accionesPermitidas.map(a => {
      data.idsAccionesPermitidas.push(a.idAccion)
    });
    this.mdFormOpts = this.mdUpdateOpts;
    enableControls(this.form, false, 'idCategoriaRecurso');
    this.mdSave.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params): void {
    let data: CategoriaRecurso = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[codigo]/gi, joinWords(DEFAULT_SEPARATOR,
      data.idCategoriaRecurso, data.descripcionCategoriaRecurso));
    this.mdDelete.show(data);
  }

  save(): void {
    const action = this.mdSave.action;
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO: {
        this.categoriaRecursoFacade.registrar(this.form.getRawValue());
        break;
      }
      case RESOURCE_ACTIONS.ACTUALIZACION: {
        this.categoriaRecursoFacade.actualizar(this.form.getRawValue());
        break;
      }
    }
  }

  eliminarCategoriaRecurso(): void {
    this.categoriaRecursoFacade.eliminar(this.mdDelete.data);
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Identificador",
        field: "idCategoriaRecurso",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        width: 120
      },
      {
        headerName: "Descripción",
        field: "descripcionCategoriaRecurso",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Acciones Permitidas",
        field: "accionesPermitidas",
        cellRenderer: (params) => {
          let result: string = "";
          params.data.accionesPermitidas.forEach((a: Accion) => {
            result += a.idAccion + " - " + a.descripcionAccion + "   "
          })
          return result;
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
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
    ];
  }
}
