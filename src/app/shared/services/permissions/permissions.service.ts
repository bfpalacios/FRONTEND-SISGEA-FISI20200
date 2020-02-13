import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Permission } from '../../store/reducers/auth/auth.reducer';
import { filterObjArray, filterObjsArray, extractSimpleArrayFromObjArray } from '../../utils/array.util';
import { SEC_AUTH } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private permissions: Permission[];

  constructor(
    private store: Store<AppState>,
    @Inject(SEC_AUTH) private auth: boolean
  ){
    this.store.select('auth').subscribe(state => this.permissions = state.permissions);
  }

  // este metodo probablemente cambie 
  getValidActions(resourceName: string): string[] {
    if(this.auth){
      const auth = filterObjsArray(this.permissions, 'idRecurso', resourceName);
      if(auth !== null){
        const acciones = extractSimpleArrayFromObjArray(auth,'accionesAsignadas').join(',');
        return acciones.split(',');
      }
      return [];
    }
    return ('1,2,3,4,5,6').split(',');
  }

  hasPermission(actions: string[], action: string): boolean{
    return actions.indexOf(action) !== -1;
  }

}