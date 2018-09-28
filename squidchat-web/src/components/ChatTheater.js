import React,{ Component } from 'react'
import Paper from '@material-ui/core/Paper'

import TheaterControls from './TheaterControls'
import './css/ChatTheater.css'
import Youtube from 'react-youtube'

class ChatTheater extends Component{
    constructor(props){
        super(props)

        this.state = {
            VideoOpts:{
                height:'200',
                width:'300',
                playerVars:{
                    autoplay:0
                }
            },
            Video:{
                _id:'',
                Title:'',
                Playing:false
            }
        }
    }
    componentDidMount(){
        if(this.props.Video.playing){
            console.log("playing")
            this.PlayVideo()
        }
    }

    render(){
        return(
            <Paper className="FloatingTheater">
                <Youtube id="VideoPlayer" videoId={this.props.Video._id} opts={this.state.VideoOpts} onReady={this.VideoReady} onPlay={this.PlayVideo} onPause={this.PauseVideo}/>
            </Paper>
        )
    }

    VideoReady = (event) => {

    }

    PlayVideo = (event) => {
        this.props.Connector.EmitPlayingVideo();
    }

    PauseVideo = (event) => {
        this.props.Connector.EmitPausingVideo();
    }
}

export default ChatTheater