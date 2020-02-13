import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { FormModalComponent, MdConfirmOpts, ButtonsCellRendererComponent, ConfirmModalComponent } from '../../../../shared';
import { TemplateMantenimientoDetalleComponent } from '../../../../shared/components/template-mantenimiento-detalle/template-mantenimiento-detalle.component';
import { Menu, Accion, RecursoSeg, MenuRecurso } from '../../../models';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { AppState } from '../../../../shared/store/app.reducers';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ResetAccion, GetAccionesByCatRecurso } from '../../../../shared/store/actions/seguridad/accion.actions';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { configFormMd, commonConfigTablaMantenimiento, resetForm, Type, manageCrudDetailState, updateGrid, enableControls, extractSimpleArrayFromObjArray, RESOURCE_ACTIONS, filterObjArray } from '../../../../shared/utils';
import { MenuRecursoFacade } from '../../../facade';
import { ErrorService } from '../../../../shared/services/errors/error.service';

@Component({
  selector: 'app-asociacion-recursos',
  templateUrl: './asociacion-recursos.component.html',
  styleUrls: ['./asociacion-recursos.component.scss']
})
export class AsociacionRecursosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateAsociacionRecurso') templateAsociacionRecurso: TemplateMantenimientoDetalleComponent;
  @ViewChild('recursoSelect') recursoSelect: NgSelectComponent;
  @ViewChild('accionSelect') accionSelect: NgSelectComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @Input() type: Type;
  menu: Menu = {
    idMenu: 0,
    descripcionMenu: '',
    idSistema: 0,
    descripcionSistema: ''
  };
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  form: FormGroup;
  gridOptions: GridOptions;
  gridApi: GridApi;
  mdConfirmOpts: MdConfirmOpts;
  private gridColumnApi;
  templateHtmlMsg: string;

  acciones: Accion[] = [];
  recursos: RecursoSeg[] = [];

  constructor(private store: Store<AppState>, private toastr: ToastrService,
    private menuRecursoFacade: MenuRecursoFacade, private errorService: ErrorService) { }

  ngOnInit() {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar el recurso <strong>[recurso]</strong> del menú
      <strong>[menu]</strong> en el sistema <strong>[sistema]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.form = new FormGroup({
      'idSistema': new FormControl(),
      'idMenu': new FormControl(),
      'idRecurso': new FormControl(),
      'idsAccionesPermitidas': new FormControl()
    });
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idRecurso;
      },
      sideBar: false,
      domLayout: "autoHeight", //El alto de la tabla se renderiza en funcion a la cantidad de filas
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      }
    }
    this.store.select('acciones').pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => this.acciones = state.data);
    this.store.select('recursos').pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => this.recursos = state.data);
  }

  ngAfterViewInit() {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.manageState();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState() {
    this.store.select('menuRecursos').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudDetailState(state, this.form, this.templateAsociacionRecurso,
        this.mdConfirmOpts, this.mdDelete, this.toastr, this.errorService,
        () => {
          if (this.menu) {
            this.templateAsociacionRecurso.prepareForRegister();
            this.onClickRegister();
          }
        },
        () => {
          if (this.menu) updateGrid(this.gridOptions, state.data, this.gridColumnApi, false, true);
        });
    });
  }

  onClickRegister() {
    resetForm(this.form, { idMenu: this.menu.idMenu, idSistema: this.menu.idSistema });
    enableControls(this.form, true, 'idRecurso');
  }

  show(menu) {
    this.menu = menu;
    this.menuRecursoFacade.buscarPorSistemaMenu(this.menu.idSistema, this.menu.idMenu);
    this.templateAsociacionRecurso.show(menu);
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: 'Recurso',
        field: 'idRecurso',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        tooltipValueGetter: (params) => {
          return params.data.descripcionRecurso;
        },
        sort: 'asc'
      },
      {
        headerName: 'Acciones Permitidas',
        field: "accionesPermitidas",
        valueGetter: (params) => {
          return extractSimpleArrayFromObjArray(params.data.accionesPermitidas, 'idAccion');
        },
        cellRenderer: (params) => {
          let result: string = "";
          params.data.accionesPermitidas.forEach((a: Accion) => {
            result += a.idAccion + " - " + a.descripcionAccion + " "
          })
          return result;
        },
        tooltipValueGetter: (params) => {
          let result: string = "";
          params.data.accionesPermitidas.forEach((a: Accion) => {
            result += a.descripcionAccion + ", "
          })
          return result;
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
      },
      {
        headerName: 'Acción',
        cellRendererFramework: ButtonsCellRendererComponent,
        cellRendererParams: {
          edit: {
            visible: this.templateAsociacionRecurso.permisoActualizacion,
            action: this.onClickUpdate.bind(this)
          },
          delete: {
            visible: this.templateAsociacionRecurso.permisoEliminacion,
            action: this.showMdDeleteAsociacion.bind(this)
          }
        },
        filter: false,
        sortable: false
      }
    ];
  }

  onChangeRecurso(item?: RecursoSeg) {
    this.store.dispatch(new ResetAccion());
    if (this.accionSelect) this.accionSelect.clearModel();
    if (item !== undefined) {
      let idCategoriaRecurso = item.idCategoriaRecurso ? item.idCategoriaRecurso : filterObjArray(this.recursos,'idRecurso',
        item.idRecurso).idCategoriaRecurso;
      this.store.dispatch(new GetAccionesByCatRecurso(idCategoriaRecurso));
    }
  }

  onClickUpdate(params) {
    let data: MenuRecurso = params.node.data;
    data.idsAccionesPermitidas = extractSimpleArrayFromObjArray(data.accionesPermitidas, 'idAccion');
    this.onChangeRecurso({ idRecurso: data.idRecurso });
    resetForm(this.form, data);
    enableControls(this.form, false, 'idRecurso');
    this.templateAsociacionRecurso.prepareForUpdate();
  }

  save() {
    const action = this.templateAsociacionRecurso.action;
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO:
        this.menuRecursoFacade.registrar(this.form.getRawValue());
        break;
      case RESOURCE_ACTIONS.ACTUALIZACION:
        this.menuRecursoFacade.actualizar(this.form.getRawValue());
        break;
    }
  }

  showMdDeleteAsociacion(params) {
    let data: MenuRecurso = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[recurso\]/g, data.descripcionRecurso)
      .replace(/\[menu\]/g, this.menu.descripcionMenu)
      .replace(/\[sistema\]/g, this.menu.descripcionSistema);
    this.mdDelete.show(data);
  }

  eliminarAsociacionRecurso() {
    this.menuRecursoFacade.eliminar(this.mdDelete.data);
  }

}
