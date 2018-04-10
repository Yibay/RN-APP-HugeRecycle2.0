import { combineReducers } from 'redux';


import storeGoods from './storeGoods';
import store from './store';
import shoppingCart from './shoppingCart';
import searchGoods from './searchGoods';


export default combineReducers({ store, shoppingCart, storeGoods, searchGoods });