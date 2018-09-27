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

//import connections
import Connector from './api/Connector'

//import components
import ChatInput from './components/ChatInput'
import MessageList from './components/MessageList'
import UserList from './components/UserList'
import SettingsDialog from './components/SettingsDialog'
import { Avatar } from '@material-ui/core';
import MessageExtra from './components/MessageExtra'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      Connector:new Connector(this.updateMessages,this.ToggleTyping,this.SetUsers,this.SetUser,this.Notify),
      Messages:new Array(),
      User:{
        UserId:0,
        Username:"Anonymous"
      },
      Users:new Array(),
      Typing:false,
      ShowOptions:false,
      LoadedUser:false,
      ScrollRef:React.createRef(),
      AlertDialog:false,
      SettingsOpen:false,
      SnackNotif:false,
      NotifMessage:""
    }
  }

  componentDidMount(){

  }

  updateMessages = (messages) => {
    this.setState({
      Messages:messages
    })
  }

  render() {
    return (
      <div className="App">
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              SquidChat
            </Typography>
            {
              this.state.Typing && <KeyboardRounded className="TypingIndicator"></KeyboardRounded>
            }
            <IconButton className="SettingButtonRight" onClick={
              () => {
                this.setState({
                  SettingsOpen:!this.state.SettingsOpen
                })
              }
            }>
              <SettingsRounded color="disabled">

              </SettingsRounded>
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="MainCon">
          <div className="LeftPanel">
            {
              this.state.LoadedUser && <MessageList RootUser={this.state.User} Vote={this.AddVote} ScrollRef={this.state.ScrollRef} Messages={this.state.Messages}/>
            }
            {
              this.state.LoadedUser && <ChatInput ToggleDialog={this.ToggleDialog.bind(this)} Sender={this.EmitMessage} Toggle={this.ToggleTyping} Connector={this.state.Connector}/>
            }
            {
              this.state.ShowOptions && this.ReturnOptions()
            }
          </div>
          <Dialog open={this.state.AlertDialog} aria-labelledby="simple-dialog-title">
            <DialogTitle id="simple-dialog-title">
              Alert
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Message cannot be blank.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={
                () => {
                  this.ToggleDialog()
                }
              }>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          <SettingsDialog ToggleOpen={this.ToggleSettings.bind(this)} IsOpen={this.state.SettingsOpen} Users={this.state.Users} User={this.state.User} UpdateName={this.UpdateUsername}/>
          <Snackbar open={this.state.SnackNotif} anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          autoHideDuration={3000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{
           this.state.NotifMessage
          }</span>}>

          </Snackbar>
        </div>
      </div>
    );
  }

  EmitMessage = (value,payload) => {
    this.state.Connector.SendTest({
      _id:Math.floor(Math.random() * 10000),
      User:this.state.User,
      Message:value,
      Votes:0,
      VotedBy:new Array(),
      Date:new Date().getMonth() + "/" + new Date().getDay() + "/" + new Date().getFullYear(),
      Image:{
        isImage:payload.isImage,
        URL:payload.URL
      }
    });

    window.scrollTo(0,this.state.ScrollRef.current.offsetTop + 250)
    console.log(this.state)
  }

  ToggleTyping = (value) => {
    this.setState({
      Typing:value
    })
  }

  UpdateUsername = (value) => {
    let newUser = {
      UserId:this.state.User.UserId,
      Username:value
    }
    this.setState({
      User:newUser
    })

    this.state.Connector.EmitNameChange(newUser);
  }

  SetUsers = (Users) => {
    this.setState({
      Users:Users
    })
  }

  SetUser = (User) => {
    this.setState({
      User:User,
      LoadedUser:true
    })
  }

  ToggleDialog = () => {
    this.setState({
      AlertDialog:!this.state.AlertDialog
    })
  }

  ToggleSettings = () =>{
    this.setState({
      SettingsOpen:!this.state.SettingsOpen
    })
  }

  AddVote = (message) => {
    let NewMessages = this.state.Messages;

    for(let i = 0;i < NewMessages.length;i++){
      if(NewMessages[i]._id == message._id){
        if(NewMessages[i].VotedBy.indexOf(this.state.User.UserId) == -1){
          NewMessages[i].Votes++;
          NewMessages[i].VotedBy.push(this.state.User.UserId)
          this.state.Connector.EmitVote(NewMessages[i])
        }
      }
    }

    this.setState({
      Messages:NewMessages
    })
  }

  Notify = (message) => {
    this.setState({
      NotifMessage:message,
      SnackNotif:true
    })

    setTimeout(() => {
      this.setState({
        SnackNotif:false
      })
    },2000)
  }

  ReturnOptions = () => {
    return(
      <Paper className="OptionsPaper" elevation={1}>
        <Typography variant="headline" component="h3">
          {
            this.state.User.Username
          }
        </Typography>
        <Typography component="p">
          <List>
            <ListItem divider>
              <TextField className="LongText" value={this.state.User.Username} onChange={
                (event) => {
                  this.UpdateUsername(event.target.value)
                }
              }>
              </TextField>
              <Button onClick = {
                () => {
                  this.state.Connector.EmitNameChange(this.state.User);
                }
              } className="PushLeft" variant="outlined" color="primary">
                Save
              </Button>
            </ListItem>
            <ListSubHeader>
              In Room
            </ListSubHeader>
            <UserList Users={this.state.Users}>

            </UserList>
          </List>
        </Typography>
      </Paper>
    )
  }
}

export default App;
