import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ConsultaModalComponent, TemplateMantenimientoComponent } from '../../../shared';
import { TYPES, Type, getContextMenuItemsMantenimiento, removeElementArr, MESSAGE_BODY_CARGA_SUCCESS, MESSAGE_TITLE_CARGA_SUCCESS, MESSAGE_BODY_CARGA_DUPLICADA_ERROR, MESSAGE_TITLE_CARGA_ERROR, FA_ICON_UPLOAD, DEFAULT_SEPARATOR, joinWords, commonConfigTablaMantenimiento, updateGrid } from '../../../shared/utils';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { GridOptions, GridApi, ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlanAcademicoFacade } from '../../facade';

@Component({
  selector: 'app-plan-academico',
  templateUrl: './plan-academico.component.html',
  styleUrls: ['./plan-academico.component.scss']
})
export class PlanAcademicoComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  @ViewChild('template') template: TemplateMantenimientoComponent;

  @ViewChild('md') md: ConsultaModalComponent;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  type: Type;
  gridOptions: GridOptions;
  gridApi: GridApi;
  private gridColumnApi;

  configCarga: any ={
    accept: '.xlsx',
    multiple: false,
    maxFileSize: 20971520, //20MB
    expandable: true,
    loading: false,
    class: FA_ICON_UPLOAD
  }
  files: File[] = [];
  cargando: boolean = false;

  filesNamesAdded: string[] = [];

  constructor(
    private facade: PlanAcademicoFacade,
    private toasterService: ToastrService,
    private cdRef : ChangeDetectorRef,
  ) {
    this.type = TYPES.PLAN_ACADEMICO;
  }

  ngOnInit() {
    this.gridOptions = {
      ...commonConfigTablaMantenimiento,
      getRowNodeId: (data) => {
        return data.idPlanAcademico;
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
      },
      getContextMenuItems: (params) => {
        return getContextMenuItemsMantenimiento(params,this.type,this.template.permisoExportacion);
      }
    }
  }

  ngAfterViewInit(){
    this.template.permisoRegistro = false;
    this.template.permisoCarga = true;
    this.template.permisoExportacion = true;
    this.gridOptions.api.setColumnDefs(this.initColumnDefs());
    this.facade.buscarTodos().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      updateGrid(this.gridOptions,data,this.gridColumnApi,true,true);
    });;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelect(event: NgxDropzoneChangeEvent) {
    event.addedFiles.filter(e=>{
      if(this.filesNamesAdded.indexOf(e.name)==-1){
          this.files.push(e);
          this.filesNamesAdded.push(e.name);
      }else{
        this.toasterService.error(MESSAGE_BODY_CARGA_DUPLICADA_ERROR.replace('name',e.name),MESSAGE_TITLE_CARGA_ERROR);
      }
    });
	}

	onRemove(event) {
		removeElementArr(this.filesNamesAdded,event.name);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onClickCarga(){
    this.md.show();
  }

  cargarArchivo(){
    this.configCarga.loading = true;
    this.facade.cargar(this.files).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.toasterService.success(MESSAGE_BODY_CARGA_SUCCESS, MESSAGE_TITLE_CARGA_SUCCESS);
      this.configCarga.loading = false;
      this.md.hide();
      this.facade.buscarTodos().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        updateGrid(this.gridOptions,data,this.gridColumnApi,true,true);
      });
    });
  }

  initColumnDefs(): ColDef[] {
    return [
      {
        headerName: "Código",
        field: 'idPlan',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Descripción",
        field: 'descripcionPlan',
        cellClass: 'ob-type-string',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Facultad",
        field: "facultad",
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
      },
      {
        headerName: "Escuela",
        field: "escuela",
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
      },
      {
        headerName: "Especialidad",
        field: "especialidad",
        cellClass: 'ob-type-string-center',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: "keep" },
      }
    ];
  }

}
