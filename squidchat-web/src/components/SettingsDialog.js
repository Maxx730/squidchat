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

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={
                        () => {
                            this.props.Open(false)
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
        Users:state.Users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingsDialog);