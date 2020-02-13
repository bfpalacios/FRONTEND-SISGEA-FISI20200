import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { MenuRecurso } from '../models';
import { AddMenuRecurso, UpdateMenuRecurso, DeleteMenuRecurso, GetAllMenuRecurso } from '../../shared/store/actions/seguridad/menu-recurso.actions';

@Injectable()
export class MenuRecursoFacade {

  constructor(private store: Store<AppState>) { }

  registrar(menuRecurso: MenuRecurso) {
    this.store.dispatch(new AddMenuRecurso(menuRecurso));
  }

  actualizar(menuRecurso: MenuRecurso) {
    this.store.dispatch(new UpdateMenuRecurso(menuRecurso));
  }

  eliminar(menuRecurso: MenuRecurso) {
    this.store.dispatch(new DeleteMenuRecurso(menuRecurso));
  }

  buscarPorSistemaMenu(idSistema: number, idMenu: number) {
    this.store.dispatch(new GetAllMenuRecurso({ idSistema, idMenu }));
  }
}