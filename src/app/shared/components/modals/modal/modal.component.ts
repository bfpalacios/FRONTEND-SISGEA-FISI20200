import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  /**
   * class: modal-lg, modal-sm, modal-primary, modal-success, modal-warning, modal-danger
   */
  @Input() class: string = '';
  @Input() title: string = 'Titulo';
  @Input() classTitle: string = 'default-color-title';
  @Input() closeLabel: string = 'Cerrar';
  @Input() classCloseBtn: string = 'btn-secondary';
  @Input() btns: boolean = true;
  @Input() btnsHeader?: boolean = true;
  @Input() style?: string;
  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();
  @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
  @Output() onShown: EventEmitter<any> = new EventEmitter<any>();

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

  onHideModal(){
    if(this.onHide) this.onHide.emit();
  }

  onShowModal(){
    if(this.onShow) this.onShow.emit();
  }

  onShownModal(){
    if(this.onShown) this.onShown.emit();
  }

}
