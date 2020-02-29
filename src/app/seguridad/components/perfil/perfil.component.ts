import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { PerfilFacade } from '../../facade';
import { AppState } from '../../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Type, TYPES, joinWords, DEFAULT_SEPARATOR, configFormMd, commonConfigTablaMantenimiento, manageCrudState, updateGrid, enableControls, RESOURCE_ACTIONS, renderYesNoLabel } from '../../../shared/utils';
import { TemplateMantenimientoComponent, ConfirmModalComponent, FormModalComponent, MdConfirmOpts, MdFormOpts, ButtonsCellRendererComponent, ObSwitchFilterGridComponent } from '../../../shared';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { Perfil } from '../../models';
import { ErrorService } from '../../../shared/services/errors/error.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('templatePerfilSeg') template: TemplateMantenimientoComponent;
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

  constructor(
    private store: Store<AppState>,
    private perfilFacade: PerfilFacade,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) {
    this.type = TYPES.PERFIL;
    this.detailType = TYPES.ASIG_PERMIS;
  }

  ngOnInit() {
    this.templateHtmlMsg = `<p>¿Está seguro que desea eliminar el Perfil <strong>[perfil]</strong>?</p>`;
    this.mdConfirmOpts = configFormMd.getDeleteMdOpts(this.templateHtmlMsg);
    this.mdRegisterOpts = configFormMd.getRegisterMdOpts(this.type);
    this.mdUpdateOpts = configFormMd.getUpdateMdOpts(this.type);
    this.form = new FormGroup({
      'idPerfil': new FormControl(''),
      'descripcionPerfil': new FormControl('', [Validators.required, Validators.maxLength(50)])
    })
    this.mdFormOpts = this.mdRegisterOpts;
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return `${data.idPerfil}`;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
      }
    }
    this.perfilFacade.initData();
  }

  ngAfterViewInit() {
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.perfilFacade.buscarTodos();
    this.manageState();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  manageState() {
    this.store.select('perfilesSeg').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      manageCrudState(state, this.form, this.template, this.mdFormOpts, this.mdSave, this.mdConfirmOpts, this.mdDelete, this.toastr,
        this.errorService, () => {
          updateGrid(this.gridOptions, state.data, this.gridColumnApi, false, true);
        }, () => {
          if(state.action === RESOURCE_ACTIONS.ACTUALIZACION){
            
          }
        });
    });
  }

  showMdRegister() {
    this.mdFormOpts = this.mdRegisterOpts;
    enableControls(this.form, false, 'idPerfil');
    this.mdSave.show({}, RESOURCE_ACTIONS.REGISTRO);
  }

  showMdUpdate(params) {
    let data: Perfil = params.node.data;
    this.mdFormOpts = this.mdUpdateOpts;
    enableControls(this.form, false, 'idPerfil');
    this.mdSave.show(data, RESOURCE_ACTIONS.ACTUALIZACION);
  }

  showMdDelete(params) {
    let data: Perfil = params.node.data;
    this.mdConfirmOpts.htmlMsg = this.templateHtmlMsg.replace(/\[perfil\]/gi,
      joinWords(DEFAULT_SEPARATOR, data.idPerfil, data.descripcionPerfil))
      .replace(/\[sistema\]/gi, '');
    this.mdDelete.show(data);
  }

  save() {
    const action = this.mdSave.action;
    const formValue = this.form.getRawValue();
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO:
        this.perfilFacade.registrar(formValue);
        break;
      case RESOURCE_ACTIONS.ACTUALIZACION:
        this.perfilFacade.actualizar(formValue);
        break;
    }
  }

  actualizarPerfil(){
    this.perfilFacade.actualizar(this.form.getRawValue());
  }

  eliminarPerfil() {
    this.perfilFacade.eliminar(this.mdDelete.data);
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Perfil",
        field: "idPerfil",
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
        sort: 'asc'
      },
      {
        headerName: "Descripción",
        field: 'descripcionPerfil',
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
