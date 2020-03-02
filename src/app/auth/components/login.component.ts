import { Component, ViewChild, OnInit, Inject, OnDestroy } from '@angular/core';
import { AuthFacade } from '../facade/auth.facade';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { LoginForm } from '../models/login.model';
import { MESSAGE_AUTH_500_BODY, MESSAGE_AUTH_ERROR_TITLE, MESSAGE_AUTH_ERROR_BODY } from '../../shared/utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Sistema } from '../../seguridad/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
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
    private toasterService: ToastrService
  ) {
  }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      'usuario': new FormControl('', [Validators.required]),
      'contrasenia': new FormControl('', [Validators.required]),
      'idSistema': new FormControl(1, [Validators.required])
    });
  }

  onLogin() {
    let loginForm: LoginForm = this.loginFormGroup.getRawValue();
    this.loading = true;
    this.authFacade.logIn(loginForm).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
     (response) =>{
      this.loading = false;      
      if(response.ok){
        let body = response.body;
        if(body.exito){        
          //Guardando permisos en la cookie del navegador
          sessionStorage.setItem('username',body.username);
          if(body.recursos.length != 0){
            let recursos = '';
            body.recursos.forEach(function(item,idx){
              if(idx != body.recursos.length){
                recursos = recursos + item.idRecurso + ",";
              }else{
                recursos = recursos + item.idRecurso;
              }
            })
            sessionStorage.setItem('recursos',recursos);
          }else{
            sessionStorage.setItem('recursos','none');
          }
          sessionStorage.setItem('inicioAutorizacion',body.inicioAutorizacion);
          sessionStorage.setItem('finAutorizacion',body.finAutorizacion);
          //Redirigiendo al inicio
          this._router.navigate(['/mantenimiento']);
        }else{
          this.toasterService.error(MESSAGE_AUTH_ERROR_BODY,MESSAGE_AUTH_ERROR_TITLE);
        }
      }else{
        this.toasterService.error(MESSAGE_AUTH_500_BODY,MESSAGE_AUTH_ERROR_TITLE);
      }
      
     }
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
