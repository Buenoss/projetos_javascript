const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
mongoose.connect('conecte aqui com o se banco mongodb');
const youtube = mongoose.model('youtube', { title: String , link: String});

module.exports=(async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://www.youtube.com/');
    await page.type('#search', 'coloque aqui o que deseja buscar');

    const btnSearch = '#search-icon-legacy';
    await page.waitForSelector(btnSearch);
    await page.click(btnSearch);


    const ListSelector = '#video-title';
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
        if(obj.title.toLowerCase().includes('coloque aqui algum filtro')){
            youtube.create({title: obj.title, link: obj.link})
        }
    });
    
    await browser.close();
})();