import { createStore,applyMiddleware,combineReducers } from 'redux'
import Connector from './api/Connector'
import UserReducer from './reducers/UserReducer'
import NetworkReducer from './reducers/NetworkReducer'
import MessageReducer from './reducers/MessageReducer'
import UserListReducer from './reducers/UserListReducer'
import ComposeReducer from './reducers/ComposeReducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios'
import UserList from './components/UserList';

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
    Messages:[],
    Users:[],
    Message:{}
}

const Reducers = combineReducers({
    User:UserReducer,
    Network:NetworkReducer,
    Messages:MessageReducer,
    Users:UserListReducer,
    Message:ComposeReducer
})

const middleware = applyMiddleware(thunk,logger)
const Store = createStore(Reducers,InitialState,middleware);


Store.subscribe(() => {

})

export default Store;