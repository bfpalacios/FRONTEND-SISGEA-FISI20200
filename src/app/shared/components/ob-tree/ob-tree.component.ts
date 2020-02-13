import { Component, OnInit, EventEmitter, Input, ViewChild, Output } from '@angular/core';
import { NodeItem, TreeNgxComponent, TreeCallbacks } from 'tree-ngx';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

export interface DefKeysTree {
  id: string,
  name: string,
  children: string
}

@Component({
  selector: 'app-ob-tree',
  templateUrl: './ob-tree.component.html',
  styleUrls: ['./ob-tree.component.scss']
})
export class ObTreeComponent implements OnInit {
  @Input() defKeys: DefKeysTree;
  @Input() btns: boolean = false;
  @Input() filter: boolean = false;

  @Output() onBtnAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBtnEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBtnDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();

  public textFilterValue: string = '';

  @ViewChild('treeRef') treeRef: TreeNgxComponent;
  @ViewChild('perfectScrollTree') perfectScrollTree: PerfectScrollbarComponent;

  treeCallbacks: TreeCallbacks;
  nodeItems: NodeItem<any>[];
  selected: NodeItem<any> = null;

  constructor() { }

  ngOnInit() {
    this.defKeys = {
      name: (this.defKeys.name) ? this.defKeys.name : 'name',
      id: (this.defKeys.id) ? this.defKeys.id : 'id',
      children: (this.defKeys.children) ? this.defKeys.children : 'children'
    }
    this.nodeItems = [];
    this.treeCallbacks = {
      select: (item) => {
        this.getSelected(item);
      }
    }
  }

  public updateTree(tree: any[]) {
    let nodeItems = [];
    for (let node of tree) {
      nodeItems.push(this.parseNodeItem(node));
    }
    this.nodeItems = [...nodeItems];
    this.perfectScrollTree.directiveRef.update();
  }

  private parseNodeItem(node: any): NodeItem<any> {
    if (!node[this.defKeys.children] || node[this.defKeys.children].length === 0) {
      return {
        id: node[this.defKeys.id],
        name: node[this.defKeys.name],
        item: node
      }
    } else {
      let _children = [];
      let childrenNode = node[this.defKeys.children];
      for (let i = 0; i < childrenNode.length; i++) {
        _children[i] = this.parseNodeItem(childrenNode[i]);
      }
      return {
        id: node[this.defKeys.id],
        name: node[this.defKeys.name],
        children: _children,
        item: node
      }
    }
  }

  private unParseTree(node: NodeItem<any>): any {
    return node.item;
  }

  public clickBtnAdd() {
    let newNode = {};
    newNode[this.defKeys.id] = '';
    newNode[this.defKeys.children] = [];
    this.onBtnAdd.emit(newNode);
  }

  public clickBtnEdit() {
    let itemSelected = this.unParseTree(this.selected);
    this.onBtnEdit.emit(itemSelected);
  }

  public clickBtnDelete() {
    let itemSelected = this.unParseTree(this.selected);
    this.onBtnDelete.emit(itemSelected);
  }

  public getSelected(nodeItem: NodeItem<any>) {
    this.selected = nodeItem.item;
    this.onSelected.emit(this.selected);
  }

  public addNode(value: any) {
    if (this.selected) {
      let newNode = this.parseNodeItem(value);
      this.treeRef.addNodeById(newNode, this.selected.id);
    }
  }

  public editNode(value: any) {
    if (this.selected) {
      this.treeRef.editItemById(this.selected.id, value);
      this.treeRef.editNameById(this.selected.id, value[this.defKeys.name]);
    }
  }

  public removeNode() {
    if (this.selected) {
      this.treeRef.deleteById(this.selected.id);
      this.selected == null;
    }
  }
}