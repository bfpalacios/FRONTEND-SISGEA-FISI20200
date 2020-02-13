import { ICellRendererParams } from 'ag-grid-community';
import { ViewChild, ElementRef, AfterViewInit, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
export interface ObComboboxCellParams extends ICellRendererParams {
  disabled: boolean,
  visible?: boolean,
  visibleFn?: Function,
  onChangeFn?: Function,
  placeholder: string,
  listItems: any[],
  listItemsFn: Function,
  label: string,
  value: string,
  itemSelected: string
}

@Component({
  selector: 'combobox-cell',
  templateUrl: './combobox-cell.component.html'
})
export class ObComboboxCellComponent implements AfterViewInit, ICellRendererAngularComp {
  
  public params: ObComboboxCellParams;

  constructor() { }

  ngAfterViewInit() {
  }

  agInit(params: ObComboboxCellParams): void {
    this.params = params;
  }

  public onChange(event) {
    this.params.onChangeFn(this.params, event);
  }

  refresh(params: any): boolean {
    throw new Error("Method not implemented.");
  }

  prueba(event:any){
    //console.log(event)
  }

  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
    throw new Error("Method not implemented.");
  }
}