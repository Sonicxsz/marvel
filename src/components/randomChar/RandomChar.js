import './randomChar.scss';
import {useState, useEffect} from 'react';
import useGetMarver from '../../services/Server'
import mjolnir from '../../resources/img/mjolnir.png';
import fsm from '../../util/Fsm' 

function RandomChar (props){
    const [char, setChar] = useState({
        char:{}
    })
   
   const {getCharacter, process, setPropess} = useGetMarver()

   const updateChar = () =>{
       
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
       
        setChar({...char, loading: true})
        getCharacter(id)
        .then(res =>{
            setChar({char: res})
        })
        .then(() => setPropess('confirmed'))
   
       
    }
    useEffect(() =>{
        updateChar()
    }, [])
        
    
   

    
      
        let data = char.char;

        
        return (
            <div className="randomchar">
               
               {fsm(process, () => <View data={data}/>)}
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
                            updateChar()
                        }}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    
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