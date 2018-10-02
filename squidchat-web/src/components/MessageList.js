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
                            return(
                                <Message Message={message}/>
                            )
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