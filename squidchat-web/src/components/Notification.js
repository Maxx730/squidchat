import React,{ Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';

class Notification extends Component{
    render(){
        return(
            <Snackbar open={
                this.props.open
            } anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }} autoHideDuration={
                  2000
              } message={
                <span>{
                    this.props.Name + " joined the chat."
                }</span>
            }>
            </Snackbar>
        )
    }
}

export default Notification