import React,{ Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubHeader from '@material-ui/core/ListSubheader'
import UserList from './UserList'
import './css/Settings.css'

class SettingsDialog extends Component{
    constructor(props){
        super(props)

        this.state = {
            NewUsername:this.props.User.Username
        }
    }
    render(){
        return(
            <Dialog open={this.props.IsOpen} scroll="paper">
                <DialogTitle>
                    Preferences
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Feel free to change any preferences below.
                    </DialogContentText>
                    <TextField className="LongText" placeholder="Display Name" value={this.state.NewUsername} onChange={
                        (evt) => {
                            this.setState({
                                NewUsername:evt.target.value
                            })
                        }
                    }>
                    </TextField>

                    <List>
                        <ListSubHeader>
                            In Room
                        </ListSubHeader>
                        <UserList Users={this.props.Users}>

                        </UserList>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={
                        () => {
                            this.props.ToggleOpen()
                        }
                    }>
                        Cancel
                    </Button>
                    <Button onClick = {
                        () => {
                            this.props.UpdateName(this.state.NewUsername)
                            this.props.ToggleOpen()
                        }
                    }>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default SettingsDialog;