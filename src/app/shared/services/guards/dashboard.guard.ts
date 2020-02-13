import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SEC_AUTH } from '../../utils';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Logout } from '../../store/actions/auth/auth.actions';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private tokenService: TokenService,
    @Inject(SEC_AUTH) private auth: boolean
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //console.log('canactivate dashboard guard');
    if (this.auth) {
      if(this.tokenService.isTokenValid()){
        return true;
      }
      this.store.dispatch(new Logout());
      return false;
    }
    return true;
  }

}
