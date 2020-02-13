import { Injectable } from "@angular/core";
import { AppState } from "../../shared/store/app.reducers";
import { Store } from "@ngrx/store";
import {
  AddSistema, DeleteSistema,
  GetAllSistema, UpdateSistema
} from "../../shared/store/actions/seguridad/sistema.actions";
import { Sistema } from "../models";
import { GetAllParametroSeguridad } from '../../shared/store/actions/seguridad/parametro-seguridad.actions';
import { RESOURCE_ACTIONS, OB_TIME_UTIL } from '../../shared/utils';

@Injectable()
export class SistemaFacade {

  constructor(private store: Store<AppState>) {
  }

  buscarTodos(): void {
    this.store.dispatch(new GetAllSistema());
  }

  guardar(sistema: Sistema, action: string) {
    sistema.tiempoExpiracionToken = OB_TIME_UTIL.convertTimeToMiliseconds(sistema.tiempoExpiracionToken);
    switch (action) {
      case RESOURCE_ACTIONS.REGISTRO: {
        this.registrar(sistema);
        break;
      }
      case RESOURCE_ACTIONS.ACTUALIZACION: {
        this.actualizar(sistema);
        break;
      }
    }
  }

  registrar(sistema: Sistema): void {
    this.store.dispatch(new AddSistema(sistema));
  }

  actualizar(sistema: Sistema): void {
    this.store.dispatch(new UpdateSistema(sistema));
  }

  eliminar(sistema: Sistema): void {
    this.store.dispatch(new DeleteSistema(sistema));
  }

  initData(): void {
    this.store.dispatch(new GetAllParametroSeguridad());
  }
}
