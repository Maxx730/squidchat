import React,{ Component } from 'react'
import Card from '@material-ui/core/Card'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { Avatar } from '@material-ui/core';
import './css/Message.css'
import Youtube from 'react-youtube'

class Message extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ListItemText className = "Message" primary={
                this.CheckFor(this.props.Message,this.props.Type)
            }>
            </ListItemText>
        )
    }

    CheckFor(message,type){
        if(message.indexOf("{yell}") > -1){
            let parts = message.split("{yell}")
            return <span className="YellText">{parts[1]}</span>
        }else if(type == "action"){
            let parts = message.split("{*}")
            return <span className="TeleportsText"><i><center>{this.props.User.Username} teleports behind {parts[1]}, heh nothin personel kid.</center></i></span>
        }else if(type == "youtube"){
            let parts = message.split("v=")
            return <Youtube videoId={parts[1]} opts={{
                width:'300',
                height:'200'}
            }/>
        }else if(type == "system"){
            return <center className="SystemMessage">{message}</center>
        }else{
            return message
        }
    }
}

export default Message;