import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ManagePagination } from '../../utils/paginacion.util';


@Component({
  selector: 'app-pie-paginacion',
  templateUrl: './pie-paginacion.component.html',
  styleUrls: ['./pie-paginacion.component.scss']
})
export class PiePaginacionComponent implements OnInit {

  @Output() clickBtnFirstPage: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickBtnPreviousPage: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickBtnNextPage: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickBtnLastPage: EventEmitter<any> = new EventEmitter<any>();
  @Input() managePagination: ManagePagination;

  constructor() { }

  ngOnInit() {
  }

  btnFirstPage(){
    this.clickBtnFirstPage.emit();
  }

  btnPreviousPage(){
    this.clickBtnPreviousPage.emit();
  }

  btnNextPage(){
    this.clickBtnNextPage.emit();
  }

  btnLastPage(){
    this.clickBtnLastPage.emit();
  }

}
