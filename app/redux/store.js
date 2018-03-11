import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


import location from './reducers/Location';
import recycle from './reducers/Recycle';
import identityToken from './reducers/IdentityToken';
import mall from './reducers/Mall';


const allReducers = combineReducers({ location, recycle, identityToken, mall });
// 中间件：Redux action 日志
const loggerMiddleware = createLogger();
// 通过 reducer生成store (配置中间件)
let store = createStore(allReducers, applyMiddleware(thunkMiddleware, loggerMiddleware));


export default store;