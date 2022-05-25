import {ReactComponent as Logo} from './Heart.svg'
import '../spinner/spinner.scss'
function Error(props) {
  const mess = props.message ? props.message : 'Something Wrong. Try later!!'
  return (
    <div>
        <div className='spin'><Logo /></div>
        <div className='text'>{mess}</div>
    </div>
  )
} 

export default Error