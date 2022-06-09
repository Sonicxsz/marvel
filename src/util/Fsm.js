
import Spinner from '../components/spinner/Spinner'
import Error from '../components/error/Error'
import Skeleton from '../components/skeleton/Skeleton'

function fsm(process, Component, data) {
    
    switch(process){
        case 'waiting':
            return <Skeleton />
        case 'confirmed':
            return <Component data={data}/>
        case 'loading':
            return <Spinner />
        case 'error':
            console.log('sca')
            return <Error />
        default: 
            console.log('uncorrect')
            break;
    }
    
}

export default fsm