import React,{ Component } from 'react'
import cookie from 'react-cookies'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import PersonRounded from '@material-ui/icons/PersonRounded'
import VpnKeyRounded from '@material-ui/icons/VpnKeyRounded'
import './css/LoginForm.css'

class LoginForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            User:{
                _id:cookie.load("SquidChatId"),
                Username:cookie.load("SquidChatUsername")
            }
        }
    }

    componentDidMount(){
        if(typeof this.state.User._id != "undefined" && typeof this.state.User.Username != "undefined"){
            this.props.Check(this.state.User);
        }
    }

    render(){
        return(
            <Card className="LoginCard">
                <CardContent>
                    <Typography>
                        Login
                    </Typography>
                    <TextField placeholder="Username" fullWidth={true} className="push-down" InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <PersonRounded/>
                            </InputAdornment>
                        )
                    }}/>
                    <TextField placeholder="Password" fullWidth={true} className="push-down" InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <VpnKeyRounded/>
                            </InputAdornment>
                        )
                    }}/>
                    <Button variant="contained" flat={true} className="push-down btn-fifty push-right">
                        Login
                    </Button>
                    <Button variant="contained" className="push-down btn-fifty push-left" onClick={
                        () => {
                            this.props.Toggle(false)
                        }
                    }>
                        Sign Up
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default LoginForm