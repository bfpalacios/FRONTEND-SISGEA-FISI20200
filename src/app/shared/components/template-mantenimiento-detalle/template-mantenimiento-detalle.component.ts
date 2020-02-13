import { Component, OnInit, OnDestroy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Type, RESOURCE_ACTIONS, resetForm } from '../../utils';
import { MdFormOpts } from '../modals/form-modal/form-modal.component';
import { ModalComponent } from '..';
import { FormGroup } from '@angular/forms';
import { PermissionsService } from '../../services';

@Component({
  selector: 'app-template-mantenimiento-detalle',
  templateUrl: './template-mantenimiento-detalle.component.html',
  styleUrls: ['./template-mantenimiento-detalle.component.scss']
})
export class TemplateMantenimientoDetalleComponent implements OnInit {
  @Input() type: Type;
  @Input() options: MdFormOpts;
  @Input() form: FormGroup;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onClickRegisterBtn: EventEmitter<any> = new EventEmitter();
  @ViewChild('md') md: ModalComponent;

  acciones: string[];
  permisoRegistro: boolean;
  permisoActualizacion: boolean;
  permisoExportacion: boolean = false;
  permisoEliminacion: boolean;
  permisoConsulta: boolean;
  configRegisterBtn = { text: 'Agregar', class: 'btn-primary', disabled: false };
  configUpdateBtn = { text: 'Actualizar', class: 'btn-success', disabled: false };
  action: string; // current action

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
    this.options = {
      title: `Mantenimiento ${this.type.name}`,
      modalClass: 'modal-template-detalle',
      buttons: {
        ok: this.permisoRegistro ? this.configRegisterBtn : null,
        cancel: { text: 'Cerrar' }
      }
    };
  }

  show(valueForm?: any) {
    this.md.show();
    this.action = this.permisoRegistro ? RESOURCE_ACTIONS.REGISTRO : '';
    this.setConfigBtn(this.permisoRegistro ? this.configRegisterBtn: null);
    resetForm(this.form, valueForm);
  }

  hide() {
    this.md.hide();
  }

  ok() {
    this.onSubmit.emit();
  }

  setConfigBtn(configBtn: any) {
    this.options.buttons.ok = configBtn;
  }

  setAction(action: string) {
    this.action = action;
  }

  onClickRegister() {
    this.prepareForRegister();
    this.onClickRegisterBtn.emit();
  }

  prepareForUpdate() {
    this.setConfigBtn(this.configUpdateBtn);
    this.setAction(RESOURCE_ACTIONS.ACTUALIZACION);
  }

  prepareForRegister(){
    this.setConfigBtn(this.configRegisterBtn);
    this.setAction(RESOURCE_ACTIONS.REGISTRO);
  }

  onClickCancelAction(){
    this.onClickRegister();
  }

  disableSaveBtn(disable: boolean = true){
    if(this.options.buttons.ok){
      this.options.buttons.ok.disabled = disable;
    } else {
      throw new Error('Save button is undefined')
    }
  }

}
