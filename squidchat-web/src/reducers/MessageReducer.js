export default function MessageReducer(state,action){
    switch(action.type){
        case "ADD_MESSAGE":
            return{
                ...state
            }
        break;
        case "UPDATE_MESSAGES":
            return {
                ...state,
                Messages:action.payload
            }
        break;
        default:
            return{
                ...state,
                Messages:[]
            }
        break;
    }
}