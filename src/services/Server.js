import useHttp from "../components/hooks/http.hook"

const useGetMarver = () => {
const _apiKey = 'apikey=12c6c863119d118c943bf10de4ee78d7'
const _api = 'https://gateway.marvel.com:443/v1/public/'
const _offset = '210'
const _offsetComics = '200'
const {loading, error, request, process, setPropess} = useHttp()

const getAllCharacters = async (num = _offset) =>{
    let res = await request(`${_api}characters?limit=9&offset=${num}&${_apiKey}`);
            
        return res.data.results.map(_transformCharacters)
}

const getCharacter = async (id) => {
    const res = await request(`${_api}characters/${id}?${_apiKey}`)
    return _transformCharacter(res)
}
const getComic = async (id) =>{
    const res = await request(`${_api}comics/${id}?${_apiKey}`)
    return _transformComic(res)
}
const getAllComics = async (num = _offsetComics) =>{
    let res = await request(`${_api}comics?limit=8&offset=${num}&${_apiKey}`)

        return res.data.results.map(_transformComics)

}

const getCharacterByName = async (name) => {
    const res = await request(`${_api}characters?name=${name}&${_apiKey}`);
    return _transformCharacter(res)
}


const _transformComics = (comics) =>{
    const com = comics
    return{
        id: com.id,
        title: com.title,
        price: com.prices[0].price +'$',
        thumbnail: com.thumbnail.path + '.' + com.thumbnail.extension
    }
}

const _transformCharacters = (chars) =>{
    const person = chars
    return{
        id: person.id,
        name: person.name,
        key: person.key,
        description: person.description.length > 5 ? person.description : 'There is no descr for this Hero',
        thumbnail: person.thumbnail.path + '.' + person.thumbnail.extension,
        wiki: person.urls[1].url,
        homepage: person.urls[0].url
    }
}
const _transformCharacter = (char) =>{
    try{
        const person = char.data.results[0]
        const comics = [...char.data.results[0].comics.items]
    return{
        name: person.name,
        description: person.description.length > 5 ? person.description : 'There is no descr for this Hero',
        thumbnail: person.thumbnail.path + '.' + person.thumbnail.extension,
        wiki: person.urls[1].url,
        homepage: person.urls[0].url,
        id: person.id,
        comics
    }
    }catch{

    }
}

const _transformComic = (comic) =>{
    const com = comic.data.results[0]
    return{
        name: com.title,
        description: com.description !== null ? com.description : 'there is no description',
        page: com.pageCount,
        price: com.prices[0].price +'$',
        thumbnail: com.thumbnail.path + '.' + com.thumbnail.extension
    }
}
return {loading, error, getAllCharacters, getCharacter, getAllComics, getComic, getCharacterByName, process, setPropess }
}


export default useGetMarver