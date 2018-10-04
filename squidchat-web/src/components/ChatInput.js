import React,{ Component } from 'react';
import Input from '@material-ui/core/Input';
import './css/ChatInput.css'
import SendRounded from '@material-ui/icons/SendRounded';
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import MessageExtra from './MessageExtra'
import MessageDialog from './MessageDialog'
import { connect } from 'react-redux'
import { UpdateMessage,ResetMessage } from '../actions/ComposeActions'

class ChatInput extends Component{
    constructor(props){
        super(props)

        this.state = {
            Connector:this.props.Connector,
            ShowErrorDialog:false
        }
    }

    render(){
        return(
            <div className = "ChatInput">
                <MessageDialog Content="Message cannot be sent as blank." Title="Error" Show={this.state.ShowErrorDialog} Close={
                    () => {
                        this.setState({
                            ShowErrorDialog:false
                        })
                    }
                }/>
                <Input className="PaddedInput" fullWidth={true} disableUnderline={true} placeholder="Send Message" startAdornment={
                 <InputAdornment>
                    <SendRounded className="push-right" color='disabled'/>
                </InputAdornment>
                } endAdornment={
                    <InputAdornment>
                        <Button className="SendText" variant="outlined" color="primary" onClick={
                            () => {
                                if(this.state.MessageInput != ""){
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
                                }else{
                                    this.setState({
                                        ShowErrorDialog:true
                                    })
                                }
                            }
                        }>
                            Send
                        </Button>
                    </InputAdornment>
                } onChange={
                    (event) => {
                        this.props.UpdateMessage({
                            User:{
                                _id:this.props.User._id,
                                Username:this.props.User.Username
                            },
                            Message:event.target.value,
                            Type:"standard"
                        })
                    }
                } value={
                    this.props.Message.Message
                }
                onKeyDown={
                  (event) => {
                      if(event.key === "Enter"){
                          if(this.props.Message.Message != ""){
                            this.state.Connector.SendMessage({
                                User:{
                                    _id:this.props.User._id,
                                    Username:this.props.User.Username
                                },
                                Message:this.props.Message.Message,
                                Type:"standard"
                            })

                            this.props.ResetMessage()

                            //Reset the message using Redux
                          }else{
                            this.setState({
                                ShowErrorDialog:true
                            })
                          }
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

const matchStateToProps = (state) => {
    return{
        Message:state.Message
    }
}

const matchDispatchToProps = (dispatch) => {
    return{
        UpdateMessage: (Message) => {
            UpdateMessage(dispatch,Message)
        },
        ResetMessage: () => {
            ResetMessage(dispatch)
        }
    }
}

export default connect(matchStateToProps,matchDispatchToProps)(ChatInput);