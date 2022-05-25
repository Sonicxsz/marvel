import './randomChar.scss';
import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import GetMarver from '../../services/Server'
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {
       char:{},
       loading: true,
       error: false

    }
    updateChar = () =>{
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        const marvel = new GetMarver();
        this.setState({loading: true})
        marvel.getCharacter(id)
        .then(res =>{
            this.setState({char: res,
            error: false,
            loading: false})
        })
        .catch(() => this.setState({error: true,
                                    loading: false}))
    }
 
    componentDidMount(){
        this.updateChar()
    }

    render(){
        const {char, loading, error} = this.state
        let data = this.state.char;

        let errors = error ? <Error /> : null,
            load = loading ? <Spinner /> : null,
            content = !(errors || load) ? <View data={data}/> : null;

        
        return (
            <div className="randomchar">
               {errors}
               {load}
               {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={()=>{
                            this.updateChar()
                        }}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

function View (props){
    const {name, description, thumbnail, wiki, homepage} = props.data;
    let styled = {'objectFit' : 'cover'}
        if(thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                styled = {"objectFit": 'unset'}
        }
    return (
        <div className="randomchar__block">
        <img src={thumbnail}  alt="Random character" className="randomchar__img" style ={styled}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}
export default RandomChar;