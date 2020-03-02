import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { PerfilUsuarioFacade } from '../../../facade';
import { AppState } from '../../../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Type, TYPES, joinWords, DEFAULT_SEPARATOR, configFormMd, commonConfigTablaMantenimiento, manageCrudState, updateGrid, enableControls, RESOURCE_ACTIONS, renderYesNoLabel } from '../../../../shared/utils';
import { TemplateMantenimientoComponent, ConfirmModalComponent, FormModalComponent, MdConfirmOpts, MdFormOpts, ButtonsCellRendererComponent, ObSwitchFilterGridComponent } from '../../../../shared';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { ErrorService } from '../../../../shared/services/errors/error.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('template') template: TemplateMantenimientoComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @ViewChild('mdSave') mdSave: FormModalComponent;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  type: Type;
  detailType: Type;
  mdConfirmOpts: MdConfirmOpts;
  mdRegisterOpts: MdFormOpts;
  mdUpdateOpts: MdFormOpts;
  mdFormOpts: MdFormOpts;
  form: FormGroup;
  gridOptions: GridOptions;
  gridApi: GridApi;
  private gridColumnApi;
  templateHtmlMsg: string;
  registrando: boolean = false;
  perfiles: any[] = [];
  usuarios: any[] = [];

  constructor(
    private store: Store<AppState>,
    private perfilUsuarioFacade: PerfilUsuarioFacade,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) {
    this.type = TYPES.PERFIL_USUARIO;
  }

  ngOnInit() {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar el Perfil Usuario <strong>[obj]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.form = new FormGroup({
      'idPerfilUsuario': new FormControl(''),
      'idPerfil': new FormControl('', [Validators.required]),
      'usuario': new FormControl('', [Validators.required])
    })
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return `${data.idPerfilUsuario}`;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
      }
    }
  }

  ngAfterViewInit() {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.perfilUsuarioFacade.buscarTodos();
    this.manageState();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState() {
    this.store.select('perfilUsuario').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete, this.toastr,
        this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi, false, true);
        }, () => {
          if(state.action === RESOURCE_ACTIONS.ACTUALIZACION){
            
          }
        });
    });
    this.perfilUsuarioFacade.buscarPerfiles().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.perfiles = data;
    });
    this.perfilUsuarioFacade.buscarUsuarios().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.usuarios = data;
    });
  }

  showMdRegister() {
    this.registrando = false;
    this.mdFormOpts = this.mdRegisterOpts;
    enableControls(this.form, false, 'idPerfilUsuario');
    this.mdSave.show({}, RESOURCE_ACTIONS.REGISTRO);
  }

  showMdUpdate(params) {
    this.registrando = true;
    let data: any = params.node.data;
    this.mdFormOpts = this.mdUpdateOpts;
    enableControls(this.form, false, 'idPerfilUsuario');
    this.mdSave.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params) {
    let data: any = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg
      .replace(/\[obj\]/gi,data.idPerfilUsuario)
    this.mdDelete.show(data);
  }

  save() {
    const action = this.mdSave.action;
    const formValue = this.form.getRawValue();
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO:
        this.perfilUsuarioFacade.registrar(formValue);
        break;
      case RESOURCE_ACTIONS.ACTUALIZACION:
        this.perfilUsuarioFacade.actualizar(formValue);
        break;
    }
  }

  actualizarPerfil(){
    this.perfilUsuarioFacade.actualizar(this.form.getRawValue());
  }

  eliminarPerfil() {
    this.perfilUsuarioFacade.eliminar(this.mdDelete.data);
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Id",
        field: "idPerfilUsuario",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        sort: 'asc'
      },
      {
        headerName: "Perfil",
        field: "idPerfil",
        valueGetter: (params) => {
          return !params.data ? '' : joinWords(DEFAULT_SEPARATOR, params.data.idPerfil, params.data.descripcionPerfil);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
      },
      {
        headerName: "Usuario",
        field: 'usuario',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Nombre",
        field: 'nombres',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Apellidos",
        field: 'apellidos',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: 'Acción',
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

