const puppeteer = require('puppeteer')
const mongoose = require('mongoose')

mongoose.connect('mongodb://root123:root123@ds161901.mlab.com:61901/edacrawler', { useNewUrlParser: true })
const googleNovos = mongoose.model('googlenovos', { title: String , link: String, typeAcc: String })
const userAgent     = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36';

(async () =>{

    const browser = await puppeteer.launch({headless : true})

    googleNovos.find({}, async (err, docs)=>{
        
        // title : doc.title,
        // link : doc.link,
        // typeArch : doc.typeAcc
        
        for(let doc of docs){
            try{    
                const page = await browser.newPage()
                await page.setDefaultTimeout(50000)
                page.setUserAgent(userAgent);
                // vai para a url
                await page.goto(doc.link);

                // espera a página carregar
                await page.waitFor('html')
                // limpa o título da página
                const imagePath = 'images/'+ doc.title
                    .replace(/(á|à|â|ã)/g, 'a')
                    .replace(/(é|ê|è)/g, 'e')
                    .replace(/(ì|í|î)/g, 'i')
                    .replace(/(ò|ó|ô)/g, 'o')
                    .replace(/(ú|ù|û)/g, 'u')
                    .replace(/\W/g,'')
                + '.png'
                console.log(doc.title)
                console.log(imagePath + '\n')
                // tira o screenshot
                await page.screenshot({path: imagePath,  width:1300, height: 720 })
                // fecha a página
                await page.close()
            }catch(erro){
                console.log( 'NOSSO ERRO: ' + erro )
            }
        }
    })
})();