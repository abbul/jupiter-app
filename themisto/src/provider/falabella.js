async function search(page) {
    await page.goto('https://www.falabella.com.ar/falabella-ar/');
    await page.click('#acc-alert-deny');
    await page.click('#searchQuestionSolr');
    await page.type('#searchQuestionSolr', "Zapatos");
    await page.keyboard.press('Enter');
    const data = await page.waitForSelector('#testId-searchResults-products');
    console.log('data :>> ', data);
}

module.exports={
    search
}