async function search(page,query) {
    await page.goto('https://www.zara.com/ar/es/search');
    await page.click('#search-term');
    await page.type('#search-term',query);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.product-list._productList > li')
    const elements = await page.$$('.product-list._productList > li');
    const names = [];
    for (const element of elements) {
        const productID = await (await element.getProperty('id')).jsonValue()
        const productTitle = await (await element.getProperty('data-title')).jsonValue()
        const productColor = await (await element.getProperty('data-colorcode')).jsonValue()
        names.push({
            id : productID,
            title : productTitle,
            color : productColor
        });
        break;
    }
    process.send(names)
}

module.exports={
    search
}