import {combineReducers} from 'redux';


import jumpRecycleRecord from './jumpRecycleRecord';
import quickStart from './quickStart';


let miPush = combineReducers({jumpRecycleRecord, quickStart});

export default miPush;