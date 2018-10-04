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
                <Avatar>
                    {
                        this.props.Message.User.Username.slice(0,2).toUpperCase()
                    }
                </Avatar>
                {
                    this.ReturnMessageType(this.props.Message)
                }
            </ListItem>
        )
    }

    ReturnMessageType(Message){
        switch(Message.Type){
            case "image":
                return(
                    <div className="ImageMessage">
                        <img src = {"http://localhost:3000/"+Message.Image.Url} width="200"/>
                    </div>
                )
            break;
            default:
                return(
                    <ListItemText>
                        <b>
                            {
                                Message.User.Username + ":  "
                            }
                        </b>
                    {
                        this.CompileEmojis(Message.Message)
                    }
                    </ListItemText>
                )
            break;
        }
    }

    CompileEmojis(Message){
        let res = Message.match(/<emoji>(.*?)<emoji>/g)
        let emojis = new Array()
        let FinalMessage = new Array()

        if(res != null){
            for(let i = 0;i < res.length;i++){
                let split = res[i].split("<emoji>")
                emojis.push(split[1])
            }

            let parts = Message.split("<emoji>")

            for(let k = 0;k < parts.length;k++){
                if(emojis.indexOf(parts[k]) > -1){
                    FinalMessage.push(<i className={"em "+parts[k]}></i>)
                }else{
                    FinalMessage.push(parts[k])
                }
            }

            console.log(FinalMessage)
            return <div>{FinalMessage}</div>
        }else{
            FinalMessage.push(Message)
            return <div>{FinalMessage}</div>
        }
    }
}

export default Message;