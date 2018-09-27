import React,{ Component } from 'react'
import Card from '@material-ui/core/Card'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { Avatar } from '@material-ui/core';
import './css/Message.css'

class Message extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ListItemText className = "Message" primary={
                this.CheckForYell(this.props.Message)
            }>
            </ListItemText>
        )
    }

    CheckForYell(message){
        if(message.indexOf("{yell}") > -1){
            let parts = message.split("{yell}")

            return <span className="YellText">{parts[1]}</span>
        }else{
            return message
        }
    }
}

export default Message;