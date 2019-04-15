const puppeteer = require('puppeteer');
const axios     = require('axios'    );

(async ()=>{

    
    // Elementos do site
    const inputSearch      = '#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input';
    const btnSearch        = '#tsf > div:nth-child(2) > div > div.FPdoLc.VlcLAe > center > input[type="submit"]:nth-child(1)';
    const googleDiv        = '#rso > div > div > div > div';
    const btnNext          = '#pnnext';
    const googleMenu       = '#hdtb-msb-vis';
    const divsOfGoogleMenu = '#hdtb-msb-vis > div';

    // Browser user agent para não parecer um robô
    const userAgent     = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36';

    // url do site a ser acessado
    const url           = 'https://www.google.com';

    // número de páginas que serão buscadas
    const numberOfPages = 15;
    // tempo de espera para clickar no botão de pesquisa
    const searchClickTime     = 5000;
    const btnNextClickTime    = 3000;

    // selecionar abas que vai buscar
    const deveBuscarNoticia = true;
    const deveBuscarVideo   = true;

    //desseja usar headless
    const useHeadless = true;

    // termos que serão buscados
    const termos = [
        'aula magna eda Coutinho'
    ];

    // array onde serão colocados os resultados
    const resultados = [];

    try {
        // loop de busca de termos
        for(termo of termos){
            // inicia o browser e setta userAgent
            // headless por default é true, quando false, o programa é executado com o browser aparecendo
            const browser = await puppeteer.launch({headless : useHeadless});
            const page = await browser.newPage();
            page.setUserAgent(userAgent);

            // vai para a url
            await page.goto(url);

            // espera os elementos de input da busca e botão da busca serem carregados
            await page.waitForSelector(inputSearch);
            await page.type( inputSearch , termo );

            await page.waitForSelector(btnSearch);

            await page.waitFor(searchClickTime);
            await page.click(btnSearch);

            let typeOfContent = 'Tudo';

            // loop para as páginas de pesquisa da área Tudo
            for(let i=0; i<numberOfPages; i++){
                // seleciona todas as divs da pesquisa
                await page.waitForSelector(googleDiv);
                const divs = await page.$$(googleDiv);

                // faz um loop nas divs de pesquisa
                for (const div of divs) {
                    // para caso não ache a div no formato certo
                    try {
                        const link  = await div.$eval('a' , a  => a .href      );
                        const title = await div.$eval('h3', h3 => h3.innerText );
                        
                        let obj = {
                            title : title,
                            href  : link
                        }
                        
                        obj.typeAcc = typeOfContent ;

                        if((title.toLowerCase().includes('eda ')   || 
                            title.toLowerCase().includes('iesb') ) && 
                            !resultados.includes(obj)){
                            resultados.push(obj);
                        }
                    } catch (error) {
                        console.log(`Erro de execução ${error}`);
                    }
                }

                // tenta achar o botão de ir para a próxima página
                // se consegue clicka, se não ele para o loop de páginas
                try {
                    await page.$eval(btnNext, btn=> console.log(btn.innerText) );
                    await page.waitForSelector(btnNext);
    
                    const buttonMais = await page.$(btnNext);

                    await page.waitFor(btnNextClickTime);
                    await buttonMais.click();
                }catch(e){
                    break;
                }
            }

            if(deveBuscarNoticia){
                // espera a página de resultados ser carregada 
                // aí seleciona todas as divs do menu superior
                await page.waitForSelector(googleMenu);
                let options = await page.$$(divsOfGoogleMenu);

                // faz um loop para clickar no menu superior de Notícias
                for(option of options){
                    let type = await page.evaluate( div=>div.innerText, option );
                    if(type=='Notícias'){
                        const typeOfSearch = await option.$('a');
        
                        await typeOfSearch.click();
                        typeOfContent = 'Notícia';
                        break;
                    }
                }

                // faz um loop nas páginas da pesquisa
                for(let i=0; i<numberOfPages; i++){
                    // seleciona todas as divs da pesquisa
                    await page.waitForSelector(googleDiv);
                    const divs = await page.$$(googleDiv);

                    // faz um loop nas divs de pesquisa
                    for (const div of divs) {
                        // para caso não ache a div no formato certo
                        try {
                            const link  = await div.$eval('a' , a  => a .href      );
                            const title = await div.$eval('h3', h3 => h3.innerText );
                            
                            let obj = {
                                title : title,
                                href  : link
                            }
                            
                            obj.typeAcc = typeOfContent ;

                            if((title.toLowerCase().includes('eda ')   || 
                                title.toLowerCase().includes('iesb') ) && 
                                !resultados.includes(obj)){
                                resultados.push(obj);
                            }
                        } catch (error) {
                            console.log(`Erro de execução ${error}`);
                        }
                    }

                    // tenta achar o botão de ir para a próxima página
                    // se consegue clicka, se não ele para o loop de páginas
                    try {
                        await page.$eval(btnNext, btn=> console.log(btn.innerText) );
                        await page.waitForSelector(btnNext);

                        const buttonMais = await page.$(btnNext);
                        await page.waitFor(btnNextClickTime);
                        await buttonMais.click();

                    }catch(e){
                        break;
                    }     
                }
            }
            
            if(deveBuscarVideo){
                // espera a página de resultados ser carregada 
                // aí seleciona todas as divs do menu superior
                await page.waitForSelector(googleMenu);
                options = await page.$$(divsOfGoogleMenu);

                // faz um loop para clickar no menu superior de Notícias
                for(option of options){
                    let type = await page.evaluate( div=>div.innerText, option );
                    if(type=='Vídeos'){
                        const typeOfSearch = await option.$('a');
        
                        await typeOfSearch.click();
                        typeOfContent = 'Vídeo';
                        break;
                    }
                }

                // faz um loop nas páginas da pesquisa
                for(let i=0; i<numberOfPages; i++){
                    // seleciona todas as divs da pesquisa
                    await page.waitForSelector(googleDiv);
                    const divs = await page.$$(googleDiv);

                    // faz um loop nas divs de pesquisa
                    for (const div of divs) {
                        // para caso não ache a div no formato certo
                        try {
                            const link  = await div.$eval('a' , a  => a .href      );
                            const title = await div.$eval('h3', h3 => h3.innerText );
                            
                            let obj = {
                                title : title,
                                href  : link
                            }
                            
                            obj.typeAcc = typeOfContent ;

                            if((title.toLowerCase().includes('eda ')   || 
                                title.toLowerCase().includes('iesb') ) && 
                                !resultados.includes(obj)){
                                resultados.push(obj);
                            }
                        } catch (error) {
                            console.log(`Erro de execução ${error}`);
                        }
                    }

                    // tenta achar o botão de ir para a próxima página
                    // se consegue clicka, se não ele para o loop de páginas
                    try {
                        await page.$eval(btnNext, btn=> console.log(btn.innerText) );
                        await page.waitForSelector(btnNext);
        
                        const buttonMais = await page.$(btnNext); 
                        await page.waitFor(btnNextClickTime);
                        await buttonMais.click();

                    }catch(e){
                        break;
                    }     
                }
            }

            // fecha o browser
            await browser.close();
        }


        axios
        .post('urldestino', {
            "username" : "arthur.barata",
	        "password" : "123456"
        })
        .then((res)=>{
            // coloca os resultados no banco
            resultados.forEach((resultado)=>{
                // Aqui se armazena os arquivos;
                axios
                .post('urldestino',{
                        token : res.data.token,
                        title : resultado.title,
                        url   : resultado.href,
                        type  : resultado.typeAcc
                })
                .then((response)=>{
                    console.log(response);
                })
            });
        })            

    } catch (error) {
        console.log('Erro Cometido: ', error);
    }    
})();
