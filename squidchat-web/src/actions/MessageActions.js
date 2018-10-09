export function AddMessage(dispatch,Message){
    console.log(Message)
    dispatch({
        type:"ADD_MESSAGE",
        payload:Message
    })
}

export function UpdateMessages(dispatch,Messages){
    dispatch({
        type:"UPDATE_MESSAGES",
        payload:Messages
    })
}