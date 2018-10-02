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
import Chip from '@material-ui/core/Chip'
import './css/LoginForm.css'
import { connect } from 'react-redux';

class LoginForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            User:{
                Username:"",
                Password:""
            }
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <Card className="LoginCard">
                {
                    this.props.LoginError && <CardContent className="CardError"><center><Chip label="Incorrect username or password."></Chip></center></CardContent>
                }
                <CardContent>
                    <Typography color="textSecondary">
                        Login
                    </Typography>
                    <TextField variant="outlined"  placeholder="Username" value={this.state.User.Username} className="push-down" InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <PersonRounded color="disabled"/>
                            </InputAdornment>
                        )
                    }} onChange={
                        (evt) => {
                            this.setState({
                                User:{
                                    Username:evt.target.value,
                                    Password:this.state.User.Password
                                }
                            })
                        }
                    }/>
                    <TextField variant="outlined" placeholder="Password" value={this.state.User.Password} className="push-down" InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <VpnKeyRounded color="disabled"/>
                            </InputAdornment>
                        )
                    }} onChange={
                        (evt) => {
                            this.setState({
                                User:{
                                    Username:this.state.User.Username,
                                    Password:evt.target.value
                                }
                            })
                        }
                    }/>
                    <Button variant="outlined" flat={true} className="push-down btn-fifty push-right" onClick={
                        () => {
                            this.props.Login({
                                Username:this.state.User.Username,
                                Password:this.state.User.Password
                            })
                        }
                    }>
                        Login
                    </Button>
                    <Button variant="outlined" className="push-down btn-fifty push-left" onClick={
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

const mapStateToProps = (state) => {
    return{
        LoginError:state.User.LoginError
    }
}

export default connect(mapStateToProps)(LoginForm)