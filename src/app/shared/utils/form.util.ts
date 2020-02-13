import { FormGroup } from '@angular/forms';

export function enableControls(formGroup: FormGroup, enable: boolean, ...controlNames: string[]) {
  controlNames
    .filter(control => control !== null && control !== '')
    .forEach(controlName => {
      if (enable) {
        formGroup.get(controlName).enable();
      } else {
        formGroup.get(controlName).disable();
      }
    });
}

export function resetForm(formGroup: FormGroup, value?: any) {
  formGroup.reset(value ? value : {});
}

export function setValueControls(formGroup: FormGroup, data: any) {
  Object.keys(data).forEach(key => formGroup.get(key).setValue(data[key]));
}
/*
export function prepararCriterioBusqueda(criterio: any, form: any) : any{
  let objeto = new Object();
  let atributosCriterio = Object.keys(criterio);
  let atributosFormulario = Object.keys(form);
  let valoresFormulario = Object.values(form);
  for(var i=0; i<atributosCriterio.length;i++){
    if(atributosCriterio[i]===atributosFormulario[i]){
      objeto[atributosCriterio[i]] = valoresFormulario[i];
    }
  }
  return objeto;
}*/
