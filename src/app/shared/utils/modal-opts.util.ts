import { MdFormOpts, MdConfirmOpts } from '../components';
import { Type } from './types.util';
import { configCrudButtons, configDetailButtons, configMdButtons } from './buttons.util';

export let configFormMd = {
  getRegisterMdOpts: (type?: Type, buttons?: any): MdFormOpts => {
    return {
      title: type ? `Agregar ${type.name}` : `Agregar`,
      buttons: buttons ? buttons : { ...configCrudButtons.register }
    }
  },
  getUpdateMdOpts: (type?: Type, buttons?: any): MdFormOpts => {
    return {
      title: type ? `Actualizar ${type.name}` : `Actualizar`,
      buttons: buttons ? buttons : { ...configCrudButtons.update }
    }
  },
  getDeleteMdOpts: (htmlTemplateMsg: string, title?: string, buttons?: any, modalClass?: string): MdConfirmOpts => {
    return {
      title: title ? title : `Confirmar`,
      htmlMsg: htmlTemplateMsg,
      buttons: buttons ? buttons : { ...configCrudButtons.delete },
      modalClass: modalClass ? modalClass : 'modal-danger'
    }
  },
  getDetailsMdOpts: (buttons?: any, text?: string): MdFormOpts => {
    return {
      title: text,
      buttons: buttons ? buttons : { ...configDetailButtons(text) }
    }
  },
  getConfirmOpts: (htmlTemplateMsg: string, buttonOkText?: string, buttonOkClass?: string, modalClass?: string,
    title?: string, ): MdConfirmOpts => {
    return {
      title: title ? title : `Confirmar`,
      htmlMsg: htmlTemplateMsg,
      buttons: { ...configMdButtons(buttonOkText, buttonOkClass) },
      modalClass: modalClass ? modalClass : 'modal-danger'
    }
  },
}
