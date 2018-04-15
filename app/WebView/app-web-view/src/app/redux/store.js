import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


import official from './reducers/official';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleware = createLogger();

const allReducers = combineReducers({official});

const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)));

export default store;