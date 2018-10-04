
export function UpdateMessage(dispatch,Message){
    dispatch({
        type:"UPDATE_MESSAGE",
        payload:Message
    })
}

export function ResetMessage(dispatch){
    dispatch({
        type:"RESET_MESSAGE",
        payload:{
            Message:"",
            Type:"standard"
        }
    })
}