import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[onlytext]'
})
export class OnlytextDirective {
  private el: NgControl;

  constructor(private ngControl: NgControl) {
    this.el = ngControl;
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.el.control.patchValue(value.replace(/[^a-zA-Z]/g, ''));
  }

}