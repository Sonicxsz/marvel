import {useState, useEffect} from 'react'
import useGetMarver from '../../services/Server'
import { useParams } from 'react-router-dom';
import AppBanner from '../appBanner/AppBanner';
import fsm from '../../util/Fsm'

function SinglePage({action, Component}) {

    const {getCharacter, getComic, process, setPropess} = useGetMarver();
    const [item, setItem] = useState(null);
    const id = useParams()

    const getItem = (action) =>{
        switch(action){
            case 'comic':
               getComic(id.comicId)
                .then(res => setItem(res))
                .then(() => setPropess('confirmed'))
                break;
            case 'char':
                getCharacter(id.charId)
                .then(res => setItem(res))
                .then(() => setPropess('confirmed'))
                break;
            default: break;
        }

    }

    useEffect(() =>{
        getItem(action)
    }, [id])

  return (
    <>
    <AppBanner/>
    {fsm(process, ()=><Component data={item}/>)}
    </>
  )
}

export default SinglePage