import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[description]'
})
export class DescriptionDirective {
  private el: NgControl;

  constructor(private ngControl: NgControl) {
    this.el = ngControl;
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.el.control.patchValue(value.replace(/[^A-Za-z0-9_\-,:;.\sáéíóúÁÉÍÓÚñÑ\(\)/]/g, ''));
  }

}
