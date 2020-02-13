import { Component, OnInit, Input, Renderer2, ElementRef, Output, EventEmitter, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TabPane } from '../../../shared/utils/tab-pane';

@Component({
  selector: 'app-tab-pane',
  templateUrl: './tab-pane.component.html',
  styleUrls: ['./tab-pane.component.scss']
})
export class TabPaneComponent implements OnInit, AfterViewInit {

  @Input() listaTab: TabPane[];
  @Output() onSelectTab: EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren('link') query: QueryList<ElementRef>;
  private elements: ElementRef[] = [];

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.elements = this.query.toArray();
  }

  changeTab(item: TabPane) {
    for (let element of this.elements) {
      let index = parseInt(element.nativeElement.getAttribute('data-index'));
      if (item != this.listaTab[index]) {
        this.renderer.removeClass(element.nativeElement, 'activo');
        this.listaTab[index].divVisible = false;
      } else {
        this.renderer.addClass(element.nativeElement, 'activo');
        this.listaTab[index].divVisible = true;
      }
    }
    if (this.onSelectTab) this.onSelectTab.emit(item);
  }

}
