import './singleComic.scss';
import { Link } from 'react-router-dom';

function SingleChar({data}) {
  
    const item = data ? renderItem(data) : null
    return (
        <>
        <div className="single-comic">
           {item}
        </div>
        </>
    )
}


function renderItem(com){
    const {name, description, thumbnail} = com;
    return(
     <>
        <img style={{
            objectFit: 'fill',
            height: '330px'
        }} src={thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
            <Link to="/" className="single-comic__back">Back to all</Link>
     </>
    )
     
}

export default SingleChar