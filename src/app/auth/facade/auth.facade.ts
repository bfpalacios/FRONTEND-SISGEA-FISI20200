import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { Login } from '../../shared/store/actions/auth/auth.actions';
import { LoginForm } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthFacade {

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) { }

  logIn(data: LoginForm): Observable<any>  {
    return this.authService.logIn(data);
  }

}