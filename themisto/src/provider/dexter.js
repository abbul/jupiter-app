async function search (page, query, orderID) {
    await page.goto(`https://www.dexter.com.ar/${query}`, { timeout: 60000, waitUntil: 'domcontentloaded' })
    await page.waitForSelector('.prateleira.vitrine.n4colunas > ul > li')
    const elements = await page.$$('.prateleira.vitrine.n4colunas > ul > li > article')
    const products = []

    for (const element of elements) {
        const productID = await element.$eval('div.image-box > a > img', node => node.getAttribute('src').split("v="))
      const productName = await element.$eval('div.data > h1', node => node.innerText)
      const productCategory = await element.$eval('div.data > div.category', node => node.innerText)
      const price = await element.$eval('div.data > div.price-box', node => node.innerText.replace(' ', '').replace('$', '').replace('.', '').replace(',', '.'))
      const productImage = await element.$eval('div.image-box > a > img', node => node.getAttribute('src'))
      products.push({
        sku: productID[1],
        name: productName,
        price: price,
        original_price: undefined,
        category: productCategory,
        image: productImage,
        order_id: orderID
      })
    }
    return products
  }
  
  module.exports = {
    search
  }
  