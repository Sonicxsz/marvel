import {Component} from 'react';
import Error from '../error/Error';

class ErrorBundle extends Component {
    
    state = {
        error: false
    }

    componentDidCatch(error){
        console.log(error)
        this.setState({error: true})
    }

    render(){
        if(this.state.error){
            return <Error />
        }

        return this.props.children
    }
}


export default ErrorBundle;