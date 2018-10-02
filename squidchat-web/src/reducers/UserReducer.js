export default function UserReducer(state,action){
    switch(action.type){
        case "USER_SIGN_UP":
            return{
                ...state,
                Users:action.payload
            }
        break;
        case "UPDATE_USER_INFO":
            return{
                ...state,
                Username:action.payload.Username,
                _id:action.payload._id,
                LoggedIn:true
            }
        break;
        case "SET_LOGIN_ERROR":
            return{
                ...state,
                LoginError:true
            }
        break;
        default:
            return{
                ...state
            }
        break;
    }
}