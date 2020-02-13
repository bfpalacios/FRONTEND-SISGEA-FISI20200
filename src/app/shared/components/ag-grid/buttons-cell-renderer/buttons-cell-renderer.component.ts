import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface ButtonCellRenderDef {
  visible?: boolean,
  tooltip?: string,
  buttonClass?: string,
  icon?: string,
  action?: any,
  text?: string,
  btnDisabled?: boolean,
  textFn?: Function,
  btnDisabledFn?: Function,
  iconFn?: Function,
  visibleFn?: Function,
  tooltipFn?: Function,
  dataFn?: Function
}

export interface ButtonCellRenderParams extends ICellRendererParams {
  edit?: ButtonCellRenderDef,
  delete?: ButtonCellRenderDef,
  details?: ButtonCellRenderDef[],
  detailOrder?: ButtonCellRenderDef
}

@Component({
  selector: 'app-button-cell-renderer',
  templateUrl: './buttons-cell-renderer.component.html'
})
export class ButtonsCellRendererComponent implements ICellRendererAngularComp {

  public params: ButtonCellRenderParams;

  constructor() { }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  agInit(params): void {
    this.params = params;
    /*if (!params.action) {
      throw new Error('Missing action parameter for ButtonCellRendererComponent');
    }*/
  }

  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
    throw new Error("Method not implemented.");
  }

  onClickEdit(): void {
    this.params.edit.action(this.params);
  }

  onClickDelete(): void {
    this.params.delete.action(this.params);
  }

  onClickDetail(i: number): void{
    if(!this.params.details[i].action){
      throw new Error('Método no implementado');
    }
    this.params.details[i].action(this.params);
  }

  onClick(valor: number){
    if(!this.params.detailOrder.action){
      throw new Error('Método no implementado');
    }
    this.params.detailOrder.action(this.params, valor);
  }

}
