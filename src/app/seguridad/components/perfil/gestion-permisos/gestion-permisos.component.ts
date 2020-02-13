import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalComponent } from '../../../../shared';
import { Perfil, PerfilMenuRecursoNodo, CategoriaRecursoAsignacion, Accion } from '../../../models';
import { DefKeysTree, ObTreeComponent } from '../../../../shared/components/ob-tree/ob-tree.component';
import { Subject } from 'rxjs';
import { PerfilMenuRecursoFacade } from '../../../facade';
import { AppState } from '../../../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { takeUntil, take } from 'rxjs/operators';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { commonConfigTablaMantenimiento, updateGrid, autoSizeColumns, RESOURCE_ACTIONS } from '../../../../shared/utils';
import { GetAllAsignacionPermisosGrilla } from '../../../../shared/store/actions/seguridad/asignacion-permisos-grilla.actions';
import { TabPane } from '../../../../shared/utils/tab-pane';
import { ObCheckboxCellComponent, ObCheckboxCellParams } from '../../../../shared/components/ag-grid/checkbox-cell/checkbox-cell.component';
import { ToastrService } from 'ngx-toastr';
import { ResetPerfilMenuRecurso } from '../../../../shared/store/actions/seguridad/asignacion-permisos.actions';
import { ErrorService } from '../../../../shared/services/errors/error.service';

