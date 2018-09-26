import React,{ Component } from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'

class UserList extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="UserList">
                {
                    this.props.Users.map((User) => {
                        return (
                            <ListItem divider>
                                <Avatar>
                                    {
                                        User.Username.slice(0,2).toUpperCase()
                                    }
                                </Avatar>
                                <ListItemText>
                                    {
                                        User.Username
                                    }
                                </ListItemText>
                            </ListItem>
                        )
                    })
                }
            </div>
        )
    }
}

export default UserList;