import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { TIPO_PRES_MENU, PerfilMenuRecursoRequest, PerfilMenuRecursoNodo } from '../models';
import { GetMenuBySistemaPerfil, AddPerfilMenuRecurso } from '../../shared/store/actions/seguridad/asignacion-permisos.actions';

@Injectable()
export class PerfilMenuRecursoFacade {

  constructor(private store: Store<AppState>) { }

  obtenerPostBody(idSistema: number, idPerfil: number, nodos: PerfilMenuRecursoNodo[]): PerfilMenuRecursoRequest[] {
    let data: PerfilMenuRecursoRequest[] = [];
    this.getLastChildren(nodos)
      .filter(nodo => nodo.categoriasRecursos && nodo.categoriasRecursos.length > 0)
      .forEach(nodo => {
        nodo.categoriasRecursos.forEach(categoria => {
          categoria.recursos.forEach(recurso => {
            if (recurso.idsAccionesAsignadas && recurso.idsAccionesAsignadas.length > 0) {
              data.push({
                idSistema: idSistema,
                idPerfil: idPerfil,
                idMenu: nodo.idMenu,
                idRecurso: recurso.idRecurso,
                idsAccionesAsignadas: recurso.idsAccionesAsignadas
              })
            }
          });
        });
      });
    return data;
  }

  private getLastChildren(nodos: PerfilMenuRecursoNodo[]) {
    let items: PerfilMenuRecursoNodo[] = [];
    for (let it of nodos) {
      this.getLastChild(it, items);
    }
    return items;
  }

  private getLastChild(nodo: PerfilMenuRecursoNodo, children: PerfilMenuRecursoNodo[]) {
    if (!nodo.subPerfilMenuRecursoArbolAsignacionResponse || nodo.subPerfilMenuRecursoArbolAsignacionResponse.length === 0) {
      children.push(nodo);
      return children;
    } else {
      for (let child of nodo.subPerfilMenuRecursoArbolAsignacionResponse) {
        this.getLastChild(child, children);
      }
    }
  }

  registrar(idSistema: number, idPerfil: number, data: PerfilMenuRecursoRequest[]) {
    this.store.dispatch(new AddPerfilMenuRecurso({ idSistema: idSistema, idPerfil: idPerfil, data: data }));
  }

  buscarArbolAsignaciones(idSistema: number, idPerfil: number) {
    this.buscarAsignaciones(idSistema, idPerfil, TIPO_PRES_MENU.ARBOL);
  }

  buscarAsignaciones(idSistema: number, idPerfil: number, presentacion: string) {
    this.store.dispatch(new GetMenuBySistemaPerfil({ idSistema, idPerfil, presentacion }));
  }

}