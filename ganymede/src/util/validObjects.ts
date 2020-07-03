/**
 * Valida que todos los valores existan
 * @param query Es es palabra para buscar en el proveedor
 * @param provider Es el proveedor donde se realizara la busqueda
 * @param options Informacion adicional para la busqueda. Credenciales,parametros, etc.
 * @param callbackUrl Es la url donde notificaremos el resultado de la busqueda
 */
export const validSearch = (query : string, provider : string, options : JSON, callbackUrl : string) : Array<String> => {
  const errors = []
  if (!query) {
    errors.push('query')
  }
  if (!provider) {
    errors.push('provider')
  }
  if (!options) {
    errors.push('options')
  }
  if (!callbackUrl) {
    errors.push('callback_url')
  }
  return errors
}
