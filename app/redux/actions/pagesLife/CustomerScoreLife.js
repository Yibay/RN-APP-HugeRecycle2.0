import {fetchCustomerScoreThunk} from "../user/customerScore";
import {fetchCustomerScoreLogThunk} from "../user/customerScoreLog";

export function onEnter(){
  return async (dispatch, getState) => {

    // 获取环保金 余额
    dispatch(fetchCustomerScoreThunk());
    // 环保金交易 明细
    dispatch(fetchCustomerScoreLogThunk());
  };
}