import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import KeyboardRounded from '@material-ui/icons/KeyboardRounded'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ListSubHeader from '@material-ui/core/ListSubheader'

//import connections
import Connector from './api/Connector'

//import components
import ChatInput from './components/ChatInput'
import MessageList from './components/MessageList'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      Connector:new Connector(this.updateMessages,this.ToggleTyping),
      Messages:new Array(),
      User:{
        UserId:0,
        Username:"Anonymous"
      },
      Users:new Array(),
      Typing:false
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
          <Toolbar variant="dense">
            <Typography variant="title" color="inherit">
              SquidChat
            </Typography>
            {
              this.state.Typing && <KeyboardRounded className="TypingIndicator"></KeyboardRounded>
            }
          </Toolbar>
        </AppBar>
        <div className="MainCon">
          <div className="LeftPanel">
            <MessageList Messages={this.state.Messages}/>
            <ChatInput Sender={this.EmitMessage} Toggle={this.ToggleTyping} Connector={this.state.Connector}/>
            <Paper className="OptionsPaper" elevation={1}>
              <Typography variant="headline" component="h3">
                Options
              </Typography>
              <Typography component="p">
                <List>
                  <ListItem divider>
                    <TextField className="LongText" value={this.state.User.Username}>
                    </TextField>
                    <Button className="PushLeft" variant="outlined" color="primary">
                      Save
                    </Button>
                  </ListItem>
                  <ListSubHeader>
                    In Room
                  </ListSubHeader>
                </List>
              </Typography>
            </Paper>
          </div>
        </div>
      </div>
    );
  }

  EmitMessage = (value) => {
    this.state.Connector.SendTest({
      User:this.state.User,
      Message:value
    });
  }

  ToggleTyping = (value) => {
    this.setState({
      Typing:value
    })
  }

  UpdateUsername = (value) => {
    this.setState({
      User:{
        Username:value
      }
    })
  }
}

export default App;
