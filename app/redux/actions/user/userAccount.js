import MIPush from "react-native-xmpush";


import request from "../../../util/request/request";
import config from "../../../util/request/config";


export const FETCH_UserAccount_Request = 'FETCH_UserAccount_Request';
export const FETCH_UserAccount_Success = 'FETCH_UserAccount_Success';
export const FETCH_UserAccount_Failure = 'FETCH_UserAccount_Failure';
export const CLEAR_UserAccount = 'CLEAR_UserAccount';

export function setUserAccount(){
  return async(dispatch, getState) => {

    // 验证登录权限
    let authToken = getState().identityToken.authToken;
    if(!authToken){
      return false;
    }

    dispatch({type: FETCH_UserAccount_Request});

    // 向后端请求推送的userAccount
    const res = await request
      .get(config.api.getUserAccount,null,{'X-AUTH-TOKEN':authToken});

    if(res && !res.status){
      // 指定 推送的 userAccount
      let userAccount = String(res.data.userAccount);
      dispatch({type: FETCH_UserAccount_Success,data: userAccount});
      MIPush.setAlias(userAccount);
      MIPush.setAccount(userAccount);
    }
    else {
      dispatch({type: FETCH_UserAccount_Failure});
    }

  };
}

export function clearUserAccount(){
  return (dispatch, getState) => {
    let state = getState();

    if(state.user.userAccount.data){
      // 撤销 指定 推送的 userAccount
      let userAccount = String(state.user.userAccount.data);
      MIPush.unsetAlias(userAccount);
      MIPush.unsetAccount(userAccount);
      dispatch({type:CLEAR_UserAccount});
    }
  };
}