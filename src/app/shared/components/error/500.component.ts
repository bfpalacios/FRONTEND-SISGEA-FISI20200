import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  templateUrl: '500.component.html'
})
export class P500Component {

  constructor(
    private _location: Location
  ) { }

  irPaginaAnterior(){
    this._location.back();
  }

}
