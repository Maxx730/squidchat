import React,{ Component } from 'react'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Message from './Message'

class MessageList extends Component{
    constructor(props){
        super(props)

        this.state = {
        }
    }

    render(){
        return(
            <div className="MessageList">
                <List>
                    {
                        this.props.Messages.map((message) => {
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
                        })
                    }
                </List>

            </div>
        )
    }
}

export default MessageList;