import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  ButtonsCellRendererComponent,
  ConfirmModalComponent,
  FormModalComponent,
  MdConfirmOpts,
  MdFormOpts,
  ObSwitchFilterGridComponent,
  TemplateMantenimientoComponent
} from "../../../shared/components";
import {
  autoSizeColumns,
  commonConfigTablaMantenimiento,
  configFormMd,
  DEFAULT_SEPARATOR,
  enableControls,
  joinWords,
  manageCrudState,
  renderYesNoLabel,
  RESOURCE_ACTIONS,
  Type,
  TYPES,
  updateGrid
} from "../../../shared/utils";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GridOptions, ColDef } from "ag-grid-community";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import { AppState } from "../../../shared/store/app.reducers";
import { ErrorService } from "../../../shared/services/errors/error.service";
import { TipoAutenticacionFacade } from "../../facade";
import { TipoAutenticacion } from "../../models";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tipo-autenticacion',
  templateUrl: './tipo-autenticacion.component.html',
  styleUrls: ['./tipo-autenticacion.component.scss']
})
export class TipoAutenticacionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateTipoAutenticacion') template: TemplateMantenimientoComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @ViewChild('mdSave') mdSave: FormModalComponent;
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

  constructor(private tipoAutenticacionFacade: TipoAutenticacionFacade, private toastr: ToastrService,
    private store: Store<AppState>, private errorService: ErrorService) {
    this.type = TYPES.TIPO_AUTENTICACION;
  }

  ngOnInit(): void {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar el tipo de autenticación <strong>[codigo]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.form = new FormGroup(
      {
        'idTipoAutenticacion': new FormControl('', [Validators.required, Validators.min(1),
        Validators.max(9)]),
        'descripcionTipoAutenticacion': new FormControl('', [Validators.required, Validators.minLength(
          1), Validators.maxLength(20)]),
        'servicioAutenticacion': new FormControl('',
          [Validators.required, Validators.minLength(1), Validators.maxLength(
            70)]),
        'autenticacionLocal': new FormControl(false),
        'ldapURL': new FormControl('', [Validators.required, Validators.minLength(1)
          , Validators.maxLength(50)]),
        'ldapDominio': new FormControl('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(50)]),
        'ldapNivelSeguridad': new FormControl('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(20)]),
        'ldapClaseFactory': new FormControl('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(50)])
      });
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idTipoAutenticacion;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        autoSizeColumns(this.gridColumnApi);
      }
    };
  }

  esAutenticacionLocal(): boolean {
    return this.form.get('autenticacionLocal').value;
  }

  ngAfterViewInit(): void {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.tipoAutenticacionFacade.buscarTodos();
    this.manageState();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState(): void {
    this.store.select('tiposAutenticacion').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete,
        this.toastr, this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi);
        });
    });
  }

  showMdRegister(): void {
    this.mdFormOpts = this.mdRegisterOpts;
    enableControls(this.form, true, 'idTipoAutenticacion');
    this.mdSave.show({}, RESOURCE_ACTIONS.REGISTRO);
  }

  showMdUpdate(params): void {
    let data: TipoAutenticacion = params.node.data;
    this.mdFormOpts = this.mdUpdateOpts;
    enableControls(this.form, false, 'idTipoAutenticacion');
    this.mdSave.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params): void {
    let data: TipoAutenticacion = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[codigo]/gi, joinWords(DEFAULT_SEPARATOR,
      data.idTipoAutenticacion, data.descripcionTipoAutenticacion));
    this.mdDelete.show(data);
  }

  save(): void {
    const action = this.mdSave.action;
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO: {
        this.tipoAutenticacionFacade.registrar(this.form.getRawValue());
        break;
      }
      case RESOURCE_ACTIONS.ACTUALIZACION: {
        this.tipoAutenticacionFacade.actualizar(this.form.getRawValue());
        break;
      }
    }
  }

  eliminarTipoAutenticacion(): void {
    this.tipoAutenticacionFacade.eliminar(this.mdDelete.data);
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Id Tipo Autenticación",
        field: "idTipoAutenticacion",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
      },
      {
        headerName: "Descripción",
        field: "descripcionTipoAutenticacion",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Servicio Autenticación",
        field: "servicioAutenticacion",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Autenticación Local",
        field: "autenticacionLocal",
        cellClass: 'text-center',
        filter: 'agTextColumnFilter',
        floatingFilterComponentFramework: ObSwitchFilterGridComponent,
        floatingFilterComponentParams: {
          yesOption: 'true',
          noOption: 'false',
          suppressFilterButton: true
        },
        cellRenderer: (params) => {
          return renderYesNoLabel(params.value);
        }
      },
      {
        headerName: "URL LDAP",
        field: "ldapURL",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Dominio LDAP",
        field: "ldapDominio",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Nivel Seguridad LDAP",
        field: "ldapNivelSeguridad",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Clase Factory LDAP",
        field: "ldapClaseFactory",
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
