import React,{ Component } from 'react'
import ListItemText from '@material-ui/core/ListItemText'

class ImageMessage extends Component{
    render(){
        return(
            <ListItemText>
                <img src = {this.props.Image.URL}/>
            </ListItemText>
        )
    }
}

export default ImageMessage