import { Component, OnInit, OnDestroy, Input } from '@angular/core';

export interface AlertOpts {
  type: string,
  htmlMsg?: string,
  msg?: string,
  dismissible?: boolean
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() options: AlertOpts = {
    type: 'info',
    msg: 'Mensaje',
    dismissible: true
  }
  isVisible: boolean = false;
  timeToDismiss = 4000;

  constructor() { }

  ngOnInit() {
  }

  show(options?: AlertOpts) {
    if (options) {
      this.options = options;
    }
    this.isVisible = true;
  }

  hide(alert?) {
    this.isVisible = false;
  }

}
