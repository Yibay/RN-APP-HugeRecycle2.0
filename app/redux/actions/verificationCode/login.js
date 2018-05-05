import request from '../../../util/request/request';
import config from '../../../util/request/config';


export const FETCH_Login_VerificationCode_Request = 'FETCH_Login_VerificationCode_Request';
export const FETCH_Login_VerificationCode_Success = 'FETCH_Login_VerificationCode_Success';
export const FETCH_Login_VerificationCode_Failure = 'FETCH_Login_VerificationCode_Failure';
export const CLEAR_Login_VerificationCode_Data = 'CLEAR_Alert_Data';

export function getCode(phone){
  return async (dispatch, getState) => {
    dispatch({type: FETCH_Login_VerificationCode_Request});

    const res = await Promise.race([
      request.post(config.api.getCode, {phone}),
      new Promise(function(resolve, reject){setTimeout(() => resolve({status: 1, message: '网络请求超时'}), 10000)})
    ]);
    if(res && !res.status){
      dispatch({type: FETCH_Login_VerificationCode_Success, data: res.data || ''});
      return true;
    }
    else {
      dispatch({type: FETCH_Login_VerificationCode_Failure, data: res.message || '获取验证码失败'});
      return false;
    }

  }
}

/** 用于 getCode 成功，Alert 成功消息后，清除Alert的data */
export function clearData(){
  return {type: CLEAR_Login_VerificationCode_Data};
}