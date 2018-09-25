import React,{ Component } from 'react'
import Card from '@material-ui/core/Card'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { Avatar } from '@material-ui/core';

class Message extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ListItemText className = "Message" primary={
                this.props.Message
            }>
            </ListItemText>
        )
    }
}

export default Message;