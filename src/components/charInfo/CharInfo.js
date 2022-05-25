import './charInfo.scss';
import {Component} from 'react';
import GetMarver from '../../services/Server';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import Error from '../error/Error';
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            char:null,
            loading: false,
            error: false,
            comics: null
     
         }
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            const marvel = new GetMarver();
            marvel.getCharacter(this.props.charID)
            .then(res =>{
                this.setState({char: res,
                                loading: false})
            })
            .catch(() =>{
                this.setState({error: true})
            })  
        }
         
      }




    render(){
        const load = this.state.loading ? <Spinner /> : null;
        const err = this.state.error ? <Error /> : null; 
        const skelet = load || err || this.state.char ? null : <Skeleton/>
        const content = !(load || err || !this.state.char) ? <View char={this.state.char}/> : null;

        return (
            <div className="char__info">
                {skelet}
                {load}
                {err}
                {content}
               
            </div>
        )
    }
}

function View(props){
    const {thumbnail, name, description, wiki, homepage, comics} = props.char
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
                    <img src={thumbnail} alt="abyss" style={{'objectFit' : 'unset'}}/>
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