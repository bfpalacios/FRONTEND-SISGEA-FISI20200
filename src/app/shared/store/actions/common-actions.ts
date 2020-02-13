/**
 * Obtiene la lista de acciones comunes para un CRUD
 * Tener en cuenta que no para todas las acciones se deberá crear
 * una clase, ello dependerá de la funcionalidad
 * Además se pueden agregar acciones adicionales propias de la misma
 * @param resourceName Nombre del recurso
 */
export function getCommonCrudActions(resourceName: string) {
  return {
    ADD: `[${resourceName}] Agregar`,
    ADD_SUCCESS: `[${resourceName}] Agregación correcta`,
    ADD_FAIL: `[${resourceName}] Error en agregación`,
    UPDATE: `[${resourceName}] Actualizar`,
    UPDATE_SUCCESS: `[${resourceName}] Actualización correcta`,
    UPDATE_FAIL: `[${resourceName}] Error en actualización`,
    DELETE: `[${resourceName}] Eliminar`,
    DELETE_SUCCESS: `[${resourceName}] Eliminación correcta`,
    DELETE_FAIL: `[${resourceName}] Error al eliminar`,
    GET_CRITERIO : `[${resourceName}] Obtener por criterio`,
    GET_CRITERIO_SUCCESS : `[${resourceName}] Obtener por criterio correcto`,
    GET_CRITERIO_FAIL : `[${resourceName}] Error obtener por criterio`,
    GET_BY_ID : `[${resourceName}] Obtener por id`,
    GET_BY_ID_SUCCESS : `[${resourceName}] Obtener por id correcto`,
    GET_BY_ID_FAIL : `[${resourceName}] Error obtener por id`,
    GET_ALL: `[${resourceName}] Obtener todos`,
    GET_ALL_SUCCESS: `[${resourceName}] Obtener todos correcto`,
    GET_ALL_FAIL: `[${resourceName}] Error obtener todos`,
    DOWNLOAD: `[${resourceName}] Descarga`,
    DOWNLOAD_SUCCESS: `[${resourceName}] Descarga correcto`,
    DOWNLOAD_FAIL: `[${resourceName}] Error descarga`,
    RESET: `[${resourceName}] Reset` // Debe servir para reseteo de todo el estado
  }
}

/**
 * Obtiene la lista de acciones comunes para las CONSULTAS!!
 * Tener en cuenta que no para todas las acciones se deberá crear
 * una clase, ello dependerá de la funcionalidad
 * Además se pueden agregar acciones adicionales propias de la misma
  * @param resourceName Nombre del recurso
 */
export function getCommonConsultaActions(resourceName: string) {
  return {
    //Acción en caso se quiera hacer una busqueda por criterio normal  NO PAGINADA
    GET_CRITERIO : `[${resourceName}] Obtener por criterios`,
    GET_CRITERIO_SUCCESS : `[${resourceName}] Obtener por criterios correcto`,
    GET_CRITERIO_FAIL : `[${resourceName}] Error obtener por criterios`,
    //Acción en caso se quiera hacer una busqueda por criterio PAGINADA
    GET_CRITERIO_PAGINADO : `[${resourceName}] Obtener por criterios paginada`,
    GET_CRITERIO_PAGINADO_SUCCESS : `[${resourceName}] Obtener por criterios paginada correcto`,
    GET_CRITERIO_PAGINADO_FAIL : `[${resourceName}] Error obtener por criterios paginada`,
    //Acción para obtener el detalle
    GET_DETALLE: `[${resourceName}] Obtener detalle`,
    GET_DETALLE_SUCCESS: `[${resourceName}] Obtener detalle correcto`,
    GET_DETALLE_FAIL: `[${resourceName}] Error obtener detalle`,
    //Accion para obtener los filtros
    GET_CRITERIO_FILTRO: `[${resourceName}] Obtener por criterios y filtros`,
    GET_CRITERIO_FILTRO_SUCCESS:  `[${resourceName}] Obtener por criterios y filtros correcto`,
    GET_CRITERIO_FILTRO_FAIL:  `[${resourceName}] Error obtener por criterios y filtros`,
    //Accion para obtener las comisiones en caso del log contable
    GET_DETALLE_COMISION: `[${resourceName}] Obtener detalle de comisiones`,
    GET_DETALLE_COMISION_SUCCESS: `[${resourceName}] Obtener detalle de comisiones correcto`,
    GET_DETALLE_COMISION_FAIL: `[${resourceName}] Error obtener detalle de comisiones`,
    RESET: `[${resourceName}] Reset` // Debe servir para reseteo de todo el estado
  }
}
