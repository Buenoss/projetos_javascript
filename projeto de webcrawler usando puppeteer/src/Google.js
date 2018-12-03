const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
mongoose.connect('mongodb://root123:root123@ds161901.mlab.com:61901/edacrawler');
const google = mongoose.model('Google', { title: String , link: String});

module.exports = (async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://www.google.com/');
    await page.type('#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input', 'Coloque aqui o que deseja buscar');

    const btnSearch = '#tsf > div:nth-child(2) > div > div.FPdoLc.VlcLAe > center > input[type="submit"]:nth-child(1)';
    await page.waitForSelector(btnSearch);
    await page.click(btnSearch);

    for(let i=0;i<60;i++){
        const ListSelector = '#rso > div > div > div > div > div > div.r > a';
        await page.waitForSelector(ListSelector);

        const lister = await page.evaluate((ListSelector)=>{
            const anchors = Array.from(document.querySelectorAll(ListSelector));

            return anchors.map(anchor=>{
                return {
                    title: anchor.text,
                    link : anchor.href
                };
            });
        }, ListSelector);

        lister.forEach(obj => {
            if(obj.title.toLowerCase().includes('coloque aqui um filtro')){
                google.create({title: obj.title, link: obj.link})
            }
        });

        const btnNextPage = '#pnnext';
        await page.waitForSelector(btnNextPage);
        await page.click(btnNextPage);
        console.log('gone to the next page!');
    }
    
    await browser.close();
})();