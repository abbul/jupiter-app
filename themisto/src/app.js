const puppeteer = require('puppeteer');
const {handler} = require("./utils/handler");

(async () => {
  const nameProvider = "falabella"
  const parmeters = "zapatos"
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await handler(page,nameProvider,parmeters)
  //await browser.close();
})();