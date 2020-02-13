import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component {

  constructor(
    private _location: Location
  ) { }

  irPaginaAnterior(){
    this._location.back();
  }

}
