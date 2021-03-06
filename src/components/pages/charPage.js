import {useState} from 'react'
import ErrorBundle from "../errorBundle/ErrorBundle";
import decoration from '../../resources/img/vision.png';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearch from '../charSearc/CharSearch';
import Helmet from 'react-helmet';
function CharPage() {
    const [characterId, setState] = useState(null)

    const getCharID = (id) => {
        setState(id)
       
    }
  return (
      <>
        <Helmet>
        <meta
          name="description"
          content="Marvel information portal"
        />
    <title>Marvel Char Page</title>
        </Helmet>
        <RandomChar/>
        <div className="char__content">
            <CharList charID={characterId} getCharID={getCharID}/>
            <div>
            <ErrorBundle><CharInfo charID={characterId}/>
            </ErrorBundle>
            <CharSearch />
            </div>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>

    </>
  )
}


export default CharPage