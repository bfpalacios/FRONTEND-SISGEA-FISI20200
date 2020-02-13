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
  renderYesNoLabel,
  RESOURCE_ACTIONS,
  Type,
  TYPES,
  updateGrid,
  OB_TIME_UTIL,
  resetForm
} from "../../../shared/utils";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GridOptions, GridApi, ColDef } from "ag-grid-community";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import { AppState } from "../../../shared/store/app.reducers";
import { ErrorService } from "../../../shared/services/errors/error.service";
import { SistemaFacade } from "../../facade";
import { Sistema, Accion, ParametroSeguridad } from "../../models";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss'],
  providers: [DatePipe]
})
export class SistemaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateSistema') template: TemplateMantenimientoComponent;
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
  sistema: Sistema[];
  acciones: Accion[];
  parametrosSeguridad: ParametroSeguridad[];

  minDate: Date;
  initSistema: Sistema = {
    idSistema: null,
    descripcionSistema: '',
    idParametroSeguridad: null,
    codigoAudiencia: '',
    tiempoExpiracionToken: new Date()
  }

  constructor(private sistemaFacade: SistemaFacade, private toastr: ToastrService,
    private store: Store<AppState>, private errorService: ErrorService, private datePipe: DatePipe) {
    this.type = TYPES.SISTEMA;
  }

  ngOnInit(): void {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar  <strong>[codigo]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.minDate = new Date();
    this.minDate.setHours(0);
    this.minDate.setMinutes(0);
    this.initSistema.tiempoExpiracionToken.setHours(0);
    this.initSistema.tiempoExpiracionToken.setMinutes(1);
    this.form = new FormGroup(
      {
        'idSistema': new FormControl('', [Validators.required, Validators.min(1),
        Validators.max(99)]),
        'descripcionSistema': new FormControl('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(20)]),
        'codigoAudiencia': new FormControl('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(10)]),
        'idParametroSeguridad': new FormControl('', [Validators.required]),
        'tiempoExpiracionToken': new FormControl('', [Validators.required])
      });
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idSistema;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      }
    };
    this.sistemaFacade.initData();
    this.store.select('parametrosSeguridad').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state) => this.parametrosSeguridad = state.data);
  }

  ngAfterViewInit(): void {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.sistemaFacade.buscarTodos();
    this.manageState();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState(): void {
    this.store.select('sistema').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete,
        this.toastr, this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi, true, true);
        });
    });
  }

  showMdRegister(): void {
    this.mdFormOpts = this.mdRegisterOpts;
    enableControls(this.form, true, 'idSistema');
    this.mdSave.show(this.initSistema, RESOURCE_ACTIONS.REGISTRO);
  }

  showMdUpdate(params): void {
    let data: Sistema = {...params.node.data};
    data.tiempoExpiracionToken = OB_TIME_UTIL.convertMillisecondsToTime(data.tiempoExpiracionToken);
    this.mdFormOpts = this.mdUpdateOpts;
    enableControls(this.form, false, 'idSistema');
    this.mdSave.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params): void {
    let data: Sistema = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[codigo]/gi, joinWords(DEFAULT_SEPARATOR,
      data.idSistema, data.descripcionSistema));
    this.mdDelete.show(data);
  }

  save(): void {
    const action = this.mdSave.action;
    this.sistemaFacade.guardar(this.form.getRawValue(), action);
  }

  eliminarSistema(): void {
    this.sistemaFacade.eliminar(this.mdDelete.data);
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Identificador",
        field: "idSistema",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        sort: 'asc'
      },
      {
        headerName: "Descripción",
        field: "descripcionSistema",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Código Audiencia",
        field: "codigoAudiencia",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: 'Tiempo expiración de token (hh:mm)',
        field: 'tiempoExpiracionToken',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        valueFormatter:(params) => {
          const time = OB_TIME_UTIL.convertMilliSecondsToObj(params.value);
          return `${time.hours} hrs ${time.minutes} min`
        }
      },
      {
        headerName: "Parámetro Seguridad",
        field: "idParametroSeguridad",
        valueGetter: (params) => {
          return joinWords(DEFAULT_SEPARATOR, params.data.idParametroSeguridad, params.data.descripcionParamSeg);
        },
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

  transform(date: Date): string {
    //console.log('transform', date);
    return this.datePipe.transform(date, 'HH:mm');
  }
}
