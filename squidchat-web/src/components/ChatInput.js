import React,{ Component } from 'react';
import Input from '@material-ui/core/Input';
import './css/ChatInput.css'
import SendRounded from '@material-ui/icons/SendRounded';
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import MessageExtra from './MessageExtra'

class ChatInput extends Component{
    constructor(props){
        super(props)

        this.state = {
            MessageInput:"",
            Connector:this.props.Connector
        }
    }

    render(){
        return(
            <div className = "ChatInput">
                <Input className="PaddedInput" fullWidth={true} disableUnderline={true} placeholder="Send Message" startAdornment={
                 <InputAdornment>
                    <SendRounded className="push-right" color='disabled'/>
                </InputAdornment>
                } endAdornment={
                    <InputAdornment>
                        <Button className="SendText" variant="outlined" color="primary" onClick={
                            () => {
                                if(this.state.MessageInput != ""){
                                    this.props.Sender(this.state.MessageInput,{
                                        isImage:false,
                                        URL:""
                                    })
                                    this.setState({
                                        MessageInput:""
                                    })
                                }else{
                                    alert("Message cannot be blank.")
                                }
                            }
                        }>
                            Send
                        </Button>
                    </InputAdornment>
                } onChange={
                    (event) => {
                        this.setState({
                            MessageInput:event.target.value
                        })
                    }
                } value={
                    this.state.MessageInput
                }
                onKeyDown={
                  (event) => {
                      if(event.key === "Enter"){
                        this.state.Connector.SendMessage({
                            User:{
                                _id:this.props.User._id,
                                Username:this.props.User.Username
                            },
                            Message:this.state.MessageInput,
                            Type:"standard"
                        })

                        this.setState({
                            MessageInput:""
                        })
                      }
                  }
                }
                onKeyUp={
                    () => {
                        setTimeout(() => {

                        },1000)
                    }
                }/>
            </div>
        )
    }
}

export default ChatInput;