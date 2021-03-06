import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


import location from './reducers/Location';
import recycle from './reducers/recycle';
import identityToken from './reducers/IdentityToken';
import mall from './reducers/mall';
import user from './reducers/user';
import official from './reducers/official';
import verificationCode from './reducers/verificationCode';
import miPush from './reducers/miPush';


const allReducers = combineReducers({ location, recycle, identityToken, mall, user, official, verificationCode, miPush });
// 中间件：Redux action 日志
const loggerMiddleware = createLogger();
// 通过 reducer生成store (配置中间件)
let store = createStore(allReducers, applyMiddleware(thunkMiddleware, loggerMiddleware));


export default store;