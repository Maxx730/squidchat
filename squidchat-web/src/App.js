import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import KeyboardRounded from '@material-ui/icons/KeyboardRounded'
import SettingsRounded from '@material-ui/icons/SettingsRounded'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ListSubHeader from '@material-ui/core/ListSubheader'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Snackbar from '@material-ui/core/Snackbar'
import VpnKeyRounded from '@material-ui/icons/VpnKeyRounded'
import cookie from 'react-cookies'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { CreateUser,CheckLogin,GetFromHash,UpdateUserList } from './actions/UserActions'
import { UpdateMessages } from './actions/MessageActions'
import { UpdateMessage,ResetMessage } from './actions/ComposeActions'

//import connections
import Connector from './api/Connector'

//import components
import ChatInput from './components/ChatInput'
import MessageList from './components/MessageList'
import UserList from './components/UserList'
import SettingsDialog from './components/SettingsDialog'
import { Avatar } from '@material-ui/core';
import MessageExtra from './components/MessageExtra'
import ChatTheater from './components/ChatTheater'
import ChatPrompt from './components/ChatPrompt'
import InputControls from './components/InputControls'
import ImageUpload from './components/ImageUpload'
import EmojiModal from './components/EmojiModal'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      Connector:new Connector(this.MessageCallback,this.UserCallback),
      UploadOpen:false,
      EmojiOpen:false,
      CheckingCookies:true,
      ShowSettings:false
    }
  }

  componentDidMount(){
    //Check if the user has cookies set or not.
    if(typeof cookie.load("SquidChatHash") != "undefined"){
      //If the cookie does exist, pull the correct info from the DB and
      //then have the user join the chat session with the given user info.
      this.props.GetHashInfo(cookie.load("SquidChatHash"),() => {
        this.state.Connector.JoinSession(this.props.User)
      })
    }else{
      this.setState({
        CheckingCookies:false
      })
    }

    this.props.UpdateMessages([])
  }


  render() {
    if(!this.props.User.LoggedIn){
      if(this.state.CheckingCookies){
        return(
          <CircularProgress size={50} />
        )
      }else{
        return(
          <ChatPrompt SignUp={this.props.SignUpUser} Login={this.props.CheckLogin}/>
        )
      }
    }else{
      return (
        <div className="App">
          <AppBar/>

          {
            this.state.UploadOpen && <ImageUpload Update={this.props.UpdateMessage} User={this.props.User} Connector={this.state.Connector} ToggleUpload={this.ToggleUpload.bind(this)}/>
          }

          {
            this.state.EmojiOpen && <EmojiModal ToggleEmoji={this.ToggleEmoji.bind(this)}/>
          }

          <SettingsDialog Open={this.ToggleSettings.bind(this)} IsOpen={this.state.ShowSettings} User={this.props.User}/>
          <MessageList Messages={this.props.Messages.Messages}></MessageList>
          <InputControls ToggleSettings={this.ToggleSettings.bind(this)} ToggleEmoji={this.ToggleEmoji.bind(this)} ToggleUpload={this.ToggleUpload.bind(this)}/>
          <ChatInput Message={this.state.Message} Reset={this.props.ResetMessage} Update={this.props.UpdateMessage} User={this.props.User} Connector={this.state.Connector}/>
        </div>
      );
    }
  }

  ToggleSettings(val){
    this.setState({
      ShowSettings:val
    })
  }

  //After a message has been sent we want to scroll down to the
  //end of the list.
  ScrollDown(ScrollTo){
    window.scrollTo(0,ScrollTo.offsetTop + 300)
  }

  ToggleUpload(val){
    this.setState({
      UploadOpen:val
    })
  }

  ToggleEmoji(val){
    this.setState({
      EmojiOpen:val
    })
  }

  MessageCallback = (Messages) => {
    this.props.UpdateMessages(Messages)
  }

  UserCallback = (Users) => {
    this.props.UpdateUsers(Users)
  }
}

const mapStateToProps = (state) => {
  return{
    User:state.User,
    Messages:state.Messages,
    Users:state.Users,
    Message:state.Message
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    SignUpUser: (User) => {
      CreateUser(dispatch,User)
    },
    CheckLogin: (User) => {
      CheckLogin(dispatch,User)
    },
    GetHashInfo: (hash,callback) => {
      GetFromHash(dispatch,hash,callback)
    },
    UpdateMessages: (Messages) => {
      UpdateMessages(dispatch,Messages)
    },
    UpdateUsers: (Users) => {
      UpdateUserList(dispatch,Users)
    },
    UpdateMessage: (Message) => {
      UpdateMessage(dispatch,Message)
    },
    ResetMessage: () => {
        ResetMessage(dispatch)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
