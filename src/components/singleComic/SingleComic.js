import './singleComic.scss';
import { Link } from 'react-router-dom';


const SingleComic = ({data}) => {

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
    const {name, description, page, price, thumbnail} = com;
    return(
     <>
        <img src={thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{page} pages</p>
                    <p className="single-comic__descr">Language: en-us</p>
                    <div className="single-comic__price">{price}</div>
                </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
     </>
    )
     
}

export default SingleComic;