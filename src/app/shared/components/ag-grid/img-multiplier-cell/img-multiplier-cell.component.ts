import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface ImgMultiplierCellRendererParams extends ICellRendererParams {
  showText: boolean,
  showTextFn: Function,
  text: string,
  textFn: Function,
  type: string, // img , icon,
  src: string // imgUrl
  class: string
}

@Component({
  selector: 'app-img-multiplier-cell',
  templateUrl: './img-multiplier-cell.component.html'
})
export class ImgMultiplierCellComponent implements ICellRendererAngularComp {
  public params: ImgMultiplierCellRendererParams;
  public value: number = 0;
  public text: string = '';
  public times: number[] = [];
  public showText: boolean = false;

  agInit(params: ImgMultiplierCellRendererParams): void {
    this.params = params;
    this.value = params.value;
    this.text = this.params.textFn ? this.params.textFn(this.params) : this.params.text ? this.params.text : this.value;
    this.times = Array(this.value).fill(0);
    this.showText = this.params.showTextFn ? this.params.showTextFn(this.params) : this.params.showText !== undefined ?
      this.params.showText : true;
  }

  refresh(): boolean {
    return false;
  }
}