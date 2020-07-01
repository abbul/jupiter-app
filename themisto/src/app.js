const puppeteer = require('puppeteer');
const {handler} = require("./utils/handler");

process.on("message",async (message)=>{
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  try {
    process.send({ orderID : message.orderID, status : "processing"})
    await handler(page,message.provider,message.query,message.orderID)
  } catch (error) {
      process.send({ orderID :message.orderID, status : "failed", data : error.message})
  }finally{
    await browser.close();
  }
})
