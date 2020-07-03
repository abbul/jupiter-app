const dexter = require('../provider/dexter')
const zara = require('../provider/zara')

async function handler (page, provider, query, orderID) {
  switch (provider) {
    case 'dexter':
      return dexter.search(page, query, orderID)
    case 'zara':
      return zara.search(page, query, orderID)
    default:
      return undefined
  }
}

module.exports = {
  handler
}
