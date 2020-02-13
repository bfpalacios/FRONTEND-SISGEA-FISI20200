import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { TemplateMantenimientoDetalleComponent } from '../../../../shared/components/template-mantenimiento-detalle/template-mantenimiento-detalle.component';
//import { Usuario } from '../../../../reportes/admin/models';
import { Type, commonConfigTablaMantenimiento, DEFAULT_SEPARATOR, joinWords, updateGrid, manageCrudDetailState, configFormMd, renderYesNoLabel, enableControls, resetForm, setValueControls, OB_VALIDATORS, RESOURCE_ACTIONS, filterObjArray } from '../../../../shared/utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { MdConfirmOpts, ButtonsCellRendererComponent, ConfirmModalComponent, ObSwitchFilterGridComponent } from '../../../../shared';
import { AppState } from '../../../../shared/store/app.reducers';
import { UsuarioPerfilFacade } from '../../../facade';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../shared/services/errors/error.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Sistema, Perfil, UsuarioPerfil } from '../../../models';
import { ResetPerfilSeg, GetPerfilBySistema } from '../../../../shared/store/actions/seguridad/perfil.actions';
import { NgSelectComponent } from '@ng-select/ng-select';
import { GetSistemaEsAutLocal } from '../../../../shared/store/actions/seguridad/sistema.actions';
import { ResetUsuarioPerfil } from '../../../../shared/store/actions/seguridad/usuario-perfil.actions';

