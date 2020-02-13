import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  ButtonsCellRendererComponent,
  ConfirmModalComponent,
  FormModalComponent,
  MdConfirmOpts,
  MdFormOpts,
  TemplateMantenimientoComponent,
  ObSwitchFilterGridComponent
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
  updateGrid,
  filterObjArray
} from "../../../shared/utils";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GridOptions, ColDef } from "ag-grid-community";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import { AppState } from "../../../shared/store/app.reducers";
import { ErrorService } from "../../../shared/services/errors/error.service";
import { ParametroSeguridadFacade } from "../../facade";
import { ParametroSeguridad, TipoAutenticacion } from "../../models";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-parametro-seguridad',
  templateUrl: './parametro-seguridad.component.html',
  styleUrls: ['./parametro-seguridad.component.scss']
})
export class ParametroSeguridadComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateParametroSeguridad') template: TemplateMantenimientoComponent;
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
  tiposAutenticacion: TipoAutenticacion[];
  private camposPoliticasContrasenia = ['activoPoliticaContrasenia', 'minimoLongitudContrasenia', 'minimoDigitosContrasenia',
    'minimoLetrasContrasenia', 'minimoMinusculasContrasenia', 'minimoMayusculasContrasenia',
    'minimoCarEspecContrasenia'];
  private initCamposPoliticaContraseniaActivo = {
    activoPoliticaContrasenia: true,
    minimoLongitudContrasenia: 3,
    minimoDigitosContrasenia: 0,
    minimoLetrasContrasenia: 0,
    minimoMinusculasContrasenia: 0,
    minimoMayusculasContrasenia: 0,
    minimoCarEspecContrasenia: 0
  };
  private initCamposPoliticaContraseniaInactivo = {
    activoPoliticaContrasenia: false,
    minimoLongitudContrasenia: null,
    minimoDigitosContrasenia: null,
    minimoLetrasContrasenia: null,
    minimoMinusculasContrasenia: null,
    minimoMayusculasContrasenia: null,
    minimoCarEspecContrasenia: null
  };
  private currParamSeg: ParametroSeguridad;

  constructor(private parametroSeguridadFacade: ParametroSeguridadFacade, private toastr: ToastrService,
    private store: Store<AppState>, private errorService: ErrorService) {
    this.type = TYPES.PARAMETRO_SEGURIDAD;
  }

  ngOnInit(): void {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar el parámetro de seguridad <strong>[codigo]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.form = new FormGroup(
      {
        'idParametroSeguridad': new FormControl('', [Validators.required, Validators.min(1),
        Validators.max(9)]),
        'descripcionParamSeg': new FormControl('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(50)]),
        'idTipoAutenticacion': new FormControl('', [Validators.required]),
        'activoPoliticaContrasenia': new FormControl(false),
        'minimoLongitudContrasenia': new FormControl('', [Validators.required, Validators.min(3), Validators.max(40)]),
        'minimoDigitosContrasenia': new FormControl('', [Validators.required, Validators.min(0), Validators.max(40)]),
        'minimoLetrasContrasenia': new FormControl('', [Validators.required, Validators.min(0), Validators.max(40)]),
        'minimoMinusculasContrasenia': new FormControl('', [Validators.required, Validators.min(0), Validators.max(40)]),
        'minimoMayusculasContrasenia': new FormControl('', [Validators.required, Validators.min(0), Validators.max(40)]),
        'minimoCarEspecContrasenia': new FormControl('', [Validators.required, Validators.min(0), Validators.max(40)])
      });
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idParametroSeguridad;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        autoSizeColumns(this.gridColumnApi);
      }
    };
    this.parametroSeguridadFacade.initData();
    this.store.select('tiposAutenticacion').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state) => this.tiposAutenticacion = state.data);
  }

  ngAfterViewInit(): void {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.parametroSeguridadFacade.buscarTodos();
    this.manageState();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState(): void {
    this.store.select('parametrosSeguridad').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete,
        this.toastr, this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi, true, false);
        });
    });
  }

  showMdRegister(): void {
    this.mdFormOpts = this.mdRegisterOpts;
    enableControls(this.form, true, 'idParametroSeguridad');
    enableControls(this.form, false, ...this.camposPoliticasContrasenia);
    this.mdSave.show({}, RESOURCE_ACTIONS.REGISTRO);
  }

  showMdUpdate(params): void {
    this.currParamSeg = { ...params.node.data };
    this.mdFormOpts = this.mdUpdateOpts;
    let tipoAutenticacion = filterObjArray(this.tiposAutenticacion, 'idTipoAutenticacion', this.currParamSeg.idTipoAutenticacion);
    enableControls(this.form, false, 'idParametroSeguridad');
    enableControls(this.form, tipoAutenticacion.autenticacionLocal, ...this.camposPoliticasContrasenia);
    this.mdSave.show(this.currParamSeg, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params): void {
    let data: ParametroSeguridad = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[codigo]/gi, joinWords(DEFAULT_SEPARATOR,
      data.idParametroSeguridad, data.descripcionParamSeg));
    this.mdDelete.show(data);
  }

  save(): void {
    const action = this.mdSave.action;
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO: {
        this.parametroSeguridadFacade.registrar(this.form.getRawValue());
        break;
      }
      case RESOURCE_ACTIONS.ACTUALIZACION: {
        this.parametroSeguridadFacade.actualizar(this.form.getRawValue());
        break;
      }
    }
  }

  eliminarParametroSeguridad(): void {
    this.parametroSeguridadFacade.eliminar(this.mdDelete.data);
  }

  onChangeTipoAutenticacion(item: TipoAutenticacion) {
    const autenticacionLocal = item.autenticacionLocal;
    enableControls(this.form, autenticacionLocal, ...this.camposPoliticasContrasenia);
    if (autenticacionLocal) {
      this.form.setValue({ ...this.form.getRawValue(), ...this.initCamposPoliticaContraseniaActivo });
    } else {
      this.form.setValue({ ...this.form.getRawValue(), ...this.initCamposPoliticaContraseniaInactivo });
    }
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Identificador",
        field: "idParametroSeguridad",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
      },
      {
        headerName: "Descripción",
        field: "descripcionParamSeg",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Tipo Autenticación",
        field: "idTipoAutenticacion",
        valueGetter: (params) => {
          return joinWords(DEFAULT_SEPARATOR, params.data.idTipoAutenticacion, params.data.descripcionTipoAutenticacion);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Politica Contraseña",
        field: 'activoPoliticaContrasenia',
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
        },
      },
      {
        headerName: "Min. Long. Contraseña",
        field: "minimoLongitudContrasenia",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        headerTooltip: 'Cantidad mínima de caracteres'
      },
      {
        headerName: "Min. Dig. Contraseña",
        field: "minimoDigitosContrasenia",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        headerTooltip: 'Cantidad mínima de digitos'
      },
      {
        headerName: "Min. Letr. Contraseña",
        field: "minimoLetrasContrasenia",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        headerTooltip: 'Cantidad mínima de letras'
      },
      {
        headerName: "Min. Minisc. Contraseña",
        field: "minimoMinusculasContrasenia",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        headerTooltip: 'Cantidad mínima de minúsculas'
      },
      {
        headerName: "Min. Mayus. Contraseña",
        field: "minimoMayusculasContrasenia",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        headerTooltip: 'Cantidad mínima de mayúsculas'
      },
      {
        headerName: "Min. Carac. Espec. Contraseña",
        field: "minimoCarEspecContrasenia",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        headerTooltip: 'Cantidad mínima de caracteres especiales'
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
