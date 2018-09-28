import React,{ Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import PersonRounded from '@material-ui/icons/PersonRounded'
import VpnKeyRounded from '@material-ui/icons/VpnKeyRounded'
import './css/LoginForm.css'

class SignUpForm extends Component{

    constructor(props){
        super(props)

        this.state = {
            User:{
                Username:"",
                Password:"",
                Repeat:""
            }
        }
    }

    render(){
        return(
            <Card className="LoginCard">
                <CardContent>
                    <Typography>
                        Sign Up
                    </Typography>
                    <TextField placeholder="Username" value={this.state.User.Username} onChange={
                        (evt) => {
                            this.setState({
                                User:{
                                    Username:evt.target.value,
                                    Password:this.state.User.Password,
                                    Repeat:this.state.User.Repeat
                                }
                            })
                        }
                    } fullWidth={true} className="push-down" InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <PersonRounded/>
                            </InputAdornment>
                        )
                    }}/>
                    <TextField placeholder="Password" value={this.state.User.Password} onChange={
                        (evt) => {
                            this.setState({
                                User:{
                                    Username:this.state.User.Username,
                                    Password:evt.target.value,
                                    Repeat:this.state.User.Repeat
                                }
                            })
                        }
                    } fullWidth={true} className="push-down" InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <VpnKeyRounded/>
                            </InputAdornment>
                        )
                    }}/>
                    <TextField placeholder="Repeat Password" value={this.state.User.Repeat} onChange={
                        (evt) => {
                            this.setState({
                                User:{
                                    Username:this.state.User.Username,
                                    Password:this.state.User.Password,
                                    Repeat:evt.target.value
                                }
                            })
                        }
                    } fullWidth={true} className="push-down" InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <VpnKeyRounded/>
                            </InputAdornment>
                        )
                    }}/>
                    <Button variant="contained" flat={true} className="push-down btn-fifty push-right" onClick={
                        () => {
                            this.props.Toggle(true)
                        }
                    }>
                        Cancel
                    </Button>
                    <Button variant="contained" className="push-down btn-fifty push-left" onClick={
                        () => {

                        }
                    }>
                        Submit
                    </Button>
                </CardContent>
            </Card>
        )
    }

    CheckFields(){
        if(this.state.Username != "" && this.state.Password != "" && (this.state.Password == this.state.Repeat)){
            return true;
        }else{
            return false;
        }
    }
}

export default SignUpForm