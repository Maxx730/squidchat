import React,{ Component } from 'react'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import './css/TopPanel.css'
import MeetingRoomRounded from '@material-ui/icons/MeetingRoomRounded'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

class TopPanel extends Component{
    render() {
        return(
            <Card className="TopPanel">
                <IconButton>
                    <i className={"em em em-squid larger"}/>
                </IconButton>
                <Tooltip title="Logout">
                    <IconButton className="LogoutButton" onClick={
                        () => {
                            this.props.OpenLogout(true)
                        }
                    }>
                        <MeetingRoomRounded color="disabled"/>
                    </IconButton>
                </Tooltip>
            </Card>
        )
    }
}

export default TopPanel