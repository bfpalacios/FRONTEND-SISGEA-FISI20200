import { MdFormOpts, FormModalComponent, ConfirmModalComponent, MdConfirmOpts, TemplateMantenimientoComponent } from '../components';
import { State as EntityState } from '../store/reducers/entity-state.model';
import { FormGroup } from '@angular/forms';
import { ErrorService } from '../services/errors/error.service';
import { ToastrService } from 'ngx-toastr';
import { RESOURCE_ACTIONS } from './types.util';
import { TemplateMantenimientoDetalleComponent } from '../components/template-mantenimiento-detalle/template-mantenimiento-detalle.component';

/**
 * Gestiona las acciones a realizar de acuerdo al cambio de estado
 * para los components de mantenimiento simple
 * @param state Estado 
 * @param form Formulario
 * @param templateMantenimiento Template de mantenimiento
 * @param mdFormOpts Opciones de configuracion de form-modal
 * @param mdSave Componente app-form-modal 
 * @param mdConfirmOpts Opciones de configuracion de confirmation-modal
 * @param mdDelete Component app-confirmation-modal
 * @param toasterService Toastr service para mostrar toast de acuerdo al resultado
 * @param errorService Service que gestiona los errores en formulario enviados por el server
 * @param updateGridFn Función para actualzar la grilla que se ejecuta luego de un exito o error devuelto por el server
 * @param saveSuccessFn Función que se ejecuta luego de un registro o actualización exitoso
 */
export function manageCrudState<T>(state: EntityState<T>, form: FormGroup,
  templateMantenimiento: TemplateMantenimientoComponent,
  mdFormOpts: MdFormOpts, mdSave: FormModalComponent, mdConfirmOpts: MdConfirmOpts, mdDelete: ConfirmModalComponent,
  toasterService: ToastrService, errorService: ErrorService, updateGridFn?: Function, saveSuccessFn?: Function) {
  if(!state) return;
  if (state.loading) {
    if (state.action === RESOURCE_ACTIONS.REGISTRO || state.action === RESOURCE_ACTIONS.ACTUALIZACION) {
      if (mdFormOpts) mdFormOpts.buttons.ok.disabled = true;
    }
    if (state.action === RESOURCE_ACTIONS.ELIMINACION) {
      if (mdConfirmOpts) mdConfirmOpts.buttons.ok.disabled = true;
    }
    if (state.action === RESOURCE_ACTIONS.EXPORTACION) {
      templateMantenimiento.disableDownloadBtn(true);
    }
  } else {
    if (state.done) {
      if (state.action === RESOURCE_ACTIONS.REGISTRO || state.action === RESOURCE_ACTIONS.ACTUALIZACION) {
        if (mdSave) {
          if(saveSuccessFn) saveSuccessFn();
          mdSave.hide();
          toasterService.success(state.doneMessage, state.action === RESOURCE_ACTIONS.REGISTRO ?
            'Registro' : 'Actualización');
        }
      }
      if (state.action === RESOURCE_ACTIONS.ELIMINACION) {
        if (mdDelete) {
          mdDelete.hide();
          toasterService.success(state.doneMessage, 'Eliminación');
        }
      }
      if (state.action === RESOURCE_ACTIONS.EXPORTACION) {
        templateMantenimiento.disableDownloadBtn(false);
        toasterService.success(state.doneMessage, 'Descarga');
      }
    }
    if (state.done || state.failed) {
      if (state.action === RESOURCE_ACTIONS.REGISTRO || state.action === RESOURCE_ACTIONS.ACTUALIZACION) {
        if(mdFormOpts) mdFormOpts.buttons.ok.disabled = false;
      }
      if (state.action === RESOURCE_ACTIONS.ELIMINACION) {
        if(mdConfirmOpts) mdConfirmOpts.buttons.ok.disabled = false;
      }
      if (state.action === RESOURCE_ACTIONS.EXPORTACION) {
        templateMantenimiento.disableDownloadBtn(false);
      }
      if (updateGridFn) updateGridFn();
    }
    if (state.failed) {
      errorService.handleServerSideFormError(state.errors, form);
    }
  }
}

/**
 * Gestiona las acciones a realizar de acuerdo al cambio de estado
 * para los components de mantenimiento detalle
 * @param state Estado 
 * @param form Formulario
 * @param templateDet template {TemplateMantenimientoDetalleComponent}
 * @param mdConfirmOpts Opciones de configuracion de confirmation-modal
 * @param mdDelete Componente app-confirmation-modal
 * @param toasterService Toastr service para mostrar toast de acuerdo al resultado
 * @param errorService Service que gestiona los errores en formulario enviados por el server
 * @param successFn Función que se ejecuta luego un registro actualización o eliminación exitosa
 * @param updaGridFn Función para actualzar la grilla que se ejecuta luego de un exito o error devuelto por el server
 */
export function manageCrudDetailState<T>(state: EntityState<T>, form: FormGroup,
  templateDet: TemplateMantenimientoDetalleComponent, mdConfirmOpts: MdConfirmOpts,
  mdDelete: ConfirmModalComponent, toasterService: ToastrService,
  errorService: ErrorService, successFn: Function,
  updaGridFn?: Function,
) {
  if (state.loading) {
    if (state.action === RESOURCE_ACTIONS.REGISTRO || state.action === RESOURCE_ACTIONS.ACTUALIZACION) {
      templateDet.disableSaveBtn(true);
    } else {
      if (state.action === RESOURCE_ACTIONS.ELIMINACION) {
        mdConfirmOpts.buttons.ok.disabled = true;
      }
    }
  }
  if (state.done || state.failed) {
    if (state.action === RESOURCE_ACTIONS.REGISTRO || state.action === RESOURCE_ACTIONS.ACTUALIZACION) {
      templateDet.disableSaveBtn(false);
    } else {
      if (state.action === RESOURCE_ACTIONS.ELIMINACION) {
        mdConfirmOpts.buttons.ok.disabled = false;
      }
    }
    if (updaGridFn) updaGridFn();
  }
  if (state.done) {
    if (state.action === RESOURCE_ACTIONS.REGISTRO || state.action === RESOURCE_ACTIONS.ACTUALIZACION) {
      toasterService.success(state.doneMessage, state.action === RESOURCE_ACTIONS.REGISTRO ?
        'Registro' : 'Actualización');
    } else {
      if (state.action === RESOURCE_ACTIONS.ELIMINACION) {
        mdDelete.hide();
        toasterService.success(state.doneMessage, 'Eliminación');
      }
    }
    if (successFn) successFn();
  }
  if (state.failed) {
    errorService.handleServerSideFormError(state.errors, form);
  }
}