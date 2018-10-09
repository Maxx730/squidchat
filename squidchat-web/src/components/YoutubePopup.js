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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { AddMessage } from '../actions/MessageActions'

class YoutubePopup extends Component{
    constructor(props){
        super(props)

        this.state = {
            ActiveStep:0,
            Passed:false,
            YoutubeId:"",
            Connector:this.props.Connector
        }
    }

    render(){
        return(
            <Dialog open={this.props.Open}>
                <DialogContent>
                    <Stepper activeStep={this.state.ActiveStep}>
                        <Step>
                            <StepLabel>
                                Choose
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>
                                Share
                            </StepLabel>
                        </Step>
                    </Stepper>
                    <Typography className="PopupDescription">
                        Please provide a Youtube video URL below.
                    </Typography>
                    {
                        this.state.Passed && <center className="push-up"><iframe width="280" height="157" src={"https://www.youtube.com/embed/" + this.state.YoutubeId} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></center>
                    }
                    <TextField label="Youtube Video" className="YoutubeDialog" variant="outlined" onChange={
                        (evt) => {
                            if(evt.target.value.indexOf("youtube.com/watch") > -1){
                                let parts = evt.target.value.split("watch?v=")

                                this.setState({
                                    ActiveStep:1,
                                    Passed:true,
                                    YoutubeId:parts[1]
                                })
                            }
                        }
                    }/>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={
                        () => {
                            this.setState({
                                ActiveStep:0,
                                Passed:false
                            },() => {
                                this.props.Toggle(false)
                            })
                        }
                    }>
                        Cancel
                    </Button>
                    <Button variant="outlined" onClick={
                        () => {
                            if(this.state.YoutubeId != ""){
                                this.props.Connector.SendMessage({
                                    User:{
                                        _id:this.props.User._id,
                                        Username:this.props.User.Username
                                    },
                                    Type:"youtube",
                                    YoutubeId:this.state.YoutubeId
                                })

                                this.setState({
                                    ActiveStep:0,
                                    Passed:false
                                },() => {
                                    this.props.Toggle(false)
                                })
                            }
                        }
                    }>
                        Share
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        User:state.User
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(YoutubePopup)