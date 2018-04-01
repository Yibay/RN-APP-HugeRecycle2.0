import {combineReducers} from 'redux';


import hugeInformation from './hugeInformation';
import coverageArea from './coverageArea';

let official = combineReducers({hugeInformation, coverageArea});

export default official;