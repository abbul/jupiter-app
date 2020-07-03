/**
 * Estructura para respuesta de todos los endpoints.
 * @param {Boolean} type Indicaremos si se cumplio o no la funcionalidad del endpoint.
 * @param {String} result Codigo interno de respuesta. Nos ayuda en las pruebas unitarias.
 * @param {String} message Texto para describir el resultado de la accion.
 * @param {Object} body informacion de la accion.
 * @param {Number} status Código de estado de respuesta HTTP
 */
export const responseJSON = function (type: Boolean, result : String, message: String, body: Object, status?: number) {
  return {
    type: type ? 'success' : 'error',
    result: result,
    message: message,
    body: body,
    status: status || 200
  }
}
