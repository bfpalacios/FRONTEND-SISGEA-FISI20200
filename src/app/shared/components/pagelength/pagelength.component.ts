import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ManagePagination, setPageSizeToPagination } from '../../utils/paginacion.util';

@Component({
  selector: 'app-pagelength',
  templateUrl: './pagelength.component.html',
  styleUrls: ['./pagelength.component.scss']
})
export class PagelengthComponent implements OnInit {
  @Input() lengths: number[] = [10, 50, 100, 200, 1000];
  @Input() gridApi;
  @Input() managePagination: ManagePagination;
  @Input() paginationServer: boolean;
  @Output() fnPageSizeChanged: EventEmitter<any> = new EventEmitter<any>();

  @Input() pageSize:number = 10;

  constructor() { }

  ngOnInit() {
    if(this.paginationServer){
      this.lengths  = [100, 200, 1000];
      this.pageSize = 100;
      setPageSizeToPagination(this.pageSize,this.managePagination)
    }
  }

  onPageSizeChanged() {
    this.gridApi.paginationSetPageSize(Number(this.pageSize));
    if(this.paginationServer){
      setPageSizeToPagination(this.pageSize,this.managePagination);
      this.fnPageSizeChanged.emit();
    }
  }

}
