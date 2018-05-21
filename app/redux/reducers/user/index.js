import {combineReducers} from 'redux';

import customerScore from './customerScore';
import customerScoreLog from './customerScoreLog';
import payPasswordFlag from './payPasswordFlag';
import recycleRecord from './recycleRecord';
import recycleRecordDetail from './recycleRecordDetail';
import mallOrderRecord from './mallOrderRecord';
import mallOrderDetail from './mallOrderDetail';
import userAddressList from './userAddressList';
import userAccount from './userAccount';

let user = combineReducers({customerScore, customerScoreLog, payPasswordFlag, recycleRecord, recycleRecordDetail, mallOrderRecord, mallOrderDetail, userAddressList, userAccount});

export default user;