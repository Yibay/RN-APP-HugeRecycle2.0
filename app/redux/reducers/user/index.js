import {combineReducers} from 'redux';

import customerScore from './customerScore';
import payPasswordFlag from './payPasswordFlag';
import recycleRecord from './recycleRecord';
import mallOrderRecord from './mallOrderRecord';

let user = combineReducers({customerScore, payPasswordFlag, recycleRecord, mallOrderRecord});

export default user;