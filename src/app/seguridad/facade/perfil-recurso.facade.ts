import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { GetAllPerfilRecurso, AddPerfilRecurso, UpdatePerfilRecurso, DeletePerfilRecurso } from '../../shared/store/actions/seguridad/perfil-recurso.actions';
import { GetAllPerfil } from '../../shared/store/actions/seguridad/perfil.actions';
import { GetAllUsuario } from '../../shared/store/actions/seguridad/usuario.actions';
import { PerfilService } from '../../seguridad/services/perfil.service';
import { RecursoService } from '../../seguridad/services/recurso.service';

@Injectable()
export class PerfilRecursoFacade {

  constructor(
    private store: Store<AppState>,
    private perfilService: PerfilService,
    private recursoService: RecursoService
  ){

  }

  buscarTodos(){
    this.store.dispatch(new GetAllPerfilRecurso());
  }

  registrar(obj: any){
    this.store.dispatch(new AddPerfilRecurso(obj));
  }

  actualizar(obj: any){
    this.store.dispatch(new UpdatePerfilRecurso(obj));
  }

  eliminar(obj: any){
    this.store.dispatch(new DeletePerfilRecurso(obj));
  }
  
  initData(){
    this.store.dispatch(new GetAllPerfil());
    this.store.dispatch(new GetAllUsuario());
  }

  buscarPerfiles(){
    return this.perfilService.buscarTodos();
  }

  buscarRecursos(){
    return this.recursoService.buscarTodos();
  }
}