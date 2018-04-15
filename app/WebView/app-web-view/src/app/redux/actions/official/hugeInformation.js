import request from "../../../utils/request";
import config from '../../../utils/config';

export const FETCH_HugeInformation_Request = 'FETCH_HugeInformation_Request';
export const FETCH_HugeInformation_Success = 'FETCH_HugeInformation_Success';
export const FETCH_HugeInformation_Failure = 'FETCH_HugeInformation_Failure';

export function fetchHugeInformation(){
  return async(dispatch, getState) => {
    let state = getState();
    if(state.official.hugeInformation.isFetching){
      return;
    }
    dispatch({type: FETCH_HugeInformation_Request});
    
    const res = await request.get(config.api.publish);
    if(res && !res.status){
      dispatch({type: FETCH_HugeInformation_Success,data: res.data});
    }
    else {
      dispatch({type: FETCH_HugeInformation_Failure});
    }
  }
}