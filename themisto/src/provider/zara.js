async function search(page) {
    await page.goto('https://www.zara.com.ar');
    await page.click('#acc-alert-deny');
    await page.click('#searchQuestionSolr');
    await page.type('#searchQuestionSolr', "Zapatos");
    await page.keyboard.press('Enter');
}


module.exports={
    search
}