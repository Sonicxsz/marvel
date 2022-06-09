import './charInfo.scss';
import {useState, useEffect} from 'react';
import useGetMarver from '../../services/Server';
import Error from '../error/Error';
import fsm from '../../util/Fsm';


function CharInfo ({charID}) {
    
    const [char, setChar] = useState(null)


    const {getCharacter, process, setPropess} = useGetMarver();

    const charLoaded = (char) =>{
        setChar(char)
    }

    useEffect(() =>{
        if(charID){
            getCharacter(charID)
            .then(charLoaded)
            .then(() =>{
                setPropess('confirmed')
            })
            
        }   
          
    }, [charID])
    


    

        return (
            <div className="char__info">
                {fsm(process, View, char)}
               
            </div>
        )
    
}

function View({data}){
    const {thumbnail, name, description, wiki, homepage, comics} = data

    const comis = comics.length > 0 ? comics.map((i, index) =>{
        if(index < 10){
            return <li  key={index} className="char__comics-item">
            {i.name}
            </li>
        }
    }) : <Error message={'Comics not Found ((('}/>

    
    return(
        <>
        <div className="char__basics">
                    <img onClick={(e)=>{
                        e.target.classList.toggle('imgUp')
                    }} src={thumbnail} alt="abyss" style={{'objectFit' : 'unset'}}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comis}
                </ul>
     </>
    )
}

export default CharInfo;