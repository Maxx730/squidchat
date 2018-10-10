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
import { connect } from 'react-redux'
import { UpdateNickname } from '../actions/UserActions'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar'

class SettingsDialog extends Component{
    constructor(props){
        super(props)

        this.state = {
            NewUsername:this.props.User.Username,
            NameIndex:null,
            NewNickname:""
        }
    }
    render(){
        return(
            <Dialog open={this.props.IsOpen}>
                <DialogTitle>
                    Preferences
                </DialogTitle>
                <DialogContent className="SettingsDialog">
                    <Avatar onClick={
                        () => {
                            this.props.ToggleImageUpload(true,"profile")
                        }
                    } button>
                        MK
                    </Avatar>
                </DialogContent>
                <List className="UserList">
                    <ListItem divider>
                        <FormControlLabel label="SFW Mode" control={
                            <Switch/>
                        }>

                        </FormControlLabel>
                    </ListItem>
                    {
                        this.props.Users.Users.map((User,index) => {
                            return <ListItem button key={index} divider onClick={
                                () => {
                                    this.setState({
                                        NameIndex:index,
                                        NewNickname:User.Nickname
                                    })
                                }
                            }>{
                                this.state.NameIndex == index ? <div><TextField onChange={
                                    (evt) => {
                                        this.setState({
                                            NewNickname:evt.target.value
                                        })
                                    }
                                } variant="outlined" value={this.state.NewNickname} label="Nickname" margin="dense"/><Button variant="outlined" className="SaveNickname" onClick={
                                    () => {
                                        let NewUser = User;
                                        NewUser.Nickname = this.state.NewNickname
                                        UpdateNickname(NewUser,() => {
                                            this.props.Connector.RefreshUsers(this.props.Users);
                                            this.props.Open(false)
                                        })
                                    }
                                }>Save</Button></div> : User.Username
                            }</ListItem>
                        })
                    }
                </List>
                <DialogActions>
                    <Button variant="outlined" onClick={
                        () => {
                            this.props.Open(false)
                            this.setState({
                                NameIndex:null
                            })
                        }
                    }>
                        Cancel
                    </Button>
                    <Button variant="outlined" onClick = {
                        () => {
                            this.props.Open(false)
                        }
                    }>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Users:state.Users,
        User:state.User
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingsDialog);