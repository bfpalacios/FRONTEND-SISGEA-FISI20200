import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

export interface MdConfirmOpts {
  title: string,
  classTitle?: string,
  modalClass?: string,
  htmlMsg: string
  buttons: {
    ok: { text: string, disabled: boolean, class?: string },
    cancel: { text: string }
  }
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() options: MdConfirmOpts = {
    title: 'Confirmar',
    classTitle : 'confirm',
    htmlMsg: '',
    buttons: {
      ok: { text: 'Ok', disabled: false, class: 'btn-danger' },
      cancel: { text: 'Cancelar' }
    }
  }
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('md') md: ModalComponent;

  data:any;

  constructor() { }

  ngOnInit() {
  }

  ok(){
    this.confirm.emit();
  }

  show(data?:any){
    if(data) this.data = data;
    this.md.show();
  }

  hide(){
    this.md.hide();
  }

}
