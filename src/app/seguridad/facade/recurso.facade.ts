import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { GetAllRecurso, AddRecurso, UpdateRecurso, DeleteRecurso } from '../../shared/store/actions/seguridad/recurso.actions';
import { RecursoSeg } from '../models';
import { GetAllCategoriaRecurso } from '../../shared/store/actions/seguridad/categoria-recurso.actions';

@Injectable()
export class RecursoFacade {

  constructor(private store: Store<AppState>) { }

  buscarTodos() {
    this.store.dispatch(new GetAllRecurso());
  }

  registrar(recurso: RecursoSeg) {
    recurso.asignable = recurso.asignable === null ? false: recurso.asignable;
    recurso.auditable = recurso.auditable === null ? false: recurso.auditable;
    this.store.dispatch(new AddRecurso(recurso));
  }

  actualizar(recurso: RecursoSeg) {
    recurso.asignable = recurso.asignable === null ? false: recurso.asignable;
    recurso.auditable = recurso.auditable === null ? false: recurso.auditable;
    this.store.dispatch(new UpdateRecurso(recurso));
  }

  eliminar(recurso: RecursoSeg) {
    this.store.dispatch(new DeleteRecurso(recurso));
  }

  initData() {
    this.store.dispatch(new GetAllCategoriaRecurso());
  }
}