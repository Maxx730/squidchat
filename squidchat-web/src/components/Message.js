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
                this.CheckFor(this.props.Message)
            }>
            </ListItemText>
        )
    }

    CheckFor(message){
        if(message.indexOf("{yell}") > -1){
            let parts = message.split("{yell}")

            return <span className="YellText">{parts[1]}</span>
        }else if(message.indexOf("{*}") > -1){
            let parts = message.split("{*}")
            return <span className="TeleportsText"><i><center>{this.props.User.Username} teleports behind {parts[1]}, heh nothin personel kid.</center></i></span>
        }else{
            return message
        }
    }
}

export default Message;