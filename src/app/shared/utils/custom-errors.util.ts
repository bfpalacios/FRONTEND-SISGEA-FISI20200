import {ErrorMessage} from "ng-bootstrap-form-validation";

export const CUSTOM_ERRORS: ErrorMessage[] = [
  /* Angular Form errors */
  {
    error: "required",
    format: requiredFormat
  }, {
    error: "email",
    format: emailFormat
  }, {
    error: "min",
    format: minFormat
  }, {
    error: "max",
    format: maxFormat
  }, {
    error: 'maxlength',
    format: maxLengthFormat
  }, {
    error: 'minlength',
    format: minlengthFormat
  },{
    error: 'pattern',
    format: patternFormat
  },
  /* Custom client side errors */
  {
    error: 'greaterthanfield',
    format: greaterThanFieldFormat
  },
  {
    error: 'greaterequalthanfield',
    format: greaterEqualThanFieldFormat
  },
  {
    error: 'lessthanfield',
    format: lessThanFieldFormat
  },
  {
    error: 'lessequalthanfield',
    format: lessEqualThanFieldFormat
  },
  {
    error: 'equalstofield',
    format: equalsThanFieldFormat
  },
  {
    error: 'arrayMustAddNumber',
    format: arrayMustAddNumberFormat
  },
  /* Server side errors */
  {
    error: 'NotNull',
    format: serverErrorFormat
  },
  {
    error: 'NotBlank',
    format: serverErrorFormat
  },
  {
    error: 'Range',
    format: serverErrorFormat
  },
  {
    error: 'NoSoloEspacioEnBlanco',
    format: serverErrorFormat
  },
  {
    error: 'Pattern',
    format: serverErrorFormat
  },
  {
    error: 'Patron',
    format: serverErrorFormat
  },
  {
    error: 'Length',
    format: serverErrorFormat
  },
  {
    error: 'URL',
    format: serverErrorFormat
  }
];

/* Angular Form errors */
export function requiredFormat(label: string, error: any): string {
  return `Ingrese ${getLabel(label)}.`;
}

export function emailFormat(label: string, error: any): string {
  return `${getLabel(label)} es inválido.`;
}

export function rangeLengthFormat(label: string, error: any): string {
  return `${getLabel(label)} debe estar entre ${error.value[0]} y ${error.value[1]} caracteres.`;
}

export function minFormat(label: string, error: any): string{
  return `${getLabel(label)} no debe ser menor que ${error.min}.`;
}

export function patternFormat(label: string, error: any): string{
  return `${getLabel(label)} no posee el formato correcto.`;
}

export function maxFormat(label: string, error: any): string{
  return `${getLabel(label)} no debe ser mayor que ${error.max}.`;
}

export function minlengthFormat(label: string, error: any): string {
  return `${getLabel(label)} no debe tener menos de ${error.requiredLength} caracter(es).`;
}

export function maxLengthFormat(label: string, error: any): string {
  return `${getLabel(label)} no debe tener más de ${error.requiredLength} caracter(es).`;
}

/* Custom client side errors */
export function greaterThanFieldFormat(label: string, error: any): string {
  return `${getLabel(label)} debe ser mayor que ${error.fieldLabel || error.value}`;
}

export function greaterEqualThanFieldFormat(label: string, error: any): string {
  return `${getLabel(label)} debe ser mayor igual que ${error.fieldLabel || error.value}`;
}

export function lessThanFieldFormat(label: string, error: any): string {
  return `${getLabel(label)} debe ser menor que ${error.fieldLabel || error.value}`;
}

export function lessEqualThanFieldFormat(label: string, error: any): string {
  return `${getLabel(label)} debe ser menor igual que ${error.fieldLabel || error.value}`;
}

export function equalsThanFieldFormat(label: string, error: any): string {
  return `Debe ser igual a ${error.fieldLabel}`
}

export function arrayMustAddNumberFormat(label: string, error: any): string {
  return `Deben sumar ${error.fieldLabel}`
}

/* Server side errors */
export function serverErrorFormat(label: string, error: any): string {
  return error.mensajeErrorCampo;
}

/* Common */
export function getLabel(label){
  if(label === 'This field'){
    return 'Este campo'
  }
  return label;
}
