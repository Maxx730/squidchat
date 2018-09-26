import React,{ Component } from 'react'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Message from './Message'
import './css/MessageList.css'
import ThumbUpRounded from '@material-ui/icons/ThumbUpRounded'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

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
                                    <ListItem divider>
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
                                    <ListItem divider>
                                        <Tooltip title={message.User.Username}>
                                            <Chip avatar={
                                                <Avatar src="https://pre00.deviantart.net/fe82/th/pre/f/2016/304/1/e/1e6f072f5bbda5cd81b9c4cd26e9e2c7-damt3bq.jpg">

                                                </Avatar>
                                            } className="MessageChip" label={message.User.Username}>

                                            </Chip>
                                        </Tooltip>
                                        <Message Message={message.Message}>

                                        </Message>
                                        <IconButton>
                                            <ThumbUpRounded/>
                                        </IconButton>
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