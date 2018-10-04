import React,{ Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import './css/ImageUpload.css'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import { connect } from 'react-redux'
import { ResetMessage,UpdateMessage } from '../actions/ComposeActions'

class ImageUpload extends Component{
    constructor(props){
        super(props)

        this.state = {
            isLoading:false,
            ImageURL:"",
            ActiveStep:0
        }
    }

    render(){
        return(
            <Dialog open={true}>
                <DialogTitle>
                    Upload Image
                </DialogTitle>
                <Stepper activeStep={this.state.ActiveStep}>
                    <Step>
                        <StepLabel>
                            Choose
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            Upload
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            Send
                        </StepLabel>
                    </Step>
                </Stepper>
                <DialogContent>
                    {
                        !this.state.ImageURL && <DialogContentText>
                        Please choose an image file to upload to the chat.
                        <form onSubmit={
                            (ev) => {

                            }
                        }>
                            <input onClick={
                              () => {
                                  this.setState({
                                      ActiveStep:this.state.ActiveStep+1
                                  })
                              }
                            } ref={
                                (ref) => {
                                    this.UploadFile = ref
                                }
                            } type="file"/>
                        </form>
                    </DialogContentText>
                    }
                    {
                        this.state.isLoading && <CircularProgress/>
                    }
                    {
                        this.state.ImageURL != "" && <div>
                            <DialogContentText>
                                <p>
                                    Would you like to send this image?
                                </p>
                            </DialogContentText>
                            <center className="RoundedSendPort">
                                <img src = {"http://localhost:3000/"+this.state.ImageURL} width="200"/>
                            </center>
                            <DialogActions>
                                <Button onClick={
                                  () => {
                                      this.props.ToggleUpload(false)
                                  }
                                } variant="outlined">
                                    Cancel
                                </Button>
                                <Button variant="outlined" onClick={
                                    () => {
                                        //Here we want to update
                                        this.props.Connector.SendImage({
                                            Type:"image",
                                            Image:{
                                                Url:this.state.ImageURL
                                            },
                                            User:{
                                                _id:this.props.User._id,
                                                Username:this.props.User.Username
                                            }
                                        })

                                        this.props.ToggleUpload(false)
                                    }
                                }>
                                    Send
                                </Button>
                            </DialogActions>
                        </div>
                    }
                </DialogContent>
                {
                    !this.state.ImageURL && <DialogActions>
                        <Button variant="outlined" onClick={
                            () => {
                                this.props.ToggleUpload(false)
                            }
                        }>
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={
                            () => {
                                this.UploadImage()
                                this.setState({
                                    ActiveStep: this.state.ActiveStep+1
                                })
                            }
                        }>
                            Upload
                        </Button>
                    </DialogActions>
                }
            </Dialog>
        )
    }

    UploadImage(){
        const data = new FormData();
        data.append('file',this.UploadFile.files[0])


        fetch('http://localhost:3000/upload/image',{
            method:"POST",
            body:data
        }).then((response) => {
            this.setState({
                isLoading:true
            })

            return response.json()
        }).then(data => {
            this.setState({
                isLoading:false,
                ImageURL:data.FILE.path
            })
        })
    }
}

const matchStateToProps = (state) => {
    return{
        Message:state.Message
    }
}

const matchDispatchToProps = (dispatch) => {

}

export default connect(matchStateToProps,matchDispatchToProps)(ImageUpload)