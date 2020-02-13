import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Type, RESOURCE_ACTIONS } from '../../utils';
import { FormGroup } from '@angular/forms';
import { PermissionsService } from '../../services';

@Component({
  selector: 'app-template-consulta',
  templateUrl: './template-consulta.component.html',
  providers: [PermissionsService]
})
export class TemplateConsultaComponent implements OnInit {
  @Input() type: Type;
  @Input() detailType: Type;
  @Input() form: FormGroup;

  @Output() clickSearchBtn: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickExportBtn: EventEmitter<any> = new EventEmitter<any>();

  acciones: string[];
  accionesDetalle: string[];
  permisoExportacion: boolean;
  permisoConsulta: boolean;
  permisoConsultaDetalle: boolean;

  constructor(
    private _perm: PermissionsService
  ) {
   }

  ngOnInit() {
    ////console.log('Template consulta',this.type);
    this.acciones = this._perm.getValidActions(this.type.resource);
    this.permisoExportacion = this._perm.hasPermission(this.acciones, RESOURCE_ACTIONS.EXPORTACION);
    this.permisoConsulta = this._perm.hasPermission(this.acciones, RESOURCE_ACTIONS.CONSULTA);
    this.permisoConsultaDetalle = this._perm.hasPermission(this.acciones, RESOURCE_ACTIONS.CONSULTA_DETALLE);
    if(this.detailType){
      this.accionesDetalle = this._perm.getValidActions(this.detailType.resource);
    }
  }

  onClickSearchBtn(){
    this.clickSearchBtn.emit();
  }

  onClickExportBtn(){
    this.clickExportBtn.emit();
  }

}
