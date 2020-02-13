import { AppState } from '../../shared/store/app.reducers';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetAllMenu, AddMenu, UpdateMenu, DeleteMenu, GetAllMenuArbol } from '../../shared/store/actions/seguridad/menu.actions';
import { Menu, TIPO_PRES_MENU, MenuRecurso } from '../models';
import { GetAllSistema } from '../../shared/store/actions/seguridad/sistema.actions';
import { GetAllTipoMenu } from '../../shared/store/actions/seguridad/tipo-menu.action';
import { GetAllRecurso } from '../../shared/store/actions/seguridad/recurso.actions';
import { RESOURCE_ACTIONS, extractSimpleArrayFromObjArray } from '../../shared/utils';

@Injectable()
export class MenuFacade {
  constructor(private store: Store<AppState>) { }

  buscarPorSistema(idSistema: number, presentacion: string) {
    switch (presentacion) {
      case TIPO_PRES_MENU.SIMPLE:
        this.store.dispatch(new GetAllMenu({ idSistema, presentacion }));
        break;
      case TIPO_PRES_MENU.ARBOL:
        this.store.dispatch(new GetAllMenuArbol({ idSistema, presentacion }));
        break;
      default:
        this.store.dispatch(new GetAllMenu({ idSistema, presentacion }));
    }
  }

  buscarPorSistemaVistaSimple(idSistema: number) {
    this.buscarPorSistema(idSistema, TIPO_PRES_MENU.SIMPLE);
  }

  buscarPorSistemaPresentacionArbol(idSistema: number) {
    this.buscarPorSistema(idSistema, TIPO_PRES_MENU.ARBOL);
  }

  guardar(formValue: any, action: string) {
    /*let menusRecursosForm = formValue.menusRecursos;
    let menusRecursos: MenuRecurso[] = [];
    Object.keys(menusRecursosForm).forEach(key => menusRecursos.push(
      { idRecurso: key, idsAccionesPermitidas: extractSimpleArrayFromObjArray(menusRecursosForm[key][1], 'idAccion') }
    ));
    formValue.menusRecursos = menusRecursos;*/
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO: {
        this.registrar(formValue);
        break;
      }
      case RESOURCE_ACTIONS.ACTUALIZACION: {
        this.actualizar(formValue);
        break;
      }
    }
  }

  registrar(menu: Menu) {
    this.store.dispatch(new AddMenu(menu));
  }

  actualizar(menu: Menu) {
    this.store.dispatch(new UpdateMenu(menu));
  }

  eliminar(menu: Menu) {
    this.store.dispatch(new DeleteMenu(menu));
  }

  initData() {
    this.store.dispatch(new GetAllSistema());
    this.store.dispatch(new GetAllTipoMenu());
    this.store.dispatch(new GetAllRecurso());
  }
}