/**
 * Valida que todos los valores existan
 * @param query
 * @param provider
 * @param options
 * @param callbackUrl
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
