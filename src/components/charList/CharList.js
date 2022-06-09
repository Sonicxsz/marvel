import './charList.scss';
import {useState, useEffect, useRef} from 'react';

import PropTypes from 'prop-types';
import useGetMarver from '../../services/Server';
import Error from '../error/Error';

import Spinner from '../spinner/Spinner';



function fsm(process, Component, newLoading) {
    
    switch(process){
        case 'waiting':
            return <Spinner />
            break;

        case 'loading':
            return newLoading ? <Component /> : <Spinner />
            break;
        case 'confirmed':
            return <Component />
            break;
        case 'error':
            return <Error />
        default: 
         
            break;
    }
    
}


function CharList (props) {

 const [chars, setChars] = useState([]);
 const [newLoad, setNewLoad] = useState(false);
 const [offset, setOffset] = useState(210);
 const [charsEnd, setCharsEnd] = useState(false);

 
 const itemRefs = useRef([]);



const focusItem = (id) =>{
    itemRefs.current.forEach(i =>{
        i.classList.remove('char__item__selected')
    })
    itemRefs.current[id].classList.add('char__item__selected')
}

useEffect(() =>{
    onRequest(offset, true)
}, [])



const { getAllCharacters, process, setPropess} =  useGetMarver();   

const onRequest = (offset, initial) =>{
        initial ? setNewLoad(false) : setNewLoad(true)  
        getAllCharacters(offset)
        .then(res => {
            let ended = false
            if(res.length < 9){
                ended = true;        
            }
            setChars(chars => [...chars, ...res])
            setOffset(offset => offset + 9)
            setCharsEnd(ended)
        })
        .then(() => setPropess('confirmed'))
        .then(() => setNewLoad(false))
        
    
        
 }




const renderItems = (arr) => {
    
    const items = arr.map((i, index )=>{
        let styled = {'objectFit' : 'cover'}
        let clazz = 'char__item';
        if(i.thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                styled = {"objectFit": 'unset'}
        }
        if(i.id == props.characterId){
            clazz = 'char__item__selected'
            
        }
        return(
                
                <li 
            ref={el => itemRefs.current[index] = el}
            onClick={()=> {
                focusItem(index)
                props.getCharID(i.id)}} className={clazz} key={i.id}>
            <img src={i.thumbnail} alt={i.name} style={styled}/>
            <div className="char__name">{i.name}</div>
            </li>
        
          
        )
    })

    return items
}


    const end = charsEnd ? {'display' : 'none'} : {'display' : 'block'}
    return (
        <div className="char__list">
            <ul className="char__grid">
            
            
            {fsm(process, ()=> renderItems(chars), newLoad)}
                
            </ul>
            <button
            style={end}
            onClick={() =>{
                onRequest(offset)
            }} disabled={newLoad} className="button button__main button__long btn">
                <div  className="inner">load more</div>
            </button>
        </div>
    )
}
    


CharList.propTypes = {
    getCharID: PropTypes.func,
    charID: PropTypes.number
}


export default CharList;