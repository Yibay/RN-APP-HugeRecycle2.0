import {combineReducers} from 'redux';

import customerScore from './customerScore';
import payPasswordFlag from './payPasswordFlag';

let user = combineReducers({customerScore, payPasswordFlag});

export default user;