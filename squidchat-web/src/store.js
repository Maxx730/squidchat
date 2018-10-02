import { createStore,applyMiddleware,combineReducers } from 'redux'
import Connector from './api/Connector'
import UserReducer from './reducers/UserReducer'
import NetworkReducer from './reducers/NetworkReducer'
import MessageReducer from './reducers/MessageReducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios'

//Initial REDUX state is set here.
const InitialState = {
    User:{
        _id:0,
        Username:"",
        LoggedIn:false,
        CookieSet:false,
        LoginError:false
    },
    Network:{
        Result:{
            TYPE:"NULL"
        }
    },
    Messages:[]
}

const Reducers = combineReducers({
    User:UserReducer,
    Network:NetworkReducer,
    Messages:MessageReducer
})

const middleware = applyMiddleware(thunk,logger)
const Store = createStore(Reducers,InitialState,middleware);


Store.subscribe(() => {

})

export default Store;