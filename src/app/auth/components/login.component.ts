import { Component, ViewChild, OnInit, Inject, OnDestroy } from '@angular/core';
import { AuthFacade } from '../facade/auth.facade';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { LoginForm } from '../models/login.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Sistema } from '../../seguridad/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//Temporal
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('alert') alert: AlertComponent;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  loginFormGroup: FormGroup;
  customErrorMessagesUsername: ErrorMessage[] = [{
    error: 'required', format: (label, error) => `Ingrese Usuario.`
  }]
  customErrorMessagesPassword: ErrorMessage[] = [{
    error: 'required', format: (label, error) => `Ingrese Contraseña.`
  }];
  customErrorMessagesSistema: ErrorMessage[] = [{
    error: 'required', format: (label, error) => 'Ingrese Sistema.'
  }];
  errorMessage: string;
  sistemas: Sistema[] = [];
  loading: boolean = false;

  constructor(
    private authFacade: AuthFacade,
    private store: Store<AppState>,
    private _router: Router,
  ) {
    console.log('entro1');
  }

  ngOnInit() {
    console.log('entro2');
    this.loginFormGroup = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'contrasenia': new FormControl('', [Validators.required]),
      'idSistema': new FormControl(1, [Validators.required])
    });
    //this.authFacade.initData();
    this.store.select('auth')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(auth => {
        this.errorMessage = auth.errorMessage;
        if (this.errorMessage) {
          this.alert.show({ type: 'danger', msg: this.errorMessage });
        }
        this.loading = auth.loading;
      });
    this.store.select('sistema').pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => this.sistemas = state.data);
  }

  onLogin() {
    this.loginFormGroup.controls['idSistema'].setValue(this.searchSicf());
    let loginForm: LoginForm = this.loginFormGroup.value;
    //this.authFacade.logIn(loginForm);
    //Temporal
    this._router.navigate(['/mantenimiento']);
  }

  searchSicf():number{
    for(let sistema of this.sistemas){
      if(sistema.descripcionSistema=='SICF') return sistema.idSistema;
    }
    return 1;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
