import config from "../../../util/request/config";
import request from "../../../util/request/request";

export const FETCH_SearchGoods_Request = 'FETCH_SearchGoods_Request';
export const FETCH_SearchGoods_Success = 'FETCH_SearchGoods_Success';
export const FETCH_SearchGoods_Failure = 'FETCH_SearchGoods_Failure';

// 搜索商品
export function fetchSearchGoods(searchVal){
  return async (dispatch, getState) => {

    let state = getState();
    let storeId = state.mall.store.data.storeInfo[state.mall.store.data.storeIndex].storeId;

    dispatch({type: FETCH_SearchGoods_Request});
    const res = await request.get(config.api.searchProduct, {
      storeId,
      searchType: 'productName',
      searchVal
    });
    if(res && !res.status){
      dispatch({type: FETCH_SearchGoods_Success, data: res.data});
    }
    else {
      dispatch({type: FETCH_SearchGoods_Failure});
    }
  };
}