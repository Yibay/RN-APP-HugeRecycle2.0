import {combineReducers} from 'redux';


import ignoreGuide from './ignoreGuide';
import jumpRecycleRecord from './jumpRecycleRecord';


let miPush = combineReducers({ignoreGuide, jumpRecycleRecord});

export default miPush;