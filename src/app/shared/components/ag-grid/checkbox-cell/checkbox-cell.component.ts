import { ICellRendererParams } from 'ag-grid-community';
import { ViewChild, ElementRef, AfterViewInit, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

export interface ObCheckboxCellParams extends ICellRendererParams {
  disabled: boolean,
  visible?: boolean,
  visibleFn?: Function,
  onChangeFn?: Function,
  checkedFn?: Function
}

@Component({
  selector: 'checkbox-cell',
  templateUrl: './checkbox-cell.component.html'
})
export class ObCheckboxCellComponent implements AfterViewInit, ICellRendererAngularComp {
  public params: ObCheckboxCellParams;

  constructor() { }

  ngAfterViewInit() {
  }

  agInit(params: ObCheckboxCellParams): void {
    this.params = params;
  }

  public onChange(event) {
    this.params.onChangeFn(this.params, event);
  }

  refresh(params: any): boolean {
    //throw new Error("Method not implemented.");
    return false;
  }

  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
    throw new Error("Method not implemented.");
  }
}