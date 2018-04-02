import config from "../../../util/request/config";
import request from "../../../util/request/request";


export const FETCH_CustomerScoreLog_Request = 'FETCH_CustomerScoreLog_Request';
export const FETCH_CustomerScoreLog_Success = 'FETCH_CustomerScoreLog_Success';
export const FETCH_CustomerScoreLog_Failure = 'FETCH_CustomerScoreLog_Failure';

export function fetchCustomerScoreLogThunk(){
  return async (dispatch, getState) => {

    let state = getState();
    if(state.user.customerScoreLog.isFetching){return;}

    let authToken = state.identityToken.authToken;
    if(!authToken){return;}

    dispatch({type: FETCH_CustomerScoreLog_Request});
    const res = await request.get(config.api.getCustomerScoreLog, null, {'X-AUTH-TOKEN': authToken});
    if(res && !res.status){
      dispatch({type: FETCH_CustomerScoreLog_Success, data: res.data});
    }
    else {
      dispatch({type: FETCH_CustomerScoreLog_Failure});
    }
  }
}