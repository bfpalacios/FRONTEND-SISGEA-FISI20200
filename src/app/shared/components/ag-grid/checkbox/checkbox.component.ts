import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
/*
export interface ButtonCellRenderDef {
  visible?: boolean,
  tooltip?: string,
  buttonClass?: string,
  icon?: string,
  action?: any
}

export interface ParamsButtonCellRenderDef {
  edit?: ButtonCellRenderDef,
  delete?: ButtonCellRenderDef,
  details?: ButtonCellRenderDef[]
}
*/
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements ICellRendererAngularComp {

  public params: any;

  constructor() { 
  }

  setCheck(flag){
    let div = document.getElementById("checkbox");
    if(flag){
      div.setAttribute("checked","true");
    } else {
      div.setAttribute("checked","false");
    }
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  agInit(params): void {
    this.params = params;
  }

  afterGuiAttached(params:any): void {
    this.setCheck(this.params.data.checked);
  }

  onClickCheck(value): void {
    //console.log("Imprime Clicked on Component");
    if(value.params.eGridCell.children["0"].children["0"].children["0"].attributes.type.ownerElement.checked){
      this.params.check.action(this.params);
    }else{
      this.params.check.disable(this.params);
    }
  }

}
