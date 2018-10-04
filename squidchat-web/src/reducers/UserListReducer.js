export default function UserListReducer(state,action){
    switch(action.type){
        case "UPDATE_LIST":
            return{
                ...state,
                Users:action.payload
            }
        break;
        default:
            return{
                ...state
            }
        break;
    }
}