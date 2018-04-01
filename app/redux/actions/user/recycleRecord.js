import config from "../../../util/request/config";
import request from "../../../util/request/request";


export const FETCH_RecycleRecord_Request = 'FETCH_RecycleRecord_Request';
export const FETCH_RecycleRecord_Success= 'FETCH_RecycleRecord_Success';
export const FETCH_RecycleRecord_Failure = 'FETCH_RecycleRecord_Failure';


export function fetchRecycleRecordThunk(){
  return async (dispatch, getState) => {

    let state = getState();

    if(state.user.recycleRecord.isFetching){return;}

    let authToken = state.identityToken.authToken;
    if(!authToken){return;}

    dispatch({type: FETCH_RecycleRecord_Request});
    const res = await request
      .get(config.api.myOrders, null, {'X-AUTH-TOKEN': authToken});

    if(res && !res.status){
      dispatch({type: FETCH_RecycleRecord_Success, data:res.data.map(item => {item.key = item.id; return item;})});
    }
    else {
      dispatch({type: FETCH_RecycleRecord_Failure});
    }
  }
}

export default fetchRecycleRecordThunk;