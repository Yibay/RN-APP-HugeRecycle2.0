import {fetchMallOrderRecord} from "../user/mallOrderRecord";

/** 我的消费订单 onEnter */
export function onEnter(){
  return async (dispatch, getState) => {
    // 请求消费订单数据
    dispatch(fetchMallOrderRecord());
  }
}