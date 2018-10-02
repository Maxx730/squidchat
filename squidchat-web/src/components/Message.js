import React,{ Component } from 'react'
import Card from '@material-ui/core/Card'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { Avatar, ListItem } from '@material-ui/core';
import './css/Message.css'
import Youtube from 'react-youtube'

class Message extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ListItem divider>
                <Avatar>MK</Avatar>
                <ListItemText>
                    {
                        this.props.Message.Message
                    }
                </ListItemText>
            </ListItem>
        )
    }
}

export default Message;