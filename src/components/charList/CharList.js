import './charList.scss';
import {Component} from 'react'
import GetMarver from '../../services/Server';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
   constructor(props){
       super(props);
   }
 state = {
     chars: [],
     loading: true,
     error: false
 }


    
 componentDidMount(){
   const chars = new GetMarver();   
        chars.getAllCharacters()
        .then(res => {
            this.setState({chars: res,
                        loading: false})

        })
        
 }



renderItems(arr){

    const items = arr.map(i =>{
        let styled = {'objectFit' : 'cover'}
        let clazz = 'char__item';
        if(i.thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                styled = {"objectFit": 'unset'}
        }
        if(i.id == this.props.characterId){
            clazz = 'char__item__selected'
            
        }
        return(
            <li onClick={()=> this.props.getCharID(i.id)} className={clazz} key={i.id}>
            <img src={i.thumbnail} alt={i.name} style={styled}/>
            <div className="char__name">{i.name}</div>
            </li>
        )
    })  

    return items
}


render() {
    const {chars, loading, error} = this.state;

    const items = this.renderItems(chars)
    const load = loading ? <Spinner /> : null;
    const errors = error ? <Error /> : null;
    const cards = !(load || errors) ? items : null;
    return (
        <div className="char__list">
            <ul className="char__grid">
            {load}
            {errors}
            {cards}
                
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
    
}



export default CharList;