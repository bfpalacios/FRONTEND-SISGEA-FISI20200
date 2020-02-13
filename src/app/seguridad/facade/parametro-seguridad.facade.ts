import {Injectable} from "@angular/core";
import {AppState} from "../../shared/store/app.reducers";
import {Store} from "@ngrx/store";
import {
  AddParametroSeguridad, DeleteParametroSeguridad,
  GetAllParametroSeguridad, UpdateParametroSeguridad
} from "../../shared/store/actions/seguridad/parametro-seguridad.actions";
import {ParametroSeguridad} from "../models";
import { GetAllTipoAutenticacion } from '../../shared/store/actions/seguridad/tipo-autenticacion.actions';

@Injectable()
export class ParametroSeguridadFacade {

  constructor(private store: Store<AppState>) {
  }

  buscarTodos(): void {
    this.store.dispatch(new GetAllParametroSeguridad());
  }

  registrar(parametroSeguridad: ParametroSeguridad): void {
    this.store.dispatch(new AddParametroSeguridad(parametroSeguridad));
  }

  actualizar(parametroSeguridad: ParametroSeguridad): void {
    this.store.dispatch(new UpdateParametroSeguridad(parametroSeguridad));
  }

  eliminar(parametroSeguridad: ParametroSeguridad): void {
    this.store.dispatch(new DeleteParametroSeguridad(parametroSeguridad));
  }

  initData(){
    this.store.dispatch(new GetAllTipoAutenticacion());
  }

}
