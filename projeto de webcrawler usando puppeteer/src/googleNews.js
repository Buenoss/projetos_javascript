const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
mongoose.connect('conecte aqui com o se banco mongodb');
const googleNews = mongoose.model('googleNews', { title: String , link: String});

module.exports = (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://news.google.com/');
    await page.type('input[type="text"].Ax4B8', 'coloque aqui o que você deseja buscar');

    const btnSearch = 'button.gb_mf';
    await page.waitForSelector(btnSearch);
    await page.click(btnSearch);


    const ListSelector = '#yDmH0d > c-wiz > div > div > div > main > c-wiz > div > div > div > article > div > div > h3 > a';
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
            googleNews.create({title: obj.title, link: obj.link})
        }
    });
    
    await browser.close();
})();