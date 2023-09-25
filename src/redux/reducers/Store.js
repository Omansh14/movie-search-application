import {createStore, combineReducers, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleWare from "redux-thunk"
import appReducer from './appReducer';
import wishListReducer from './wishListReducer';
import  userReducer  from './userReducer';

const reducer = combineReducers({
    user: userReducer,
    app: appReducer,
    wishList: wishListReducer,
});

const initialState = {};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleWare)));

export default store;