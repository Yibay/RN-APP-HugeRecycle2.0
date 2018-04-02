import {fetchHugeInformationThunk} from "../official/hugeInformation";

export function onEnter(){
  return async (dispatch, getState) => {
    // 请求虎哥资讯
    dispatch(fetchHugeInformationThunk());
  }
}