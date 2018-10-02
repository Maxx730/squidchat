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
                    <Typography color="textSecondary">
                        Sign Up
                    </Typography>
                    <TextField variant="outlined" placeholder="Username" value={this.state.User.Username} onChange={
                        (evt) => {
                            this.setState({
                                User:{
                                    Username:evt.target.value,
                                    Password:this.state.User.Password,
                                    Repeat:this.state.User.Repeat
                                }
                            })
                        }
                    } className="push-down" InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <PersonRounded color="disabled"/>
                            </InputAdornment>
                        )
                    }}/>
                    <TextField variant="outlined" placeholder="Password" value={this.state.User.Password} onChange={
                        (evt) => {
                            this.setState({
                                User:{
                                    Username:this.state.User.Username,
                                    Password:evt.target.value,
                                    Repeat:this.state.User.Repeat
                                }
                            })
                        }
                    } className="push-down" InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <VpnKeyRounded color="disabled"/>
                            </InputAdornment>
                        )
                    }}/>
                    <TextField variant="outlined" placeholder="Repeat Password" value={this.state.User.Repeat} onChange={
                        (evt) => {
                            this.setState({
                                User:{
                                    Username:this.state.User.Username,
                                    Password:this.state.User.Password,
                                    Repeat:evt.target.value
                                }
                            })
                        }
                    } className="push-down" InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <VpnKeyRounded color="disabled"/>
                            </InputAdornment>
                        )
                    }}/>
                    <Button variant="outlined" flat={true} className="push-down btn-fifty push-right" onClick={
                        () => {
                            this.props.Toggle(true)
                        }
                    }>
                        Cancel
                    </Button>
                    <Button variant="outlined" className="push-down btn-fifty push-left" onClick={
                        () => {
                            if(this.state.User.Username != "" && this.state.User.Password != "" && (this.state.User.Password == this.state.User.Repeat)){
                                this.props.SignUp({
                                    username:this.state.User.Username,
                                    password:this.state.User.Password
                                })
                            }else{
                                console.log("ERROR CREATING USER")
                            }
                        }
                    }>
                        Submit
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default SignUpForm