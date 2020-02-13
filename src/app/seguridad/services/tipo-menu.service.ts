import { Inject, Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SEC_CONTEXT_PATH } from "../../shared/utils";
import { HttpService } from "../../shared/services";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TipoMenuService extends HttpService {

  constructor(injector: Injector, httpClient: HttpClient,
    @Inject(SEC_CONTEXT_PATH) context: string) {
    super(injector, httpClient, 'tipos-menus', context);
  }

  buscarTodos(): Observable<any> {
    return super.get();
  }

}
