const puppeteer = require('puppeteer');
const {handler} = require("./utils/handler");

process.on("message",async (message)=>{
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  try {
    process.send({ orderID : message.orderID, status : "processing"})
    const result = await handler(page,message.provider,message.query)
    console.log('result :>> ', result);
    process.send({ orderID : message.orderID, status : "fulfilled", data : result})
  } catch (error) {
      process.send({ orderID :message.orderID, status : "failed"})
  }finally{
    await browser.close();
  }
})
