import './comicsList.scss';
import useGetMarver from '../../services/Server';
import {useState, useEffect} from 'react';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

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



const ComicsList = () => {
    const {getAllComics, process, setPropess}  = useGetMarver();
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newLoad, setNewLoad] = useState(false)
    useEffect(() =>{
        getComics(offset, true)
       
    }, [])
    
    const getComics = (offset, initial) =>{
        initial ? setNewLoad(false) : setNewLoad(true)
        getAllComics(offset)
        .then(res => {
             setNewLoad(false)
             setComics(comics => [...comics, ...res])
             setOffset(offset => offset + 8)
        })
        .then(() => setPropess('confirmed'))
        
    }

    const renderItems = (com) =>{
        let items = com.map(i =>{
            return <li className="comics__item" key={i.id}>
             <Link to={`${i.id}`}>
                 <img src={i.thumbnail} alt="ultimate war" className="comics__item-img"/>
                 <div className="comics__item-name">{i.title}</div>
                 <div className="comics__item-price">{i.price}</div>
             </Link>
         </li>
         })

         return items
    }


    return (
        <div className="comics__list">
             
            <ul className="comics__grid">  
                {fsm(process, () => renderItems(comics), newLoad)}     
            </ul>
            <button disabled={newLoad} className="button button__main button__long">
                <div className="inner" onClick={()=>getComics(offset)}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;