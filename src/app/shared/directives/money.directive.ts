import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[money]'
})
export class MoneyDirective {
  private el: NgControl;

  constructor(private ngControl: NgControl) {
    this.el = ngControl;
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    //Validara numeros a 4 decimales
    this.el.control.patchValue(value.replace(/^-?\d+(?:.\d{1,4})?$/g, ''));
  }

}
