import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup } from '@angular/forms';
import { resetForm } from '../../../utils';

export interface MdFormOpts {
  title: string,
  buttons: {
    ok: { text: string, class?: string, disabled: boolean, hidden?: boolean },
    cancel?: { text: string, class?: string }
  },
  modalClass?: string
};

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {
  @Input() options: MdFormOpts = {
    title: 'Título',
    buttons: {
      ok: { text: 'Ok', disabled: false, hidden: false },
      cancel: { text: 'Cancelar', class: 'btn-secondary' }
    },
    modalClass: 'modal-mantenimientos'
  };
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('md') md: ModalComponent;
  @Input() form: FormGroup;

  action:string;

  constructor() { }

  ngOnInit() {
  }

  show(valueForm?: any, action?:string) {
    if(valueForm){
      this.reset(valueForm);
    }
    this.action = action;
    this.md.show();
  }

  ok() {
    this.onSubmit.emit();
  }

  hide() {
    this.md.hide();
  }

  reset(value?) {
    resetForm(this.form, value);
  }

}
