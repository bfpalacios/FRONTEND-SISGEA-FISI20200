import { Injectable, Injector, Inject } from '@angular/core';
import { HttpService } from '../../shared';
import { HttpClient } from '@angular/common/http';
import { SEC_CONTEXT_PATH } from '../../shared/utils';
import { Observable } from 'rxjs';
import { Menu } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient, @Inject(SEC_CONTEXT_PATH) context: string) {
    super(injector, httpClient, 'sistemas', context);
  }

  buscarPorSistema(idSistema: number, presentacion: string): Observable<any> {
    return super.get(`/${idSistema}/menus`, super.getHttpParamsFromCriteria({ presentacion: presentacion }));
  }

  registrar(menu: Menu): Observable<any> {
    return super.post(menu, `${menu.idSistema}/menus`);
  }

  actualizar(menu: Menu): Observable<any> {
    return super.put(menu, `${menu.idSistema}/menus/${menu.idMenu}`);
  }

  eliminar(menu: Menu): Observable<any> {
    return super.delete(`${menu.idSistema}/menus/${menu.idMenu}`);
  }

}