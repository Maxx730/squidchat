import React,{ Component } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

class ChatPrompt extends Component{
    constructor(props){
        super(props)

        this.state = {
            isLogin:false
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                {
                    this.state.isLogin ? <LoginForm Toggle={this.ToggleForm}/> : <SignUpForm Toggle={this.ToggleForm}/>
                }
            </div>
        )
    }

    ToggleForm = (value) => {
        this.setState({
            isLogin:value
        })
    }
}

export default ChatPrompt