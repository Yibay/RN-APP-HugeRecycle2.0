import {combineReducers} from 'redux';


import createOrder from './createOrder';
import evaluationOrder from './evaluationOrder';


let recycleOrder = combineReducers({createOrder, evaluationOrder});

export default recycleOrder;