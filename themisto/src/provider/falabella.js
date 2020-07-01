async function search(page,query) {
    await page.goto('https://www.falabella.com.ar/falabella-ar/');
    await page.click('#acc-alert-deny');
    await page.click('#searchQuestionSolr');
    await page.type('#searchQuestionSolr',query);
    await page.keyboard.press('Enter');
    await page.waitForSelector('#testId-searchResults-products')
    const data = await page.$$('.jsx-1395131234.search-results-4-grid')
    data.map((product,i) => {
        console.log(`producto ${i} :>> `, product);
    })
}

module.exports={
    search
}