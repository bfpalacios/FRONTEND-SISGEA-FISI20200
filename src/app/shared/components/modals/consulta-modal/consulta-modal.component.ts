import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Type } from '../../../utils';

export interface MdConsultaOpts {
  title: string,
  buttons: {
    ok: { text: string, class?: string, disabled: boolean },
    cancel?: { text: string, class?: string }
  },
  modalClass?: string
};

@Component({
  selector: 'app-consulta-modal',
  templateUrl: './consulta-modal.component.html',
  styleUrls: ['./consulta-modal.component.scss']
})
export class ConsultaModalComponent implements OnInit {
  @Input() options: MdConsultaOpts = {
    title: 'Título',
    buttons: {
      ok: { text: 'Ok', disabled: false },
      cancel: { text: 'Cerrar', class: 'btn-primary' }
    }
  };
  @Input() type: Type;
  @Input() class: string = '';
  @Input() closeLabel: string = 'Cerrar';

  @ViewChild('myModal') public modal: ModalDirective;
  @ViewChild('mdDialog') mdDialog: ElementRef;

  tooltipFullscreen: string;
  tooltipMax: string = 'Maximizar';
  tooltipoMin: string = 'Restaurar';

  htmlFullscreen: string;
  iconMax: string = "&#x025A1;";
  iconMin: string = "&#x025A3;";


  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.tooltipFullscreen = this.tooltipMax;
    this.htmlFullscreen = this.iconMax;
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  onClickMaximize() {
    if (this.mdDialog.nativeElement.classList.contains('modal-dialog-maximize')) {
      this.renderer.removeClass(this.mdDialog.nativeElement, 'modal-dialog-maximize');
      this.htmlFullscreen = this.iconMax;
      this.tooltipFullscreen = this.tooltipMax;
    } else {
      this.renderer.addClass(this.mdDialog.nativeElement, 'modal-dialog-maximize');
      this.htmlFullscreen = this.iconMin;
      this.tooltipFullscreen = this.tooltipoMin;
    }
  }


}
