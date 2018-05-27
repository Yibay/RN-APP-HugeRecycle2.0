import config from "../../../util/request/config";
import request from "../../../util/request/request";


export const FETCH_CoverageArea_Request = 'FETCH_CoverageArea_Request';
export const FETCH_CoverageArea_Success = 'FETCH_CoverageArea_Success';
export const FETCH_CoverageArea_Failure = 'FETCH_CoverageArea_Failure';


export function fetchCoverageAreaThunk() {
  return async (dispatch, getState) => {

    let state = getState();
    if(state.official.coverageArea.isFetching){return;}

    dispatch({type: FETCH_CoverageArea_Request});
    const coverageArea = await request.get(config.api.getCommunityCoverageArea);
    if(coverageArea){
      dispatch({type: FETCH_CoverageArea_Success, data: coverageArea.map((item, index) => {item.key = index;return item;})});
    }
    else{
      dispatch({type: FETCH_CoverageArea_Failure});
    }
  }
}