import React,{ Component } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

class ChatPrompt extends Component{
    constructor(props){
        super(props)

        this.state = {
            isLogin:true
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                {
                    this.state.isLogin ? <LoginForm Login={this.props.Login} Toggle={this.ToggleForm}/> : <SignUpForm SignUp={this.props.SignUp} Toggle={this.ToggleForm}/>
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