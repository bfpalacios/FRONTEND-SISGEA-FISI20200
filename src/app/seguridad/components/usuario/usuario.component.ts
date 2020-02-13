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
  enableControls,
  manageCrudState,
  RESOURCE_ACTIONS,
  Type,
  TYPES,
  updateGrid
} from "../../../shared/utils";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GridOptions, ColDef } from "ag-grid-community";
import { UsuarioSeg } from "../../models";
import { UsuarioFacade } from "../../facade";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import { AppState } from "../../../shared/store/app.reducers";
import { ErrorService } from "../../../shared/services/errors/error.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { Usuario } from '../../../reportes/admin/models';
import { GestionCuentaComponent } from './gestion-cuenta/gestion-cuenta.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateUsuario') template: TemplateMantenimientoComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @ViewChild('mdSave') mdSave: FormModalComponent;
  @ViewChild('gestionCuenta') gestionCuenta: GestionCuentaComponent;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  mdConfirmOpts: MdConfirmOpts;
  mdRegisterOpts: MdFormOpts;
  mdUpdateOpts: MdFormOpts;
  mdFormOpts: MdFormOpts;
  type: Type;
  form: FormGroup;
  gridApi;
  private gridColumnApi;
  gridOptions: GridOptions;
  templateHtmlMsg: string;

  initUsuario: UsuarioSeg = {
    username: '',
    nombres: '',
    apellidos: ''
  };

  detailType: Type;

  constructor(private usuarioFacade: UsuarioFacade, private toastr: ToastrService, private store: Store<AppState>,
    private errorService: ErrorService) {
    this.type = TYPES.USUARIOSEG;
    this.detailType = TYPES.CTA_USUARIO;
  }

  ngOnInit(): void {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar el usuario <strong>[codigo]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.form = new FormGroup(
      {
        'username': new FormControl('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(20)]),
        'nombres': new FormControl('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(50)]),
        'apellidos': new FormControl('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(50)])
      });
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.username;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      }
    };
  }

  ngAfterViewInit(): void {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.usuarioFacade.buscarTodos();
    this.manageState();
  }

  ngOnDestroy() {
    //console.log('destroy usua')
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState(): void {
    this.store.select('usuariosSeg').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete,
        this.toastr, this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi, false, true);
        });
    });
  }

  showMdRegister(): void {
    this.mdFormOpts = this.mdRegisterOpts;
    enableControls(this.form, true, 'username');
    this.mdSave.show(this.initUsuario, RESOURCE_ACTIONS.REGISTRO);
  }

  showMdUpdate(params): void {
    let data: UsuarioSeg = params.node.data;
    this.mdFormOpts = this.mdUpdateOpts;
    enableControls(this.form, false, 'username');
    this.mdSave.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params): void {
    let data: UsuarioSeg = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[codigo]/gi, data.username);
    this.mdDelete.show(data);
  }

  save(): void {
    const action = this.mdSave.action;
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO: {
        this.usuarioFacade.registrar(this.form.getRawValue());
        break;
      }
      case RESOURCE_ACTIONS.ACTUALIZACION: {
        this.usuarioFacade.actualizar(this.form.getRawValue());
        break;
      }
    }
  }

  eliminarUsuario(): void {
    this.usuarioFacade.eliminar(this.mdDelete.data);
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Username",
        field: "username",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        sort: 'asc'
      },
      {
        headerName: "Nombres",
        field: "nombres",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Apellidos",
        field: "apellidos",
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
          },
          details: [
            {
              visible: this.template.permisoConsultaDetalle,
              icon: 'fa-shield',
              tooltip: 'Mantener cuenta de usuario',
              buttonClass: 'btn-xs btn-success',
              action: this.showMdGestionCuenta.bind(this)
            }
          ]
        },
        filter: false,
        sortable: false
      }
    ];
  }

  showMdGestionCuenta(params){
    let data: any = params.data;
    this.gestionCuenta.show(data);
  }
}
