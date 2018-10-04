import React,{ Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

class MessageDialog extends Component{
    render(){
        return(
            <Dialog open={this.props.Show}>
                <DialogTitle>
                    {
                        this.props.Title
                    }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {
                            this.props.Content
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={
                        () => {
                            this.props.Close()
                        }
                    }>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default MessageDialog