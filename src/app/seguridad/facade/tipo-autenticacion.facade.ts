import {Injectable} from "@angular/core";
import {AppState} from "../../shared/store/app.reducers";
import {Store} from "@ngrx/store";
import {
  AddTipoAutenticacion, DeleteTipoAutenticacion,
  GetAllTipoAutenticacion, UpdateTipoAutenticacion
} from "../../shared/store/actions/seguridad/tipo-autenticacion.actions";
import {TipoAutenticacion} from "../models";

@Injectable()
export class TipoAutenticacionFacade {

  constructor(private store: Store<AppState>) {
  }

  buscarTodos(): void {
    this.store.dispatch(new GetAllTipoAutenticacion());
  }

  registrar(tipoAutenticacion: TipoAutenticacion): void {
    this.store.dispatch(new AddTipoAutenticacion(tipoAutenticacion));
  }

  actualizar(tipoAutenticacion: TipoAutenticacion): void {
    this.store.dispatch(new UpdateTipoAutenticacion(tipoAutenticacion));
  }

  eliminar(tipoAutenticacion: TipoAutenticacion): void {
    this.store.dispatch(new DeleteTipoAutenticacion(tipoAutenticacion));
  }
}
