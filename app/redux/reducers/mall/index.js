import { combineReducers } from 'redux';


import storeGoods from './storeGoods';
import store from './store';
import shoppingCart from './shoppingCart';
import searchGoods from './searchGoods';
import settlement from './settlement';

let mall = combineReducers({ store, shoppingCart, storeGoods, searchGoods, settlement });

export default mall;