import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducers';
import { Login } from '../../shared/store/actions/auth/auth.actions';
import { LoginForm } from '../models/login.model';
import { GetAllSistemaLiberado } from '../../shared/store/actions/seguridad/sistema.actions';

@Injectable()
export class AuthFacade {

  constructor(
    private store: Store<AppState>
  ) { }

  logIn(data: LoginForm) {
    this.store.dispatch(new Login(data));
  }

  initData(){
    this.store.dispatch(new GetAllSistemaLiberado());
  }

}