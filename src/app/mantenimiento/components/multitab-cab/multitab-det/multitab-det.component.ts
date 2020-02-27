import { Component, OnInit, OnDestroy, ViewChild, Input, AfterViewInit } from '@angular/core';
import { TemplateMantenimientoDetalleComponent } from '../../../../shared/components/template-mantenimiento-detalle/template-mantenimiento-detalle.component';
import { Type, getContextMenuItemsMantenimiento, commonConfigTablaMantenimiento, joinWords, DEFAULT_SEPARATOR, enableControls, resetForm, RESOURCE_ACTIONS, updateGrid, configFormMd, manageCrudDetailState } from '../../../../shared/utils';
import { MultitabCab, MultitabDet } from '../../../models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridOptions, GridApi } from 'ag-grid-community';
import { ButtonsCellRendererComponent, ConfirmModalComponent, MdConfirmOpts } from '../../../../shared';
import { MultitabDetFacade } from '../../../facade';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/store/app.reducers';
import { ErrorService } from '../../../../shared/services/errors/error.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResetMultitabDet } from '../../../../shared/store/actions/mantenimiento/multitab-det.actions';

@Component({
  selector: 'multitab-det',
  templateUrl: './multitab-det.component.html',
  styleUrls: ['./multitab-det.component.scss']
})
export class MultitabDetComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templateMultitabDet') templateMultitabDet: TemplateMantenimientoDetalleComponent;
  @ViewChild('mdDelete') mdDelete: ConfirmModalComponent;
  @Input() type: Type;
  multitabCab: MultitabCab;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  form: FormGroup;
  gridOptions: GridOptions;
  gridApi: GridApi;
  mdConfirmOpts: MdConfirmOpts;
  private gridColumnApi;
  templateHtmlMsg: string;

  multitabCabs: MultitabCab[] = [];
  idSeleccionado: number = -1;

  constructor(
    private store: Store<AppState>,
    private multitabDetFacade: MultitabDetFacade,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar <strong>[codigo]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.form = new FormGroup({
      'idMultitabCab': new FormControl(), // hidden
      'idMultitabDet': new FormControl('', [Validators.required, Validators.maxLength(4)]),
      'descripcionItem': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'abreviatura': new FormControl('', [Validators.maxLength(10)])
    });
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return `${data.idMultitabCab}|${data.idMultitabDet}`;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
      },
      getContextMenuItems: (params) => {
        return getContextMenuItemsMantenimiento(params,this.type,this.templateMultitabDet.permisoExportacion);
      }
    }
    this.store.select('multitabCabs').pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => this.multitabCabs = [...state.data]);
    this.store.dispatch(new ResetMultitabDet());
    this.manageState();
  }

  ngAfterViewInit(){
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
  }

  ngOnDestroy(){
    this.multitabDetFacade.resetMultitabDet();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState() {
    this.store.select('multitabDets').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudDetailState(state, this.form, this.templateMultitabDet,
        this.mdConfirmOpts, this.mdDelete, this.toastr, this.errorService,
        () => {
          if(this.multitabCab) {
            this.templateMultitabDet.prepareForRegister();
            this.onClickRegister();
          }
        },
        () => {
          if(this.multitabCab) updateGrid(this.gridOptions, state.data, this.gridColumnApi, false, true);
        });
    });
  }

  show(multitabCab: MultitabCab) {
    this.multitabCab = multitabCab;
    this.idSeleccionado = this.multitabCab.idMultitabCab;
    this.multitabDetFacade.buscarPorMultitabCab(this.multitabCab);
    enableControls(this.form, true, 'idMultitabDet');
    this.templateMultitabDet.show({ idMultitabCab: this.multitabCab.idMultitabCab });
  }

  onClickRegister() {
    resetForm(this.form, { idMultitabCab: this.multitabCab.idMultitabCab });
    enableControls(this.form, true, 'idMultitabDet');
  }

  onClickUpdate(params) {
    let data: MultitabDet = params.node.data;
    enableControls(this.form, false, 'idMultitabDet');
    resetForm(this.form, data);
    this.templateMultitabDet.prepareForUpdate();
  }

  showMdDelete(params) {
    let data: MultitabDet = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[codigo\]/g,
      joinWords(DEFAULT_SEPARATOR, data.idMultitabDet, data.descripcionItem));
    this.mdDelete.show(data);
  }

  save() {
    const action = this.templateMultitabDet.action;
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO:
        this.multitabDetFacade.registrar(this.form.getRawValue());
        break;
      case RESOURCE_ACTIONS.ACTUALIZACION:
        this.multitabDetFacade.actualizar(this.form.getRawValue());
        break;
    }
  }

  eliminarMultitabDet() {
    this.multitabDetFacade.eliminar(this.mdDelete.data);
  }

  initColumnDefs() {
    return [
      {
        headerName: "Tabla",
        field: "idMultitabCab",
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return joinWords(DEFAULT_SEPARATOR, params.data.idMultitabCab, params.data.descripcionMultitabCab);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Item",
        field: "idMultitabDet",
        cellClass: 'ob-type-string',
        valueGetter: (params) => {
          return joinWords(DEFAULT_SEPARATOR, params.data.idMultitabDet, params.data.descripcionItem);
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Abreviatura",
        field: 'abreviatura',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: 'Acción',
        cellRendererFramework: ButtonsCellRendererComponent,
        cellClass: 'text-center',
        cellRendererParams: {
          edit: {
            visible: this.templateMultitabDet.permisoActualizacion,
            action: this.onClickUpdate.bind(this)
          },
          delete: {
            visible: this.templateMultitabDet.permisoEliminacion,
            action: this.showMdDelete.bind(this)
          }
        },
        filter: false,
        sortable: false
      }
    ]
  }

  onChangeSelect(data: MultitabCab) {
    this.multitabCab = data;
    this.multitabDetFacade.buscarPorMultitabCab(this.multitabCab);
    this.templateMultitabDet.prepareForRegister();
    this.onClickRegister();
  }

}
