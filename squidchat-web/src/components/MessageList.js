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
import ListItemText from '@material-ui/core/ListItemText'
import ImageMessage from './ImageMessage'

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
                                                <Avatar>
                                                    {
                                                        message.User.Username.slice(0,2).toUpperCase()
                                                    }
                                                </Avatar>
                                            } className="MessageChip" label={message.User.Username}>

                                            </Chip>
                                        </Tooltip>

                                        {
                                            (message.Image.isImage == true && typeof message.Image != "undefined") && <ImageMessage Image={message.Image}/>
                                        }
                                        <Message Message={message.Message}>

                                        </Message>
                                        <ListItemText className="MessageDate">
                                            {
                                                message.Date
                                            }
                                        </ListItemText>
                                        <span className="VoteCounter">
                                            {
                                                message.Votes
                                            }
                                        </span>
                                        <IconButton onClick = {
                                                () => {
                                                    this.props.Vote(message)
                                                }
                                            }>

                                            {
                                                message.VotedBy.indexOf(this.props.RootUser.UserId) >= 0 ? <ThumbUpRounded color="primary"/> : <ThumbUpRounded/>
                                            }
                                        </IconButton>
                                    </ListItem>
                                )
                            }
                        })
                    }
                    <div ref={this.props.ScrollRef} className="scrollElem">

                    </div>
                </List>

            </div>
        )
    }
}

export default MessageList;