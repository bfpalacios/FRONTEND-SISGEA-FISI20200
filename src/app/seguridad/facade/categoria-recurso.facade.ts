import {Injectable} from "@angular/core";
import {AppState} from "../../shared/store/app.reducers";
import {Store} from "@ngrx/store";
import {
  AddCategoriaRecurso, DeleteCategoriaRecurso,
  GetAllCategoriaRecurso, UpdateCategoriaRecurso
} from "../../shared/store/actions/seguridad/categoria-recurso.actions";
import {CategoriaRecurso} from "../models";
import { GetAllAccion } from '../../shared/store/actions/seguridad/accion.actions';

@Injectable()
export class CategoriaRecursoFacade {

  constructor(private store: Store<AppState>) {
  }

  buscarTodos(): void {
    this.store.dispatch(new GetAllCategoriaRecurso());
  }

  registrar(categoriaRecurso: CategoriaRecurso): void {
    this.store.dispatch(new AddCategoriaRecurso(categoriaRecurso));
  }

  actualizar(categoriaRecurso: CategoriaRecurso): void {
    this.store.dispatch(new UpdateCategoriaRecurso(categoriaRecurso));
  }

  eliminar(categoriaRecurso: CategoriaRecurso): void {
    this.store.dispatch(new DeleteCategoriaRecurso(categoriaRecurso));
  }

  buscarAcciones(): void{
    this.store.dispatch(new GetAllAccion());
  }
}
