import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Type, RESOURCE_ACTIONS } from '../../utils';
import { PermissionsService } from '../../services';

@Component({
  selector: 'app-template-mantenimiento',
  templateUrl: './template-mantenimiento.component.html',
  styleUrls: ['./template-mantenimiento.component.scss'],
  providers: [PermissionsService]
})
export class TemplateMantenimientoComponent implements OnInit {
  @Input() type: Type;
  @Input() detailType: Type;
  @Input() loading: boolean = false;
  @Output() clickRegisterBtn?: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickExportBtn?: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickCargaBtn?: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickProcesarBtn?: EventEmitter<any> = new EventEmitter<any>();

  acciones: string[];
  accionesDetalle: string[];
  permisoRegistro: boolean = false;
  permisoCarga: boolean = false;
  permisoActualizacion: boolean = false;
  permisoExportacion: boolean = false;
  permisoConsulta: boolean = false;
  permisoEliminacion: boolean = false;
  permisoProcesar: boolean = false;

  permisoConsultaDetalle: boolean = false;
  permisoRegistroDetalle: boolean = false;

  downloading: boolean = false;

  constructor(
    private _perm: PermissionsService
  ) {
   }

  ngOnInit() {
    this.acciones = this._perm.getValidActions(this.type.resource);
    this.permisoRegistro = this._perm.hasPermission(this.acciones, RESOURCE_ACTIONS.REGISTRO);
    this.permisoActualizacion = this._perm.hasPermission(this.acciones, RESOURCE_ACTIONS.ACTUALIZACION);
    this.permisoExportacion = this._perm.hasPermission(this.acciones, RESOURCE_ACTIONS.EXPORTACION);
    this.permisoConsulta = this._perm.hasPermission(this.acciones, RESOURCE_ACTIONS.CONSULTA);
    this.permisoEliminacion = this._perm.hasPermission(this.acciones, RESOURCE_ACTIONS.ELIMINACION);
    if(this.detailType){
      this.accionesDetalle = this._perm.getValidActions(this.detailType.resource);
      this.permisoConsultaDetalle = this._perm.hasPermission(this.accionesDetalle, RESOURCE_ACTIONS.CONSULTA);
      this.permisoRegistroDetalle = this._perm.hasPermission(this.accionesDetalle, RESOURCE_ACTIONS.REGISTRO);
    }
  }

  onClickRegister(){
    this.clickRegisterBtn.emit();
  }

  onClickCarga(){
    this.clickCargaBtn.emit();
  }

  onClickExport(){
    this.clickExportBtn.emit();
  }

  onClickProcesar(){
    this.clickProcesarBtn.emit();
  }

  disableDownloadBtn(disable: boolean){
    this.downloading = disable;
  }

}
