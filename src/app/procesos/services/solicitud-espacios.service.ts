import { HttpService } from '../../shared';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { Observable } from 'rxjs';
import { SolicitudEspacio } from '../model';
@Injectable({
  providedIn: 'root'
})
export class SolicitudEspaciosService extends HttpService {

  constructor(
    injector: Injector,
    httpClient: HttpClient,
    store: Store<AppState>
  ) {
    let path;
    store.select('globalData').subscribe(data => path = data.pathEndpoints.MANT_GENERAL);
    super(injector, httpClient, `${path}solicitud-espacios`);
  }

  buscarTodos(): Observable<any>  {
    return super.get();
  }

  registrar(data: any): Observable<any>  {
    return super.post(data);
  }

  actualizar(solicitudEspacio: SolicitudEspacio): Observable<any>  {

    return super.put(solicitudEspacio,solicitudEspacio.idSolicitud);
  }

  cargar(files: File[]): Observable<any>  {
    let formData: FormData  = new FormData();
    files.forEach(function(item){
        formData.append("file[]", item, item.name);
    });
    console.log(files,formData);
    return super.upload(formData, 'carga-archivo', {responseType: 'text'});
  }

  aprobar (solicitudEspacio: SolicitudEspacio): Observable<any>  {
    return super.put(solicitudEspacio,'aprobar/' + solicitudEspacio.idSolicitud);
  }

}
