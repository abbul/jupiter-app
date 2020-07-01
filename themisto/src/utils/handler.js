const falabella = require("../provider/falabella")
const zara = require("../provider/zara")

async function handler(page,provider,query) {
    switch (provider) {
        case "falabella":
            return falabella.search(page,query)
        case "zara":
            return zara.search(page,query)
        default:
            return undefined
    }
}

module.exports={
    handler
}