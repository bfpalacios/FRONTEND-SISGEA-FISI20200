import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Table } from '../../utils/tabla.utils';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() tabla : Table

  constructor() { }

  ngOnInit() {

  }

  onChangeCheckBoxTable(item: any){
    //console.log(item);
  }

}
