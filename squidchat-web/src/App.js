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

//import connections
import Connector from './api/Connector'

//import components
import ChatInput from './components/ChatInput'
import MessageList from './components/MessageList'
import UserList from './components/UserList'
import { Avatar } from '@material-ui/core';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      Connector:new Connector(this.updateMessages,this.ToggleTyping,this.SetUsers,this.SetUser),
      Messages:new Array(),
      User:{
        UserId:0,
        Username:"Anonymous"
      },
      Users:new Array(),
      Typing:false,
      ShowOptions:false,
      LoadedUser:false,
      ScrollRef:React.createRef()
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
        <AppBar position="static" color="primary">
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
                  ShowOptions:!this.state.ShowOptions
                })
              }
            }>
              <SettingsRounded color="secondary">

              </SettingsRounded>
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="MainCon">
          <div className="LeftPanel">
            {
              this.state.LoadedUser && <MessageList ScrollRef={this.state.ScrollRef} Messages={this.state.Messages}/>
            }
            {
              this.state.LoadedUser && <ChatInput Sender={this.EmitMessage} Toggle={this.ToggleTyping} Connector={this.state.Connector}/>
            }
            {
              this.state.ShowOptions && this.ReturnOptions()
            }
          </div>
        </div>
      </div>
    );
  }

  EmitMessage = (value) => {
    this.state.Connector.SendTest({
      User:this.state.User,
      Message:value,
      Votes:0,
      VotedBy:new Array(),
      Date:new Date()
    });

    window.scrollTo(0,this.state.ScrollRef.current.offsetTop + 250)
  }

  ToggleTyping = (value) => {
    this.setState({
      Typing:value
    })
  }

  UpdateUsername = (value) => {
    this.setState({
      User:{
        UserId:this.state.User.UserId,
        Username:value
      }
    })
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