@Component({
  selector: 'gestion-cuenta',
  templateUrl: './gestion-cuenta.component.html',
  styleUrls: ['./gestion-cuenta.component.scss']
})
export class GestionCuentaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateUsuarioPerfil') templateUsuarioPerfil: TemplateMantenimientoDetalleComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @ViewChild('perfilSelect') perfilSelect: NgSelectComponent;
  @Input() type: Type;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  form: FormGroup;
  gridOptions: GridOptions;
  gridApi: GridApi;
  mdConfirmOpts: MdConfirmOpts;
  private gridColumnApi;
  templateHtmlMsg: string;

  usuario: any;
  sistemas: Sistema[] = [];
  perfiles: Perfil[] = [];

  controlsPass: string[] = ['contrasenia', 'confirmaContrasenia'];

  constructor(private store: Store<AppState>,
    private usuarioPerfilFacade: UsuarioPerfilFacade,
    private toastr: ToastrService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar el perfil <strong>[perfil]</strong> del usuario
      <strong>[usuario]</strong> en el sistema <strong>[sistema]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.form = new FormGroup({
      'idUsuarioPerfil': new FormControl(''),
      'username': new FormControl(''),
      'idSistema': new FormControl('', [Validators.required]),
      'idPerfil': new FormControl('', [Validators.required]),
      'contrasenia': new FormControl(''),
      'confirmaContrasenia': new FormControl(''),
      'activo': new FormControl(false),
      'visualizaPAN': new FormControl(false)
    });
    this.form.get('confirmaContrasenia').setValidators([OB_VALIDATORS.equalsToField('contrasenia', 'Contraseña')]);
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return `${data.idSistema}|${data.idPerfil}`;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      }
    }
    enableControls(this.form, false, 'username');
    this.usuarioPerfilFacade.initData();
    this.store.select('sistema').pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => {
      this.sistemas = state.data;
      enableControls(this.form, state.autLocal ? state.autLocal.data : false, ...this.controlsPass);
      if (state.autLocal && !state.autLocal.data) setValueControls(this.form, { contrasenia: null, confirmaContrasenia: null });
    });
    this.store.select('perfilesSeg').pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => {
      this.perfiles = state.data;
      let valueForm: any = this.form.getRawValue();
      if(valueForm.idSistema !== null && valueForm.idPerfil !== null ){
        this.onChangePerfil({ idSistema: valueForm.idSistema, idPerfil: valueForm.idPerfil });
      }
    });
    this.store.dispatch(new ResetUsuarioPerfil());
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
    this.store.select('usuariosPerfilesSeg').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudDetailState(state, this.form, this.templateUsuarioPerfil,
        this.mdConfirmOpts, this.mdDelete, this.toastr, this.errorService,
        () => {
          if (this.usuario) {
            this.templateUsuarioPerfil.prepareForRegister();
            this.onClickRegister();
          }
        },
        () => {
          if (this.usuario) updateGrid(this.gridOptions, state.data, this.gridColumnApi);
          setTimeout(() => {
            this.gridOptions.api.sizeColumnsToFit();
          }, 100);
        });
    });
  }

  show(usuario: any) {
    this.usuario = usuario;
    this.usuarioPerfilFacade.buscarPorUsuario(usuario.username);
    enableControls(this.form, false, ...this.controlsPass);
    this.templateUsuarioPerfil.show({ username: this.usuario.username });
  }

  onClickRegister() {
    resetForm(this.form, { username: this.usuario.username });
    this.form.get('contrasenia').setValidators([Validators.required]);
    this.form.get('confirmaContrasenia').setValidators([Validators.required,
    OB_VALIDATORS.equalsToField('contrasenia', 'Contraseña')]);
    enableControls(this.form, true, 'visualizaPAN');
  }

  onClickUpdate(params) {
    let data: UsuarioPerfil = params.node.data;
    this.onChangeSistema({ idSistema: data.idSistema });
    resetForm(this.form, data);
    this.form.get('contrasenia').clearValidators();
    this.form.get('confirmaContrasenia').setValidators([OB_VALIDATORS.equalsToField('contrasenia', 'Contraseña')]);
    this.templateUsuarioPerfil.prepareForUpdate();
  }

  showMdDelete(params) {
    let data: UsuarioPerfil = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[perfil\]/g, data.descripcionPerfil)
      .replace(/\[sistema\]/g, data.descripcionSistema).replace(/\[usuario\]/g, this.usuario.username);
    this.mdDelete.show(data);
  }

  save() {
    const action = this.templateUsuarioPerfil.action;
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO:
        this.usuarioPerfilFacade.registrar(this.form.getRawValue());
        break;
      case RESOURCE_ACTIONS.ACTUALIZACION:

        this.usuarioPerfilFacade.actualizar(this.form.getRawValue());
        break;
    }
  }

  eliminarUsuarioPerfil() {
    this.usuarioPerfilFacade.eliminar(this.mdDelete.data);
  }

  onChangeSistema(item: Sistema) {
    this.store.dispatch(new ResetPerfilSeg());
    if (this.perfilSelect) this.perfilSelect.clearModel();
    if (item !== undefined) {
      this.store.dispatch(new GetPerfilBySistema(item.idSistema));
      this.store.dispatch(new GetSistemaEsAutLocal(item.idSistema));
    }
  }

  onChangePerfil(item: Perfil) {
    if (item !== undefined) {
      let perfilesSeg = this.perfiles.filter(i => i.idSistema === item.idSistema && i.idPerfil === item.idPerfil);
      if (perfilesSeg.length > 0) {
        let visualizaPAN = perfilesSeg[0].visualizaPAN;
        enableControls(this.form, visualizaPAN, 'visualizaPAN');
        if(!visualizaPAN){
          setValueControls(this.form, { visualizaPAN: false });
        }
      }
    }
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Sistema",
        field: "idSistema",
        cellRenderer: (params) => {
          return joinWords(DEFAULT_SEPARATOR, params.data.idSistema, params.data.descripcionSistema);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Perfil",
        field: "idPerfil",
        cellRenderer: (params) => {
          return joinWords(DEFAULT_SEPARATOR, params.data.idPerfil, params.data.descripcionPerfil);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Activo",
        cellClass: 'text-center',
        field: "activo",
        filter: false,
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value);
        }
      },
      {
        headerName: "Visualiza PAN",
        cellClass: 'text-center',
        field: "visualizaPAN",
        filter: false,
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value);
        }
      },
      {
        headerName: 'Acción',
        cellRendererFramework: ButtonsCellRendererComponent,
        cellClass: 'text-center',
        cellRendererParams: {
          edit: {
            visible: this.templateUsuarioPerfil.permisoActualizacion,
            action: this.onClickUpdate.bind(this)
          },
          delete: {
            visible: this.templateUsuarioPerfil.permisoEliminacion,
            action: this.showMdDelete.bind(this)
          }
        },
        filter: false,
        sortable: false
      }
    ]
  }

}
