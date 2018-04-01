import config from "../../../util/request/config";
import request from "../../../util/request/request";

export const FETCH_CustomerScore_Request = 'FETCH_CustomerScore_Request';
export const FETCH_CustomerScore_Success = 'FETCH_CustomerScore_Success';
export const FETCH_CustomerScore_Failure = 'FETCH_CustomerScore_Failure';


export function fetchCustomerScoreThunk(){
  return async (dispatch, getState) => {

    let state = getState();

    if(state.user.customerScore.isFetching){return;}

    let authToken = state.identityToken.authToken;
    if(!authToken){return;}

    dispatch({type: FETCH_CustomerScore_Request});
    const res = await request.get(config.api.getCustomerScore,null,{'X-AUTH-TOKEN': authToken});
    if(res && !res.status){
      dispatch({type: FETCH_CustomerScore_Success, data: res.data});
    }
    else{
      dispatch({type: FETCH_CustomerScore_Failure});
    }
  };
}