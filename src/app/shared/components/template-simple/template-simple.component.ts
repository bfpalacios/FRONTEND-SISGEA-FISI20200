import { Component, OnInit, Input } from '@angular/core';
import { Type } from '../../utils';

@Component({
  selector: 'app-template-simple',
  templateUrl: './template-simple.component.html',
  styleUrls: ['./template-simple.component.scss']
})
export class TemplateSimpleComponent implements OnInit {
  @Input() type: Type;
  @Input() title: string = '';
  constructor() { }

  ngOnInit() {
  }

}
