import { Action } from '@ngrx/store';
import { LoginForm } from '../../../../auth/models/login.model';
import { NavData } from '../../../../_nav';
import { Permission } from '../../reducers/auth/auth.reducer';

export const authActions = {
  LOGIN: '[Auth] Login',
  LOGIN_SUCCESS: '[Auth] Login success',
  LOGIN_FAIL: '[Auth] Login fail',
  LOGOUT: '[Auth] Logout',
  LOGOUT_SUCCESS: '[Auth] Logout success',
  LOGOUT_FAIL: '[Auth] Logout fail',
  SET_PERMISSIONS: '[Auth] Establecer permisos',
  SET_MENU_OPTIONS: '[Auth] Establecer opciones en el menú',
  SET_USER: '[Auth] Establecer usuario', 
  INIT_APP: '[App] Start app initializer',
  INIT_APP_FAIL: '[App] Start app initializer fail',
  RESET: '[Auth] Reset'
};

export class Login implements Action {
  readonly type = authActions.LOGIN;
  constructor(public payload: LoginForm){}
}

export class LoginSuccess implements Action {
  readonly type = authActions.LOGIN_SUCCESS;
  constructor(public payload: any){}
}

export class LoginFail implements Action {
  readonly type = authActions.LOGIN_FAIL;
  constructor(public payload: string){}
}

export class Logout implements Action {
  readonly type = authActions.LOGOUT;
  constructor(public payload: any = null){}
}

export class LogoutSuccess implements Action {
  readonly type = authActions.LOGOUT_SUCCESS;
  constructor(public payload: any = null){}
}

export class LogoutFail implements Action {
  readonly type = authActions.LOGOUT_FAIL;
  constructor(public payload: any = null){}
}

export class SetPermissions implements Action {
  readonly type = authActions.SET_PERMISSIONS;
  constructor(public payload: Permission[]){}
}

export class SetMenuOptions implements Action {
  readonly type = authActions.SET_MENU_OPTIONS;
  constructor(public payload: NavData[]){}
}

export class SetUser implements Action {
  readonly type = authActions.SET_USER;
  constructor(public payload: any){}
}

export class StartAppInitializer implements Action {
  readonly type = authActions.INIT_APP;
  constructor(public payload: any = null){}
}
export class StartAppInitializerFail implements Action {
  readonly type = authActions.INIT_APP_FAIL;
  constructor(public payload: any = null){}
}

export class ResetAuth implements Action {
  readonly type = authActions.RESET;
  constructor(public payload: any = null) {}
}

export type Actions 
  = Login 
  | LoginSuccess
  | LoginFail
  | Logout
  | LogoutSuccess
  | LogoutFail
  | SetPermissions
  | SetMenuOptions
  | SetUser
  | StartAppInitializer
  | StartAppInitializerFail
  | ResetAuth;