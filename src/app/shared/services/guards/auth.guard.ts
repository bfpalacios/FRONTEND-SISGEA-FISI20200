import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Permission } from '../../store/reducers/auth/auth.reducer';
import { TokenService } from '../token/token.service';
import { extractSimpleArrayFromObjArray, SEC_AUTH } from '../../utils';
import { Logout } from '../../store/actions/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  private permisos: Permission[];

  constructor(
    private _router: Router,
    private store: Store<AppState>,
    private tokenService: TokenService,
    @Inject(SEC_AUTH) private auth: boolean
  ) {
    this.store.select('auth').subscribe(state => this.permisos = state.permissions);
  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //console.log('canactivate page');
    if (this.auth) {
      if (this.tokenService.isTokenValid()) {
        return true;
      }
      this.store.dispatch(new Logout());
      return false;
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //console.log('canactivate child page');
    const data = childRoute.data;
    if (this.auth) {
      if (this.tokenService.isTokenValid()) {
        const permissions: Permission[] = data.permissions;
        if (permissions) {
          //console.log('ruta con permisos');
          const auths = extractSimpleArrayFromObjArray(this.permisos, 'idRecurso');
          let i = 0;
          let ok = false;
          while (i < permissions.length && !ok) {
            ok = (auths.indexOf(permissions[i]) !== -1);
            i++;
          }
          //console.log(ok);
          if (ok) {
            return true;
          }
          this._router.navigate(['/dashboard']);
          return false;
        }
        return true;
      }
      this.store.dispatch(new Logout());
      return false;
    }
    return true;
  }

}
