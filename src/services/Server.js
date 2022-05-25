class GetMarver {
_apiKey = 'apikey=12c6c863119d118c943bf10de4ee78d7'
_api = 'https://gateway.marvel.com:443/v1/public/'
getResource = async (url) => {
    let res = await fetch(url);

    if(!res.ok){
        throw new Error(`Could not fets ${url}`);
    }

    return await res.json();

}

getAllCharacters = async () =>{
    let res = await this.getResource(`${this._api}characters?limit=9&offset=210&${this._apiKey}`);
            
        return res.data.results.map(this._transformCharacters)
    
    

}

getCharacter = async (id) => {
    const res = await this.getResource(`${this._api}characters/${id}?${this._apiKey}`)
    return this._transformCharacter(res)
}
_transformCharacters = (chars) =>{
    const person = chars
    return{
        id: person.id,
        name: person.name,
        key: person.key,
        description: person.description.length > 10 ? person.description.length : 'There is no descr for this Hero',
        thumbnail: person.thumbnail.path + '.' + person.thumbnail.extension,
        wiki: person.urls[1].url,
        homepage: person.urls[0].url
    }
}
_transformCharacter = (char) =>{
    const person = char.data.results[0]
    const comics = [...char.data.results[0].comics.items]
    return{
        name: person.name,
        description: person.description.length > 10 ? person.description.length : 'There is no descr for this Hero',
        thumbnail: person.thumbnail.path + '.' + person.thumbnail.extension,
        wiki: person.urls[1].url,
        homepage: person.urls[0].url,
        comics
    }
}

}


export default GetMarver