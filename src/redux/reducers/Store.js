import {createStore, combineReducers, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleWare from "redux-thunk"
import appReducer from './appReducer';
import wishListReducer from './wishListReducer';

const reducer = combineReducers({
    app: appReducer,
    wishList: wishListReducer,
});

const initialState = {};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleWare)));

export default store;