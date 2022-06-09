import {useState} from 'react'
import './charSeach.scss'
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useGetMarver from '../../services/Server';



function fsm(process, succes, notFound) {
    
  switch(process){
      case 'confirmed':
          return succes
          break;
      case 'error':
          return <div className="char__search-critical-error"><ErrorMessage /></div>
          break;
      case 'waiting': 
          return notFound
          break;
      default: break;
  }
  
}

function CharSearch() {
  const [char, setChar] = useState(null);
  const {process, setPropess, getCharacterByName} = useGetMarver();

  const onCharLoaded = (char) =>{
    setChar(char)
  }

  const updateChar = (item) =>{
        getCharacterByName(item)
        .then(onCharLoaded)
        .then(() => setPropess('confirmed'))
          
  } 
  

  const result = char ? <div className='flex_search' style={{
                   marginTop: '0'
                 }}>
                   <div style={{color: 'green',
                                fontSize: '18px'}}>There is, visit {char.name} to page?</div>
                   <Link to={`/characters/${char.id}`} className="button button__secondary">
                    <div className="inner">To page</div>
                   </Link>
                 </div> : <div style={{
                  color: 'red',
                  fontSize: '18px'
                 }}> There is no character</div>



  const notFound =  'use for search'

  return (

    <div className='searchWrap'>
      <Formik
      initialValues={{
        search: ''
      }}
      validationSchema={Yup.object({
        search: Yup.string().min(2, 'need min 2 symbols')
      })}

      onSubmit = {({search}) =>{
       updateChar(search)
      }}
      >

        <Form>
        <p>Or find a character by name:</p>
          <div className='flex_search'>
          <Field 
           id='search'
           placeholder='Enter name' 
           name='search' 
           type='text' className='charSearch'
           
           />
           
          <div>
            
          <button className="button button__main full" type='submit' >
                        <div className="inner">FIND</div>
                    </button>
                    
          </div>
          </div>
          <ErrorMessage name='search' component='div' style={{color: 'red',
                                                            fontSize: '18px'}}/>

        </Form>
      </Formik>
      
      {fsm(process, result, notFound)}
    </div>
  )
}

export default CharSearch