const puppeteer = require('puppeteer')
const { handler } = require('./utils/handler')
let browser

process.on('message', async (message) => {
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  const { orderID, provider, query } = message
  try {
    process.send({ orderID: orderID, status: 'processing' })
    const result = await handler(page, provider, query, orderID)
    if (!result) {
      process.send({ orderID: orderID, status: 'failed', data: 'provider-not-found' })
    }
    process.send({ orderID: orderID, status: 'fulfilled', data: result })
  } catch (error) {
    process.send({ orderID: orderID, status: 'failed', data: error.message })
  } finally {
    await browser.close()
  }
})

process.on('unhandledRejection', async (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
  await browser.close()
})
