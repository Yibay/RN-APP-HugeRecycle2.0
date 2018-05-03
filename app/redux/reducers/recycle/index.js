import {combineReducers} from 'redux';


import recyclableGoods from './recyclableGoods';
import recycledItemsList from './recycledItemsList';
import recycleOrder from './recycleOrder';

let recycle = combineReducers({recyclableGoods, recycledItemsList, recycleOrder});

export default recycle;