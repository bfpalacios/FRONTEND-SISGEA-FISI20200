import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SEC_AUTH } from '../../utils';
import { TokenService } from '../token/token.service';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { ResetAuth } from '../../store/actions/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private _router: Router,
    private tokenService: TokenService,
    private store: Store<AppState>,
    @Inject(SEC_AUTH) private auth: boolean
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //console.log('canactivate login guard');
    if (this.auth) {
      if (this.tokenService.isTokenValid()) {
        this._router.navigate(['/dashboard']);
        return false;
      } else {
        this.store.dispatch(new ResetAuth());
        return true;
      }
    }
    return true;
  }

}
