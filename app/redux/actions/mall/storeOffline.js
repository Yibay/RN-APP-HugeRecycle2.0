import config from "../../../util/request/config";
import request from "../../../util/request/request";


export const FETCH_StoreOffline_Request = 'FETCH_StoreOffline_Request';
export const FETCH_StoreOffline_Success = 'FETCH_StoreOffline_Success';
export const FETCH_StoreOffline_Failure = 'FETCH_StoreOffline_Failure';
export const CLEAR_StoreOffline = 'CLEAR_StoreOffline';

export function fetchStoreOffline(){
  return async(dispatch, getState) => {
    let state = getState();

    /** 1、根据小区id, 获取便利店信息 */
    let communityId = state.location.currentLocation.communityId;

    if(communityId !== undefined){
      dispatch({type:FETCH_StoreOffline_Request});

      const res = await request.get(config.api.getOfflineStoreList,{communityId});
      console.log(res);
      if(res && !res.status){
        dispatch({type:FETCH_StoreOffline_Success,data:res.data});
      }
      else{
        dispatch({type:FETCH_StoreOffline_Failure})
      }
    }
    else{
      dispatch({type:CLEAR_StoreOffline});
    }

  };
}