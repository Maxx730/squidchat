import cookie from 'react-cookies'

export function CreateUser(dispatch,User){
    fetch('http://localhost:3000/user/create',{
        method:"post",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(User)
    }).then(response =>
        response.json()).then(data => {
            cookie.save("SquidChatHash",data.USER.Hash)
            dispatch({
                type:"UPDATE_USER_INFO",
                payload:data.USER
            })
        })
}

export function CheckLogin(dispatch,User){
    fetch('http://localhost:3000/check/login',{
        method:"post",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(User)
    }).then(response => response.json()).then(data => {
        if(data.TYPE == "SUCCESS"){

            console.log(data)

            cookie.save("SquidChatHash",data.PAYLOAD.hash)

            dispatch({
                type:"UPDATE_USER_INFO",
                payload:data.PAYLOAD
            })
        }else{
            dispatch({
                type:"SET_LOGIN_ERROR",
                payload:true
            })
        }
    })
}

export function GetFromHash(dispatch,hash,callback){
    fetch('http://localhost:3000/hash/check',{
        method:"post",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
            hash:hash
        })
    }).then(response => response.json()).then(data => {
        if(data.TYPE == "SUCCESS"){
            dispatch({
                type:"UPDATE_USER_INFO",
                payload:{
                    _id:data.PAYLOAD._id,
                    Username:data.PAYLOAD.username,
                    Nickname:data.PAYLOAD.nickname
                }
            })

            callback()
        }
    })
}

export function RefreshUser(dispatch,User){
    dispatch({
        type:"UPDATE_USER_INFO",
        payload:{
            _id:User._id,
            Username:User.Username,
            Nickname:User.Nickname
        }
    })
}

export function UpdateUserList(dispatch,Users){
    dispatch({
        type:"UPDATE_LIST",
        payload:Users
    })
}

export function Logout(dispatch){
    dispatch({
        type:"USER_LOGGED_OUT"
    })
}

export function UpdateNickname(User,callback){
    fetch('http://localhost:3000/update/nickname',{
        method:"POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(User)
    }).then(result => result.json()).then(data => {
        if(data.TYPE == "SUCCESS"){
            callback()
        }
    })
}