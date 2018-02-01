import { createStore, combineReducers } from 'redux';


import location from './reducers/Location';
import recycle from './reducers/Recycle';
import identityToken from './reducers/IdentityToken';
import mall from './reducers/Mall';


const allReducers = combineReducers({ location, recycle, identityToken, mall });
// 通过 reducer生成store
let store = createStore(allReducers);

// 打印初始化state
console.log(store.getState());

// 监听state更新
let unsubscribe = store.subscribe(() => console.log(store.getState()));


export default store;