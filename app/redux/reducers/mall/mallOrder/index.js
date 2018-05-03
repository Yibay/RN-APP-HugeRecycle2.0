import {combineReducers} from 'redux';


import deleteMallOrder from './deleteMallOrder';


// 商城订单的一系列操作
let mallOrder = combineReducers({deleteMallOrder});

export default mallOrder;