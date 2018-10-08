import React,{ Component } from 'react'
import Card from '@material-ui/core/Card'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './css/YoutubePopup.css'

class YoutubePopup extends Component{
    render(){
        return(
            <Dialog open={true}>
                <TextField label="Youtube Video" className="YoutubeDialog" variant="outlined"/>
                <DialogActions>
                    <Button variant="outlined">
                        Cancel
                    </Button>
                    <Button variant="outlined">
                        Share
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default YoutubePopup