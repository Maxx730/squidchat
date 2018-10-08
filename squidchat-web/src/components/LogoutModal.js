import React,{ Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

class LogoutModal extends Component{
    render(){
        return(
            <Dialog open={this.props.LogoutOpen}>
                <DialogTitle>
                    Logout
                </DialogTitle>
                <DialogContent>
                    Are you sure you would like to log out?
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={
                        () => {
                            this.props.Close(false)
                        }
                    }>
                        Cancel
                    </Button>
                    <Button variant="outlined" onClick={
                        () => {
                            this.props.Logout()
                        }
                    }>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default LogoutModal