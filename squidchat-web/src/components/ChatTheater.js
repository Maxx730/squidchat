import React,{ Component } from 'react'
import Paper from '@material-ui/core/Paper'

import TheaterControls from './TheaterControls'
import './css/ChatTheater.css'

class ChatTheater extends Component{
    render(){
        return(
            <Paper className="FloatingTheater">
                <iframe width="280" src="https://www.youtube.com/embed/H_Z9orDS84c" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <TheaterControls/>
            </Paper>
        )
    }
}

export default ChatTheater