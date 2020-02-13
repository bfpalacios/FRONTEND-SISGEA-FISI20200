import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface ProgressCellRendererParams extends ICellRendererParams {
  top: number,
  topFn: Function,
  text: string,
  textFn: Function,
  type: string,
  typeFn: Function
}

@Component({
  selector: 'app-progress-cell',
  templateUrl: './progress-cell.component.html'
})
export class ProgressCellComponent implements ICellRendererAngularComp {
  public params: ProgressCellRendererParams;
  public max: number = 0;
  public value: number = 0;
  public text: string = '';
  public type: string = '';

  agInit(params: ProgressCellRendererParams): void {
    this.params = params;
    this.value = params.value;
    this.max = this.params.topFn ? this.params.topFn(this.params) : this.params.top;
    this.text = this.params.textFn ? this.params.textFn(this.params) : this.params.text ? this.params.text : this.value;
    this.type = this.params.typeFn ? this.params.typeFn(this.params) : this.params.type ? this.params.type : this.type;
  }

  refresh(): boolean {
    return false;
  }
}