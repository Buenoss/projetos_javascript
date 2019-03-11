const searchRules = (post, searchName) => {

    // retirando acentos
    let postTitleWithoutAcento = post.title;
    let postTypeWithoutAcento = post.type;
    let searchNameWithoutAcento = searchName;

    postTitleWithoutAcento = postTitleWithoutAcento.replace(/(á|à|â|ã)/g, 'a');
    postTitleWithoutAcento = postTitleWithoutAcento.replace(/(é|ê|è)/g, 'e');
    postTitleWithoutAcento = postTitleWithoutAcento.replace(/(ì|í|î)/g, 'i');
    postTitleWithoutAcento = postTitleWithoutAcento.replace(/(ò|ó|ô)/g, 'o');
    postTitleWithoutAcento = postTitleWithoutAcento.replace(/(ú|ù|û)/g, 'u');

    postTypeWithoutAcento = postTypeWithoutAcento.replace(/(á|à|â|ã)/g, 'a');
    postTypeWithoutAcento = postTypeWithoutAcento.replace(/(é|ê|è)/g, 'e');
    postTypeWithoutAcento = postTypeWithoutAcento.replace(/(ì|í|î)/g, 'i');
    postTypeWithoutAcento = postTypeWithoutAcento.replace(/(ò|ó|ô)/g, 'o');
    postTypeWithoutAcento = postTypeWithoutAcento.replace(/(ú|ù|û)/g, 'u');

    searchNameWithoutAcento = searchNameWithoutAcento.replace(/(á|à|â|ã)/g, 'a');
    searchNameWithoutAcento = searchNameWithoutAcento.replace(/(é|ê|è)/g, 'e');
    searchNameWithoutAcento = searchNameWithoutAcento.replace(/(ì|í|î)/g, 'i');
    searchNameWithoutAcento = searchNameWithoutAcento.replace(/(ò|ó|ô)/g, 'o');
    searchNameWithoutAcento = searchNameWithoutAcento.replace(/(ú|ù|û)/g, 'u');

    // splitando nomes
    let splitedSearchName = searchName.toLowerCase().split(' ')
    let splitedTitle = post.title.toLowerCase().split(' ')
    let splitedUrl = post.url.toLowerCase().split('/')

    let haveTermInTitle = false
    let haveTermInUrl = false

    // verificando os termos de busca
    splitedSearchName.forEach(term =>{
        if(splitedTitle.includes(term)){
            haveTermInTitle = true
        }
        if(splitedUrl.includes(term)){
            haveTermInUrl = true
        }
    })

    if(
        post.title.toLowerCase().includes(searchName.toLowerCase())
        || post.type.toLowerCase().includes(searchName.toLowerCase())
        || post.url.toLowerCase().includes(searchName.toLowerCase())
        || postTitleWithoutAcento.toLowerCase().includes(searchNameWithoutAcento.toLowerCase())
        || postTypeWithoutAcento.toLowerCase().includes(searchNameWithoutAcento.toLowerCase())
        || haveTermInTitle
        || haveTermInUrl
    ){
        return true
    }
    return false
}

export default searchRules;