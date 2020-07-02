async function search (page, query, orderID) {
  await page.goto(`https://www.zara.com/ar/es/search?searchTerm=${query}`, { timeout: 60000, waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.product-list._productList > li')
  const elements = await page.$$('.product-list._productList > li')
  const products = []
  for (const element of elements) {
    const productID = await (await element.getProperty('id')).jsonValue()
    const productName = await element.$eval('div .product-info._product-info > div.product-info-item-name', node => node.innerText)
    const productCategory = productName.split(' ')
    const productImage = await element.$eval('a > div > img', node => node.getAttribute('src'))
    const prices = await element.$eval('div .product-info._product-info > div.product-info-item-price', node => node.innerText.split('\n'))
    const originalPrice = prices[0] && prices[0].substring(0, prices[0].length - 4).replace('.', '').replace(',', '.')
    const price = prices[1] && prices[1].substring(0, prices[1].length - 4).replace('.', '').replace(',', '.')
    products.push({
      sku: productID,
      name: productName,
      price: price || originalPrice,
      original_price: price ? originalPrice : undefined,
      category: productCategory[0],
      image: productImage,
      order_id: orderID
    })
  }
  return products
}

module.exports = {
  search
}
