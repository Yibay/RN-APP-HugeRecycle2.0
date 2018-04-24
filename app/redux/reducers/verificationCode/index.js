/** 验证码 */

import {combineReducers} from 'redux';


import login from './login';
import createRecycleOrder from './createRecycleOrder';
import forgetLoginPassword from './forgetLoginPassword';


let verificationCode = combineReducers({login, createRecycleOrder, forgetLoginPassword});

export default verificationCode;