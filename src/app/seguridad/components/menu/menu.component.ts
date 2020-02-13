import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuFacade } from '../../facade';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../shared/services/errors/error.service';
import { TYPES, Type, configFormMd, commonConfigTablaMantenimiento, autoSizeColumns, manageCrudState, updateGrid, joinWords, DEFAULT_SEPARATOR, RESOURCE_ACTIONS, enableControls, setValueControls, filterObjArray } from '../../../shared/utils';
import { AppState } from '../../../shared/store/app.reducers';
import { TemplateMantenimientoComponent, ConfirmModalComponent, FormModalComponent, MdConfirmOpts, MdFormOpts, ButtonsCellRendererComponent, ModalComponent } from '../../../shared';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridApi, GridOptions, ColDef } from 'ag-grid-community';
import { takeUntil } from 'rxjs/operators';
import { Sistema, Menu, TipoMenu, TIPO_MENU, Accion, MenuRecurso } from '../../models';
import { NgSelectComponent } from '@ng-select/ng-select';
import { VistaArbolComponent } from './vista-arbol/vista-arbol.component';
import { AsociacionRecursosComponent } from './asociacion-recursos/asociacion-recursos.component';
import { ResetMenuRecurso } from '../../../shared/store/actions/seguridad/menu-recurso.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateMenu') template: TemplateMantenimientoComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @ViewChild('mdSave') mdSave: FormModalComponent;
  @ViewChild('menuPadreSelect') menuPadreSelect: NgSelectComponent;
  @ViewChild('mdvistaArbol') mdvistaArbol: VistaArbolComponent;
  @ViewChild('mdAsociacionRecurso') mdAsociacionRecurso: AsociacionRecursosComponent;
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

  sistemas: Sistema[] = [];
  currSistema: number;
  tiposMenu: TipoMenu[] = [];
  menusPadre: Menu[] = [];
  menusPadreFiltrado: Menu[] = [];

  menusRecursoSeleccionados: MenuRecurso[] = [];
  mostrarRecursosPermitidos: boolean = false;

  gridApiDetalle: GridApi;
  private gridColumnApiDetalle;
  gridOptionsDetalle: GridOptions;
  detailType: Type;

  constructor(private menuFacade: MenuFacade, private toastr: ToastrService,
    private store: Store<AppState>, private errorService: ErrorService) {
    this.type = TYPES.MENU;
    this.detailType = TYPES.MENU_RECURSO;
  }

  ngOnInit() {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar el menú <strong>[codigo]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = { ...configFormMd.getRegisterMdOpts(this.type), modalClass: 'modal-template-detalle' };
    this.mdUpdateOpts = { ...configFormMd.getUpdateMdOpts(this.type), modalClass: 'modal-template-detalle' };
    this.form = new FormGroup({
      'idMenu': new FormControl('', [Validators.required, Validators.min(0), Validators.max(999)]),
      'descripcionMenu': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      'idSistema': new FormControl('', [Validators.required]),
      'idTipoMenu': new FormControl('', [Validators.required]),
      'icono': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      'url': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      'idMenuPadre': new FormControl('', [Validators.required])
    });
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return `${data.idSistema}|${data.idMenu}`;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        autoSizeColumns(this.gridColumnApi);
      }
    };
    this.menuFacade.initData();
    this.store.select('sistema').pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => {
      this.sistemas = state.data.sort((a, b) => {
        if (a.idSistema > b.idSistema) return 1;
        if (a.idSistema < b.idSistema) return -1;
        return 0;
      });
      if (state.data.length > 0) {
        this.currSistema = this.sistemas[0].idSistema;
        this.menuFacade.buscarPorSistemaVistaSimple(this.currSistema);
      }
    });
    this.store.select('tiposMenu').pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => this.tiposMenu = state.data);

    this.gridOptionsDetalle = {
      ...commonConfigTablaMantenimiento,
      columnDefs: this.initColumnsDefsDetalle(),
      rowData: [],
      getRowNodeId: (data) => {
        return data.idRecurso;
      },
      onGridReady: (params) => {
        this.gridApiDetalle = params.api;
        this.gridColumnApiDetalle = params.columnApi;
        autoSizeColumns(this.gridColumnApiDetalle);
      }
    };
    this.store.select('menus').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      this.menusPadre = [...state.data.filter(m => m.idTipoMenu === TIPO_MENU.RAIZ || m.idTipoMenu === TIPO_MENU.NODO)];
      this.menusPadreFiltrado = [...this.menusPadre];
    });
  }

  ngAfterViewInit() {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.manageState();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState(): void {
    this.store.select('menus').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete,
        this.toastr, this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi, false, true);
        });
    });
  }

  showMdRegister(): void {
    this.mdFormOpts = this.mdRegisterOpts;
    enableControls(this.form, true, 'idMenu', 'idSistema');
    this.menusPadreFiltrado = [...this.menusPadre];
    this.store.dispatch(new ResetMenuRecurso());
    this.mdSave.show({ idSistema: this.currSistema }, RESOURCE_ACTIONS.REGISTRO);
    this.mostrarRecursosPermitidos = false;
  }

  showMdUpdate(params): void {
    let data: Menu = params.node.data;
    this.menusPadreFiltrado = [...this.menusPadre.filter(m => m.idMenu !== data.idMenu)];
    this.mdFormOpts = this.mdUpdateOpts;
    enableControls(this.form, false, 'idMenu', 'idSistema');
    this.onChangeTipoMenu({ idTipoMenu: data.idTipoMenu });
    this.mdSave.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params) {
    let data: Menu = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[codigo]/gi, joinWords(DEFAULT_SEPARATOR,
      data.idMenu, data.descripcionMenu));
    this.mdDelete.show(data);
  }

  save() {
    const formValue = this.form.getRawValue();
    this.menuFacade.guardar(formValue, this.mdSave.action);
  }

  eliminarMenu() {
    this.menuFacade.eliminar(this.mdDelete.data);
  }

  onChangeSistemaSelect(item: Sistema) {
    if (item !== undefined) {
      this.currSistema = item.idSistema;
      this.menuFacade.buscarPorSistemaVistaSimple(item.idSistema);
      this.form.get('idSistema').setValue(item.idSistema);
    }
  }

  onChangeSistemaSelectForm(item: Sistema) {
    this.onChangeSistemaSelect(item);
    this.menuPadreSelect.clearModel();
  }

  onChangeTipoMenu(item: TipoMenu) {
    if (item !== undefined) {
      switch (item.idTipoMenu) {
        case TIPO_MENU.RAIZ:
          enableControls(this.form, false, 'icono', 'url', 'idMenuPadre');
          setValueControls(this.form, { icono: null, url: null, idMenuPadre: null });
          this.mostrarRecursosPermitidos = false;
          break;
        case TIPO_MENU.NODO:
          enableControls(this.form, true, 'icono', 'idMenuPadre');
          enableControls(this.form, false, 'url');
          setValueControls(this.form, { url: null });
          this.mostrarRecursosPermitidos = false;
          break;
        case TIPO_MENU.HOJA:
          enableControls(this.form, true, 'icono', 'url', 'idMenuPadre')
          this.mostrarRecursosPermitidos = true;
          break;
      }
    }
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: 'Id',
        field: 'idMenu',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        sort: 'asc'
      },
      {
        headerName: 'Descripción',
        field: 'descripcionMenu',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
      },
      {
        headerName: 'Sistema',
        field: 'idSistema',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        valueGetter: (params) => {
          return joinWords(DEFAULT_SEPARATOR, params.data.idSistema, params.data.descripcionSistema);
        }
      },
      {
        headerName: 'Menú Padre',
        field: 'idMenuPadre',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        valueGetter: (params) => {
          return joinWords(DEFAULT_SEPARATOR, params.data.idMenuPadre, params.data.descripcionMenuPadre);
        }
      },
      {
        headerName: 'Icono',
        field: 'icono',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        cellRenderer: (params) => {
          if (params.value !== null) {
            const idx = params.value.indexOf('nivel');
            const iClass = idx !== -1 ? params.value.substring(0, idx) : params.value;
            return `<i class="${iClass}"></i> ${params.value}`;
          }
          return '';
        }
      },
      {
        headerName: 'URL',
        field: 'url',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: 'Tipo Menú',
        field: 'idTipoMenu',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        valueGetter: (params) => {
          return joinWords(DEFAULT_SEPARATOR, params.data.idTipoMenu, params.data.descripcionTipoMenu);
        }
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
          },
          details: [
            {
              visible: this.template.permisoConsultaDetalle,
              visibleFn: this.getVisibleFn.bind(this),
              tooltip: 'Asociar recursos',
              buttonClass: 'btn-xs btn-success',
              icon: 'fa-cog',
              action: this.showMdAsocResources.bind(this)
            }
          ]
        },
        filter: false,
        sortable: false
      }
    ]
  }

  getVisibleFn(params) {
    return this.template.permisoConsultaDetalle ? params.data.idTipoMenu === TIPO_MENU.HOJA ? true : false : false;
  }

  initColumnsDefsDetalle(): ColDef[] {
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
        headerName: 'Descripción',
        field: 'descripcionRecurso',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: 'Acciones Permitidas',
        field: "accionesPermitidas",
        valueGetter: (params) => {
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
      }
    ];
  }

  showMdAsocResources(params): void {
    let data: Menu = params.node.data;
    this.mdAsociacionRecurso.show(data);
  }

  onClickVerArbol() {
    let sistema = filterObjArray(this.sistemas, 'idSistema', this.currSistema);
    this.mdvistaArbol.show(sistema);
  }
}
