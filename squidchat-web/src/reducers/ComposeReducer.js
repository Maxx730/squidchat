export default function ComposeReducer(state,action){
    switch(action.type){
        case "UPDATE_MESSAGE":
            return {
                ...state,
                Message:action.payload.Message,
                Type:action.payload.Type
            }
        break;
        case "RESET_MESSAGE":
            return{
                ...state,
                Message:"",
                Type:"standard"
            }
        break;
        default:
            return{
                ...state,
                Message:"",
                Type:"standard"
            }
        break;
    }
}