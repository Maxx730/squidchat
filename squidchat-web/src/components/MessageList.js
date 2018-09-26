import React,{ Component } from 'react'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Message from './Message'
import './css/MessageList.css'

class MessageList extends Component{
    constructor(props){
        super(props)

        this.state = {
        }
    }

    render(){
        return(
            <div className="MessageList">
                <List dense="true">
                    {
                        this.props.Messages.map((message) => {
                            if(message.User.Username === "System"){
                                return(
                                    <ListItem button divider>
                                        <center className="SystemCenterMessage">
                                            <Message Message={
                                                message.Message
                                            }>

                                            </Message>
                                        </center>
                                    </ListItem>
                                )
                            }else{
                                return(
                                    <ListItem button divider>
                                        <Avatar>
                                            {
                                                message.User.Username.slice(0,2).toUpperCase()
                                            }
                                        </Avatar>
                                        <Message Message={
                                            message.Message
                                        }>

                                        </Message>
                                    </ListItem>
                                )
                            }
                        })
                    }
                </List>

            </div>
        )
    }
}

export default MessageList;