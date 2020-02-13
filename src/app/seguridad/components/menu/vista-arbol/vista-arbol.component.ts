import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { Sistema, MenuArbol } from '../../../models';
import { ModalComponent } from '../../../../shared';
import { ObTreeComponent, DefKeysTree } from '../../../../shared/components/ob-tree/ob-tree.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/store/app.reducers';
import { MenuFacade } from '../../../facade';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResetMenuArbol } from '../../../../shared/store/actions/seguridad/menu.actions';

@Component({
  selector: 'app-vista-arbol',
  templateUrl: './vista-arbol.component.html',
  styleUrls: ['./vista-arbol.component.scss']
})
export class VistaArbolComponent implements OnInit, OnDestroy {
  @ViewChild('md') md: ModalComponent;
  @ViewChild('menuArbol') menuArbol: ObTreeComponent;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  sistema: Sistema = null;
  defKeysTree: DefKeysTree = {
    id: 'idMenu',
    name: 'descripcionMenu',
    children: 'subMenusArboles'
  }
  nodeItems: MenuArbol[] = [];
  constructor(private store: Store<AppState>, private menuFacade: MenuFacade) { }

  ngOnInit() {
    this.store.select('menus', 'dataArbol').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.nodeItems = data.length === 0 ? [] : JSON.parse(JSON.stringify(data[0].subMenusArboles));
        this.menuArbol.updateTree(this.nodeItems);
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetMenuArbol());
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  show(sistema) {
    this.sistema = sistema;
    this.menuFacade.buscarPorSistemaPresentacionArbol(this.sistema.idSistema);
    this.md.show();
  }

}
