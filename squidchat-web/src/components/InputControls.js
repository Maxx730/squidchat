import React,{ Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import './css/InputControls.css'
import Button from '@material-ui/core/Button'
import AddPhotoAlternateRounded from '@material-ui/icons/AddPhotoAlternateRounded'
import FaceRounded from '@material-ui/icons/FaceRounded'
import MovieRounded from '@material-ui/icons/MovieRounded'
import SettingsRounded from '@material-ui/icons/SettingsRounded'
import ToolTip from '@material-ui/core/Tooltip'

class InputControls extends Component{
    render(){
        return(
            <Card className="FloatingControls">
                <ToolTip title="Send Image" placement="top">
                    <Button variant="outlined" onClick={
                        () => {
                            this.props.ToggleUpload(true)
                        }
                    }>
                        <AddPhotoAlternateRounded color="disabled"/>
                    </Button>
                </ToolTip>
                <ToolTip title="Emoji" placement="top">
                    <Button variant="outlined" className="push-control-right" onClick={
                        () => {
                            this.props.ToggleEmoji(true)
                        }
                    }>
                        <FaceRounded color="disabled"/>
                    </Button>
                </ToolTip>
                <ToolTip title="Link Youtube" placement="top">
                    <Button variant="outlined" className="push-control-right">
                        <MovieRounded color="disabled"/>
                    </Button>
                </ToolTip>
                <ToolTip title="Preferences" placement="top">
                    <Button variant="outlined" className="push-control-right" onClick={
                        () => {
                            this.props.ToggleSettings(true)
                        }
                    }>
                        <SettingsRounded color="disabled"/>
                    </Button>
                </ToolTip>
            </Card>
        )
    }
}

export default InputControls