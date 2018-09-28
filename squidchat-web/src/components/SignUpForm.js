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
    render(){
        return(
            <Card className="LoginCard">
                <CardContent>
                    <Typography>
                        Sign Up
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
                    <TextField placeholder="Repeat Password" fullWidth={true} className="push-down" InputProps={{
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
                    <Button variant="contained" className="push-down btn-fifty push-left">
                        Submit
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default SignUpForm