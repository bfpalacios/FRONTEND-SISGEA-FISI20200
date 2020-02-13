import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { IFloatingFilter, IFloatingFilterParams, TextFilter } from "ag-grid-community";
import { AgFrameworkComponent } from "ag-grid-angular";
import { DEFAULT_SEPARATOR, joinWords } from "../../../../utils";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface ObSelectFilterGridParams extends IFloatingFilterParams {
  items?: any[];
  setData?: Observable<any>,
  idLabelOption: string,
  descriptionLabelOption: string,
}

@Component({
  selector: 'app-ob-simple-select-filter-grid',
  templateUrl: './ob-simple-select-filter-grid.component.html',
  styleUrls: ['./ob-simple-select-filter-grid.component.scss']
})
export class ObSimpleSelectFilterGridComponent implements IFloatingFilter, AgFrameworkComponent<ObSelectFilterGridParams>, AfterViewInit, OnDestroy {

  private params: ObSelectFilterGridParams;
  public items: any[];
  public idItemSeleccionado: any = '*';
  public idLabelOption: string;
  public descriptionLabelOption: string;
  public textoFiltro: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public valueSelected: any;

  agInit(params: ObSelectFilterGridParams): void {
    this.params = params;
    this.idLabelOption = params.idLabelOption;
    this.descriptionLabelOption = params.descriptionLabelOption;
    params.setData.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.items = data;
    });
  }

  ngAfterViewInit(): void {
    this.onChange();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onChange(): void {
    this.params.parentFilterInstance((instance) => {
      const model = this.buildModel();
      (<TextFilter>instance).onFloatingFilterChanged(model.type, model.filter);
    });
  }

  onParentModelChanged(parentModel: any): void {
    if (!parentModel) {
      this.textoFiltro = '*';
    } else {
      this.textoFiltro = parentModel.filter;
    }
  }

  buildModel() {
    if (this.idItemSeleccionado === '*') {
      return { type: null, filter: null };
    }
    return {
      filterType: 'text',
      type: 'contains',
      filter: this.idItemSeleccionado
    }
  }

  getLabelOption(indice: number): string {
    if (this.idLabelOption === null || this.idLabelOption === undefined || this.idLabelOption.trim().length < 0) {
      return this.items[indice][this.descriptionLabelOption];
    } else {
      return joinWords(DEFAULT_SEPARATOR, this.items[indice][this.idLabelOption],
        this.items[indice][this.descriptionLabelOption]);
    }
  }
}
