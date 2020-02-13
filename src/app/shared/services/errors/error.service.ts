import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastr: ToastrService
  ) { }

  handleServerSideFormError(httpError: HttpErrorResponse, formGroup?: FormGroup) {
    const status = httpError.status;
    switch (status) {
      case 422: {
        if(formGroup && httpError.error.errorFormularioResponses){
          Object.keys(formGroup.controls).forEach(key => {
            let formControlErrors: any = {};
            for (let e of httpError.error.errorFormularioResponses) {
              if (e.nombreCampo === key) {
                formControlErrors[e.codigoErrorCampo] = e;
              }
            }
            if (Object.keys(formControlErrors).length > 0) {
              formGroup.get(key).setErrors(formControlErrors);
            }
          });
        }
        this.toastr.warning(httpError.error.mensajeUsuario, 'Aviso');
        break;
      }
    case 400:
      this.toastr.error(httpError.error.message ? httpError.error.message: 'Petición incorrecta.', 'Error');
      break;
    }

  }
}