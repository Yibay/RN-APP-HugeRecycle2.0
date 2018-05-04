import {fetchMallOrderDetail} from "../user/mallOrderDetail";

export function onEnter(orderCode){
  return async (dispatch, getState) => {
    dispatch(fetchMallOrderDetail(orderCode));
  };
}