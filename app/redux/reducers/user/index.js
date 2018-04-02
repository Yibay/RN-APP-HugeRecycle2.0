import {combineReducers} from 'redux';

import customerScore from './customerScore';
import customerScoreLog from './customerScoreLog';
import payPasswordFlag from './payPasswordFlag';
import recycleRecord from './recycleRecord';
import mallOrderRecord from './mallOrderRecord';

let user = combineReducers({customerScore, customerScoreLog, payPasswordFlag, recycleRecord, mallOrderRecord});

export default user;