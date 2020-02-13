import { HttpService } from '../../shared/services/http/http.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService extends HttpService {

  constructor(
    injector: Injector,
    httpClient: HttpClient,
    store: Store<AppState>
  ) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_GENERAL);
    super(injector, httpClient, `${path}docente`);
  }

  buscarTodos(): Observable<any>  {
    return super.get();
  }

  cargar(files: File[]): Observable<any>  {
    let formData: FormData  = new FormData();
    files.forEach(function(item){
        formData.append("file[]", item, item.name);
    });
    console.log(files,formData);
    return super.upload(formData, 'cargar', {responseType: 'text'});
  }


}
