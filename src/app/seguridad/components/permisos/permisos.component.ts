import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { TYPES, Type } from '../../../shared/utils';
import { Subject } from 'rxjs';
import { TabPane } from '../../../shared/utils/tab-pane';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  type: Type;

  listaTab : TabPane[] = [
    {
      tituloTabPane: 'Perfiles y Usuarios',
      tituloId: 'perfil-usuario',
      divContenidoPane: 'divPerfilUsuario',
      divVisible: true
    },
    {
      tituloTabPane: 'Perfiles y Recursos',
      tituloId: 'perfil-recurso',
      divContenidoPane: 'divPerfilRecurso',
      divVisible: false
    }
  ]


  constructor(
  ) {
    this.type = TYPES.ASIG_PERMIS;
  }

  ngOnInit() {


  }

  ngAfterViewInit(){

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



}