@Component({
  selector: 'app-gestion-permisos',
  templateUrl: './gestion-permisos.component.html',
  styleUrls: ['./gestion-permisos.component.scss']
})
export class GestionPermisosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mdPermisos') mdPermisos: ModalComponent;
  @ViewChild('menuArbol') menuArbol: ObTreeComponent;
  @Input() permisoRegistro: boolean = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  perfil: Perfil = {
    idPerfil: null,
    descripcionPerfil: '',
    idSistema: null,
    visualizaPAN: false
  };

  defKeysTree: DefKeysTree = {
    id: 'idMenu',
    name: 'descripcionMenu',
    children: 'subPerfilMenuRecursoArbolAsignacionResponse'
  }
  nodeItems: PerfilMenuRecursoNodo[] = [];
  categoriasRecursos: CategoriaRecursoAsignacion[] = [];
  menuSeleccionado: PerfilMenuRecursoNodo = null;
  tabs = [];
  gridOptions: GridOptions;
  gridApi: GridApi;
  private gridColumnApi;
  categoriaRecursoSeleccionada: CategoriaRecursoAsignacion = null;
  saveAndClose: boolean = false;
  menuAnteriorSeleccionado = null;
  disableBtnAsignar: boolean = false;
  checkAll: boolean = false;
  loading: boolean = false;

  constructor(private store: Store<AppState>, private toastrService: ToastrService,
    private perfilMenuRecursoFacade: PerfilMenuRecursoFacade, private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.gridOptions = this.getGridOptions();
  }

  getGridOptions(): GridOptions {
    return {
      ...commonConfigTablaMantenimiento,
      defaultColDef: {
        filter: false
      },
      sideBar: false,
      columnDefs: [],
      floatingFilter: false,
      getRowNodeId: (data) => {
        return `${data.idRecurso}`;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
        this.store.select('asignacionPermisosGrilla').pipe(take(1))
          .subscribe(state => {
            this.actualizarGrilla(state);
          });
      }
    }
  }

  ngAfterViewInit() {
    this.manageState();
  }

  manageState() {
    this.store.select('asignacionPermisos', 'data').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.nodeItems = data.length === 0 ? [] : JSON.parse(JSON.stringify(data[0].subPerfilMenuRecursoArbolAsignacionResponse));
        this.menuArbol.updateTree(this.nodeItems);

      });
    this.store.select('asignacionPermisos').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(state => {
        if (state.action === RESOURCE_ACTIONS.REGISTRO) {
          if (state.loading) this.disableBtnAsignar = true;
          if (state.done) {
            this.disableBtnAsignar = false;
            if (this.saveAndClose) {
              this.mdPermisos.hide();
            }
            this.toastrService.success(state.doneMessage, 'Registro');
          }
          if (state.failed) {
            this.errorService.handleServerSideFormError(state.errors);
            this.disableBtnAsignar = false;
          }
        }
        if(state.action === RESOURCE_ACTIONS.CONSULTA){
          this.loading = state.loading;
          this.disableBtnAsignar = state.loading;
        }
      });
    this.store.select('asignacionPermisosGrilla').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(state => {
        if (this.categoriaRecursoSeleccionada) {
          this.categoriaRecursoSeleccionada.recursos = state.data;
          let anyNoCheck = false;
          for (let recurso of this.categoriaRecursoSeleccionada.recursos) {
            anyNoCheck = Object.keys(recurso)
              .filter(k => k.match(/^[0-9]/g))
              .filter(k => recurso[k]['visible'] && !recurso[k]['value'])
              .length > 0 ? true : false;
            if (anyNoCheck) {
              break;
            }
          }
          this.checkAll = !anyNoCheck;
        }
        this.actualizarGrilla(state);
      });
  }

  actualizarGrilla(state) {
    if (this.categoriaRecursoSeleccionada && this.gridApi) {
      updateGrid(this.gridOptions, []);
      this.gridApi.setColumnDefs(this.getColumnDefs(state.accionesPermitidas));
      updateGrid(this.gridOptions, state.data, this.gridColumnApi);
      setTimeout(() => {
        autoSizeColumns(this.gridColumnApi);
      }, 50);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  show(perfil: Perfil) {
    this.perfil = perfil;
    this.perfilMenuRecursoFacade.buscarArbolAsignaciones(perfil.idSistema, perfil.idPerfil);
    this.menuSeleccionado = null;
    this.categoriasRecursos = [];
    this.categoriaRecursoSeleccionada = null;
    this.mdPermisos.show();
  }

  selectItem(item) {
    this.menuAnteriorSeleccionado = { ...this.menuSeleccionado };
    this.menuSeleccionado = item;
    this.categoriasRecursos = item.categoriasRecursos;
    this.tabs = this.formatCategoriasToTabs(this.categoriasRecursos);
    if (this.tabs.length > 0) {
      if (!this.gridOptions) this.gridOptions = this.getGridOptions();
      this.categoriaRecursoSeleccionada = this.tabs[0].item;
      this.actualizarAsignacion(this.menuAnteriorSeleccionado);
      this.store.dispatch(new GetAllAsignacionPermisosGrilla(this.categoriaRecursoSeleccionada));
    } else {
      this.gridApi = null;
    }
  }

  formatCategoriasToTabs(categoriasRecursos: CategoriaRecursoAsignacion[]): TabPane[] {
    let tabs: TabPane[] = [];
    categoriasRecursos.forEach((item) => {
      tabs.push({
        tituloTabPane: item.descripcionCategoriaRecurso,
        tituloId: String(item.idCategoriaRecurso),
        item: item,
        divContenidoPane: 'grillaContent'
      })
    });
    return tabs;
  }

  onSelectTab(tab) {
    this.categoriaRecursoSeleccionada = tab.item;
    this.actualizarAsignacion(this.menuSeleccionado);
    this.store.dispatch(new GetAllAsignacionPermisosGrilla(this.categoriaRecursoSeleccionada));
  }

  getColumnDefs(accionesPermitidas: Accion[]): ColDef[] {
    if (!accionesPermitidas) return [];
    let cols: ColDef[] = [];
    cols.push({
      headerName: 'Recurso',
      field: 'descripcionRecurso'
    });
    accionesPermitidas.forEach(accion => {
      cols.push({
        headerName: accion.descripcionAccion,
        field: String(accion.idAccion),
        valueGetter: (params) => {
          return `${params.data[String(accion.idAccion)]['value']}`;
        },
        cellRendererFramework: ObCheckboxCellComponent,
        cellRendererParams: {
          disabled: !this.permisoRegistro,
          visibleFn: this.isVisibleAction.bind(this),
          onChangeFn: this.onChangeCheck.bind(this)
        }
      })
    })
    return cols;
  }

  isVisibleAction(params: ObCheckboxCellParams){
    return params.node.data[params.colDef.field]['visible'];
  }

  onChangeCheck(params: ObCheckboxCellParams, value: boolean){
    params.node.data[params.colDef.field]['value'] = value;
  }

  onHide() {
    this.menuSeleccionado = null;
    this.categoriasRecursos = [];
    this.categoriaRecursoSeleccionada = null;
    this.gridApi = null;
    this.nodeItems = [];
    this.store.dispatch(new ResetPerfilMenuRecurso());
  }

  onClickAsignar() {
    this.saveAndClose = false;
    this.registrar();
  }

  onClickAsignarCerrar() {
    this.saveAndClose = true;
    this.registrar();
  }

  registrar() {
    this.actualizarAsignacion(this.menuSeleccionado);
    let data = this.perfilMenuRecursoFacade.obtenerPostBody(this.perfil.idSistema, this.perfil.idPerfil, this.nodeItems);
    if (data.length === 0) {
      this.toastrService.warning('Debe seleccionar al menos un permiso', 'Aviso');
      return;
    }
    this.perfilMenuRecursoFacade.registrar(this.perfil.idSistema, this.perfil.idPerfil, data);
  }

  actualizarAsignacion(menu: PerfilMenuRecursoNodo) {
    if (!menu || Object.keys(menu).length === 0) return;
    menu.categoriasRecursos.forEach(categoria => {
      categoria.recursos.forEach(recurso => {
        let acciones: number[] = [];
        Object.keys(recurso)
          .filter(k => k.match(/^[0-9]/g))
          .forEach(k => {
            if (recurso[k]['visible'] && recurso[k]['value']) acciones.push(Number(k));
          });
        recurso.idsAccionesAsignadas = acciones;
      })
    })
  }

  onChangeCheckAll(event) {
    this.categoriaRecursoSeleccionada.recursos.forEach(recurso => {
      let acciones: number[] = [];
      Object.keys(recurso)
        .filter(k => k.match(/^[0-9]/g))
        .forEach(k => {
          if (recurso[k]['visible']) {
            recurso[k]['value'] = event;
            acciones.push(Number(k));
          }
        });
      recurso.idsAccionesAsignadas = event ? acciones : [];
    })
    this.store.dispatch(new GetAllAsignacionPermisosGrilla(this.categoriaRecursoSeleccionada));
  }

}
