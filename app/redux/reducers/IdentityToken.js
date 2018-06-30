import { combineReducers } from 'redux';

/* ------ type 类型 ------ */
import { SET_IdentityToken } from '../actions/IdentityToken';

/**
 * 权限身份令牌
 * @param {string} state
 * @param {{'X-AUTH-TOKEN': string}} action
 * @returns {string}
 */
function authToken (state='', action){
  switch (action.type){
    case SET_IdentityToken:
      return action['X-AUTH-TOKEN'];
    default:
      return state;
  }
}

/**
 *
 * @param {string} state
 * @param {{h5Code: string}} action
 * @returns {string}
 */
function h5Code (state='', action){
  switch (action.type){
    case SET_IdentityToken:
      return action.h5Code;
    default:
      return state;
  }
}

/**
 * 用户信息
 * @param {object} state
 * @param {{user: {id:num, name:string, phone:string, imgURL:string}}} action
 * @returns {object}
 */
function user(state={}, action){
  switch (action.type){
    case SET_IdentityToken:
      return action.user;
    default:
      return state;
  }
}

const identityToken = combineReducers({authToken, h5Code, user});

export default identityToken;