import { createStore } from 'redux';


import location from './reducers/Location'


// 通过 reducer生成store
let store = createStore(location);

// 打印初始化state
console.log(store.getState());

// 监听state更新
let unsubscribe = store.subscribe(() => console.log(store.getState()));


export default store;