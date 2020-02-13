import { AbstractControl, ValidatorFn, ControlContainer, FormArray } from '@angular/forms';

export const OB_VALIDATORS = {
  // Simple validators

  // Validator Fns
  equalsToField: (fieldName: string, fieldLabel?: string): ValidatorFn => {
    return (control: AbstractControl): { [s: string]: any } => {
      const formGroup = control.parent;
      const controlToCompare = formGroup.get(fieldName);
      return control.value === controlToCompare.value ? null : { equalstofield: { fieldLabel: fieldLabel } };
    }
  },
  greaterThanField: (fieldName: string, fieldLabel?: string): ValidatorFn => {
    return (control: AbstractControl): { [s: string]: any } => {
      const formGroup = control.parent;
      const controlToCompare = formGroup.get(fieldName);
      const isGreaterThan = Number(control.value) > Number(controlToCompare.value);
      return controlToCompare.value !== null ? 
        isGreaterThan ? null : { greaterthanfield: { value: controlToCompare.value, fieldLabel: fieldLabel } } : null;
    }
  },
  greaterEqualThanField: (fieldName: string, fieldLabel?: string): ValidatorFn => {
    return (control: AbstractControl): { [s: string]: any } => {
      const formGroup = control.parent;
      const controlToCompare = formGroup.get(fieldName);
      const isGreaterEqualThan = Number(control.value) >= Number(controlToCompare.value);
      return controlToCompare.value !== null ? 
        isGreaterEqualThan ? null : { greaterequalthanfield: { value: controlToCompare.value, fieldLabel: fieldLabel } } : null;
    }
  },
  lessThanField: (fieldName: string, fieldLabel?: string): ValidatorFn => {
    return (control: AbstractControl): { [s: string]: any } => {
      const formGroup = control.parent;
      const controlToCompare = formGroup.get(fieldName);
      const isLessThan = Number(control.value) < Number(controlToCompare.value);
      return controlToCompare.value !== null ? 
        isLessThan ? null : { lessthanfield: { value: controlToCompare.value, fieldLabel: fieldLabel } } : null;
    }
  },
  lessEqualThanField: (fieldName: string, fieldLabel?: string): ValidatorFn => {
    return (control: AbstractControl): { [s: string]: any } => {
      const formGroup = control.parent;
      const controlToCompare = formGroup.get(fieldName);
      const isLessEqualThan = Number(control.value) <= Number(controlToCompare.value);
      return controlToCompare.value !== null ? 
        isLessEqualThan ? null : { lesstequalhanfield: { value: controlToCompare.value, fieldLabel: fieldLabel } } : null;
    }
  },
  arrayMustAddNumber: (fieldName: string, targetNumber?: number): ValidatorFn => {
    return (control: FormArray): { [s: string]: any } => {
      let suma = 0;
      control.controls.forEach(
        control =>{
          suma += Number(control.get(fieldName).value);
        }
      )
      const isEqualThan = (suma === targetNumber);
      console.log("Control", suma, targetNumber);
      console.log(isEqualThan)
      return targetNumber !== null ? 
            isEqualThan ? null : { 
            arrayMustAddNumber: {
              value: targetNumber, 
              fieldLabel: targetNumber 
            } 
        } : null;
    }
  }
}