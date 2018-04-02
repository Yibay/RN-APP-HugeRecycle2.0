import {fetchCoverageAreaThunk} from "../official/coverageArea";

export function onEnter(){
  return async (dispatch, getState) => {
    // 获取 服务覆盖范围 请求
    dispatch(fetchCoverageAreaThunk());
  }
}