import React,{ Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import AddRounded from '@material-ui/icons/AddRounded'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import './css/MessageExtra.css'
import Input from '@material-ui/core/Input'
import LinkRounded from '@material-ui/icons/LinkRounded'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import MinimizeRounded from '@material-ui/icons/MinimizeRounded'


class MessageExtra extends Component{
    constructor(props){
        super(props)

        this.state = {
            ImageURL:"",
            isExpanded:true
        }
    }

    render(){
        return(
            <ExpansionPanel expanded={this.state.isExpanded}>
                <ExpansionPanelSummary expandIcon={
                    this.state.isExpanded ? <MinimizeRounded onClick={
                        () => {
                            this.setState({
                                isExpanded:!this.state.isExpanded
                            })
                        }
                    }/> : <AddRounded onClick={
                        () => {
                            this.setState({
                                isExpanded:!this.state.isExpanded
                            })
                        }
                    }/>
                }>
                    <Typography>
                        Add More
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                        <Input startAdornment={
                            <InputAdornment>
                                <LinkRounded color="disabled"/>
                            </InputAdornment>
                        } fullWidth={true} value={this.state.ImageURL} className="FullText" placeholder="Image URL" onChange={
                            (evt) => {
                                this.setState({
                                    ImageURL:evt.target.value
                                })
                            }
                        }/>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <center className="CenterSendImage">
                        {
                            this.state.ImageURL != "" && <img  src = {this.state.ImageURL}/>
                        }
                        <div className="ImageSend">
                            <Button variant="contained" onClick={
                                () => {
                                    this.props.Sender("",{
                                        isImage:true,
                                        URL:this.state.ImageURL
                                    })

                                    this.setState({
                                        ImageURL:"",
                                        isExpanded:false
                                    })
                                }
                            }>
                                Send
                            </Button>
                        </div>
                    </center>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default MessageExtra