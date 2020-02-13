import { Injectable, Injector, Inject } from '@angular/core';
import { HttpService } from '../../shared';
import { HttpClient } from '@angular/common/http';
import { MenuRecurso } from '../models';
import { Observable } from 'rxjs';
import { SEC_CONTEXT_PATH } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class MenuRecursoService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, @Inject(SEC_CONTEXT_PATH) context: string) {
    super(injector, httpClient, `sistemas`, context);
  }

  buscarPorSistemaMenu(idSistema: number, idMenu: number): Observable<any> {
    return super.get(`/${idSistema}/menus/${idMenu}/recursos`);
  }

  registrar(menuRecurso: MenuRecurso): Observable<any> {
    return super.post(menuRecurso, `${menuRecurso.idSistema}/menus/${menuRecurso.idMenu}/recursos/${menuRecurso.idRecurso}`);
  }

  actualizar(menuRecurso: MenuRecurso): Observable<any> {
    return super.put(menuRecurso, `${menuRecurso.idSistema}/menus/${menuRecurso.idMenu}/recursos/${menuRecurso.idRecurso}`);
  }

  eliminar(menuRecurso: MenuRecurso): Observable<any> {
    return super.delete(`${menuRecurso.idSistema}/menus/${menuRecurso.idMenu}/recursos/${menuRecurso.idRecurso}`);
  }

}