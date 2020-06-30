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
