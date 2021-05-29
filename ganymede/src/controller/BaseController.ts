// eslint-disable-next-line no-unused-vars
import { IResponseJSON } from '../interface/IResponseJSON'

export default abstract class BaseController {
    /**
     * Estructura para respuesta de todos los endpoints.
     * @param {Boolean} type Indicaremos si se cumplio o no la funcionalidad del endpoint.
     * @param {String} result Codigo interno de respuesta. Nos ayuda en las pruebas unitarias.
     * @param {String} message Texto para describir el resultado de la accion.
     * @param {Object} body informacion de la accion.
     * @param {Number} status Código de estado de respuesta HTTP
     */
    responseJSON(type: boolean, result: string, message: string, body: any, status?: number): IResponseJSON {
        return {
            type: type ? 'success' : 'error',
            result: result,
            message: message,
            body: body,
            status: status || 200
        }
    }
}
