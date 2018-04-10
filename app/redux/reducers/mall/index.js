import { combineReducers } from 'redux';


import storeGoods from './storeGoods';
import store from './store';
import shoppingCart from './shoppingCart';


export default combineReducers({ store, shoppingCart, storeGoods });