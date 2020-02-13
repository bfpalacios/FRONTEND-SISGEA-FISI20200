import { AfterViewInit, Component } from '@angular/core';
import { IFloatingFilter, IFloatingFilterParams, TextFilterModel, TextFilter } from "ag-grid-community";
import { AgFrameworkComponent } from "ag-grid-angular";

export interface ObSwitchFilterGridParams extends IFloatingFilterParams {
  yesOption: any,
  noOption: any
}

@Component({
  selector: 'app-ob-switch-filter-grid',
  templateUrl: './ob-switch-filter-grid.component.html',
  styleUrls: ['./ob-switch-filter-grid.component.scss']
})
export class ObSwitchFilterGridComponent implements IFloatingFilter,
  AgFrameworkComponent<ObSwitchFilterGridParams>, AfterViewInit {

  private params: ObSwitchFilterGridParams;
  public yesOption: any;
  public noOption: any;
  public opcionSeleccionada: any = '*';
  public radioName = '';

  agInit(params: ObSwitchFilterGridParams): void {
    this.params = params;
    this.yesOption = params.yesOption;
    this.noOption = params.noOption;
    this.opcionSeleccionada = '*';
    this.radioName = this.params.column.getColId();
  }

  ngAfterViewInit(): void {
    this.onChange();
  }

  onChange(): void {
    this.params.parentFilterInstance((instance) => {
      const model = this.buildModel();
      (<TextFilter>instance).onFloatingFilterChanged(model.type, model.filter);
    });
  }

  onParentModelChanged(parentModel: TextFilterModel): void {
    if (!parentModel) {
      this.opcionSeleccionada = '*';
    } else {
      this.opcionSeleccionada = parentModel.filter
    }
  }

  buildModel() {
    if (this.opcionSeleccionada === null || this.opcionSeleccionada === undefined || this.opcionSeleccionada === '*') {
      return { type: null, filter: null };
    }
    return { type: 'equals', filter: this.opcionSeleccionada };
  }
}
