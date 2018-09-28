import React,{ Component } from 'react'

import IconButton from '@material-ui/core/IconButton'
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded'
import PauseRounded from '@material-ui/icons/PauseRounded'
import Forward10Rounded from '@material-ui/icons/Forward10Rounded'
import Replay10Rounded   from '@material-ui/icons/Replay10Rounded'

class TheaterControls extends Component{
    render(){
        return(
            <center>
                <IconButton>
                    <Replay10Rounded/>
                </IconButton>
                <IconButton>
                    <PauseRounded/>
                </IconButton>
                <IconButton>
                    <PlayArrowRounded onClick={this.props.Play}/>
                </IconButton>
                <IconButton>
                    <Forward10Rounded/>
                </IconButton>
            </center>
        )
    }
}

export default TheaterControls