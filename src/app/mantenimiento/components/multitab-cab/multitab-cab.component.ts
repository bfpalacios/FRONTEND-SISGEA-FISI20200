import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import {
  TYPES,
  Type,
  commonConfigTablaMantenimiento,
  RESOURCE_ACTIONS,
  getContextMenuItemsMantenimiento,
  enableControls,
  joinWords,
  DEFAULT_SEPARATOR,
  updateGrid,
  configFormMd,
  manageCrudState,
  autoSizeColumns
} from '../../../shared/utils';
import { MdConfirmOpts, MdFormOpts, ButtonsCellRendererComponent, TemplateMantenimientoComponent, ConfirmModalComponent, FormModalComponent } from '../../../shared';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridOptions, GridApi, ColumnApi, ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../shared/services/errors/error.service';
import { AppState } from '../../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { MultitabCab } from '../../models';
import { MultitabCabFacade } from '../../facade';
import { MultitabDetComponent } from './multitab-det/multitab-det.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-multitab-cab',
  templateUrl: './multitab-cab.component.html',
  styleUrls: ['./multitab-cab.component.scss']
})
export class MultitabCabComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateMultitabCab') template: TemplateMantenimientoComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @ViewChild('mdSave') mdSave: FormModalComponent;
  @ViewChild('multitabDet') multitabDet: MultitabDetComponent;

  type: Type;
  detailType: Type;
  mdConfirmOpts: MdConfirmOpts;
  mdRegisterOpts: MdFormOpts;
  mdUpdateOpts: MdFormOpts;
  mdFormOpts: MdFormOpts;
  form: FormGroup;
  gridOptions: GridOptions;
  gridApi: GridApi;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private gridColumnApi: ColumnApi;
  templateHtmlMsg: string;

  constructor(
    private store: Store<AppState>,
    private toastr: ToastrService,
    private errorService: ErrorService,
    private multitabCabFacade: MultitabCabFacade
  ) {
    this.type = TYPES.MULTITAB_CAB;
    this.detailType = TYPES.MULTITAB_DET;
  }

  ngOnInit() {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar <strong>[codigo]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.form = new FormGroup({
      'idMultitabCab': new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
      'descripcionMultitabCab': new FormControl('', [Validators.required, Validators.maxLength(100)])
    })
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idMultitabCab;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        autoSizeColumns(this.gridColumnApi);
      },
      getContextMenuItems: (params) => {
        return getContextMenuItemsMantenimiento(params,this.type,this.template.permisoExportacion);
      }
    };

    this.multitabCabFacade.buscarTodos();
    this.manageState();
  }

  ngAfterViewInit() {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
  }

  ngOnDestroy() {
    this.multitabCabFacade.resetMultitab();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState() {
    this.store.select('multitabCabs').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete, this.toastr,
        this.errorService, () => {
          updateGrid(this.gridOptions, state.data);
        });
    });
  }

  showMdRegister() {
    this.mdFormOpts = this.mdRegisterOpts;
    enableControls(this.form, true, 'idMultitabCab');
    this.mdSave.show({}, RESOURCE_ACTIONS.REGISTRO);
  }

  showMdUpdate(params) {
    let data: MultitabCab = params.node.data;
    this.mdFormOpts = this.mdUpdateOpts;
    enableControls(this.form, false, 'idMultitabCab');
    this.mdSave.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params) {
    let data: MultitabCab = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[codigo\]/gi,
      joinWords(DEFAULT_SEPARATOR, data.idMultitabCab, data.descripcionMultitabCab));
    this.mdDelete.show(data);
  }

  save() {
    const action = this.mdSave.action;
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO:
        this.multitabCabFacade.registrar(this.form.getRawValue());
        break;
      case RESOURCE_ACTIONS.ACTUALIZACION:
        this.multitabCabFacade.actualizar(this.form.getRawValue());
        break;
    }
  }

  eliminarMultitabCab() {
    this.multitabCabFacade.eliminar(this.mdDelete.data);
  }

  showMdDetail(params) {
    let data: MultitabCab = params.node.data;
    this.multitabDet.show(data);
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Código",
        field: "idMultitabCab",
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },

      },
      {
        headerName: "Descripción",
        field: 'descripcionMultitabCab',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
      },
      {
        headerName: 'Acción',
        cellClass: 'text-center',
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
          details: [{
            visible: this.template.permisoConsultaDetalle,
            buttonClass: 'btn-xs btn-success',
            icon: 'fa-plus',
            action: this.showMdDetail.bind(this)
          }]
        },
        filter: false,
        sortable: false
      }
    ]
  }

}
