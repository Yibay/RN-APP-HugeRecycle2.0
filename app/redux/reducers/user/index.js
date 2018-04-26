import {combineReducers} from 'redux';

import customerScore from './customerScore';
import customerScoreLog from './customerScoreLog';
import payPasswordFlag from './payPasswordFlag';
import recycleRecord from './recycleRecord';
import recycleRecordDetail from './recycleRecordDetail';
import mallOrderRecord from './mallOrderRecord';
import userAddressList from './userAddressList';

let user = combineReducers({customerScore, customerScoreLog, payPasswordFlag, recycleRecord, recycleRecordDetail, mallOrderRecord, userAddressList});

export default user;