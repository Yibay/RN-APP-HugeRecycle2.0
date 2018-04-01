import config from "../../../util/request/config";
import request from "../../../util/request/request";


export const FETCH_HugeInformation_Request = 'FETCH_HugeInformation_Request';
export const FETCH_HugeInformation_Success = 'FETCH_HugeInformation_Success';
export const FETCH_HugeInformation_Failure = 'FETCH_HugeInformation_Failure';


export function fetchHugeInformationThunk(){
  return async (dispatch, getState) => {

    let state = getState();
    if(state.official.hugeInformation.isFetching){return;}

    dispatch({type: FETCH_HugeInformation_Request});
    // 获取 发布信息列表
    const res = await request.get(config.api.publish);
    if(res && !res.status){
      dispatch({type: FETCH_HugeInformation_Success, data: res.data.map(item => {item.key = item.id; return item})});
    }
    else {
      dispatch({type: FETCH_HugeInformation_Failure});
    }

  }
}