export default function NetworkReducer(state,action){
    switch(action.type){
        case "CheckUser":
            return{
                ...state,
                Result:{
                    TYPE:"SUCCESS"
                }
            }
        break;
        default:
            return{
                ...state
            }
        break;
    }
}