import {fetchSettlementData} from "../mall/settlement";
import {fetchStoreInfo} from "../mall/store";

export function onEnter(){
  return async(dispatch, getState) => {
    // 便利店信息
    await dispatch(fetchStoreInfo());
    dispatch(fetchSettlementData());
  }
}