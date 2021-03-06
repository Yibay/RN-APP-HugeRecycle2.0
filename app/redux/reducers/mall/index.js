import { combineReducers } from 'redux';


import storeGoods from './storeGoods';
import store from './store';
import shoppingCart from './shoppingCart';
import searchGoods from './searchGoods';
import settlement from './settlement';
import mallOrder from './mallOrder';
import storeOffline from './storeOffline';

let mall = combineReducers({ store, shoppingCart, storeGoods, searchGoods, settlement, mallOrder, storeOffline });

export default mall;