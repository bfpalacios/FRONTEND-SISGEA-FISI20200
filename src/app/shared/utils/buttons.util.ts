export const BTN_LOADING_CLASS='fa-spinner fa-pulse fa-fw';
export const FA_ICON_UPLOAD='fa-cloud-upload'; 

export const configCrudButtons = {
  register: {
    ok: { text: 'Agregar', disabled: false, class: 'btn btn-primary' },
    cancel: { text: 'Cancelar' }
  },
  update: {
    ok: { text: 'Actualizar', disabled: false, class: 'btn btn-primary' },
    cancel: { text: 'Cancelar' }
  },
  delete: {
    ok: { text: 'Eliminar', disabled: false, class: 'btn btn-danger' },
    cancel: { text: 'Cancelar' }
  }
}

export function configDetailButtons(texto: string) {
  return {
    ok: { text: texto, disabled: false, class: 'btn-primary' },
    cancel: { text: 'Cancelar' }
  }
}

export function configMdButtons(text: string, buttonClass: string) {
  return {
    ok: { text: text, disabled: false, class: buttonClass ? buttonClass : 'btn-primary' },
    cancel: { text: 'Cancelar' }
  }
}

/* Mario: Seran cambiados en un futuro, ya que document, solo sirve para navegadores*/
export function addBtnLoading(idButton: string) {
  let btn = document.getElementById(idButton);
  btn.setAttribute("disabled", "");
  let i = btn.getElementsByClassName("fa-search");
  i[0].className = 'fa fa-spinner fa-pulse fa-fw';
}


export function removeBtnLoading(idButton: string) {
  let btn = document.getElementById(idButton);
  btn.removeAttribute("disabled");
  let i = btn.getElementsByClassName("fa fa-spinner fa-pulse fa-fw");
  i[0].className = 'fa fa-search';
}
