const falabella = require("../provider/falabella")
const zara = require("../provider/zara")
const fravega = require("../provider/fravega")

async function handler(page,provider,parmerts) {
    switch (provider) {
        case "falabella":
            falabella.search(page,parmerts)
            break;
        case "zara":
            zara.search(page,parmerts)
            break;
        case "fravega":
            fravega.search(page,parmerts)
            break;
        default:
            return undefined
    }
}

module.exports={
    handler
}