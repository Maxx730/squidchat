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

import { connect } from 'react-redux'
import { CreateUser,CheckLogin,GetFromHash } from './actions/UserActions'
import { UpdateMessages } from './actions/MessageActions'

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
      Connector:new Connector(this.MessageCallback),
      UploadOpen:false,
      EmojiOpen:false
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
    }
  }


  render() {
    if(!this.props.User.LoggedIn){
      return(
        <ChatPrompt SignUp={this.props.SignUpUser} Login={this.props.CheckLogin}/>
      )
    }else{
      return (
        <div className="App">
          <AppBar/>

          {
            this.state.UploadOpen && <ImageUpload ToggleUpload={this.ToggleUpload.bind(this)}/>
          }

          {
            this.state.EmojiOpen && <EmojiModal ToggleEmoji={this.ToggleEmoji.bind(this)}/>
          }

          <MessageList Messages={this.props.Messages.Messages}></MessageList>
          <InputControls ToggleEmoji={this.ToggleEmoji.bind(this)} ToggleUpload={this.ToggleUpload.bind(this)}/>
          <ChatInput User={this.props.User} Connector={this.state.Connector}/>
        </div>
      );
    }
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
}

const mapStateToProps = (state) => {
  return{
    User:state.User,
    Messages:state.Messages
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
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
