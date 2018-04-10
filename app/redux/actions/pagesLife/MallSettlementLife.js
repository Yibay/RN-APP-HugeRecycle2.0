import {fetchSettlementData} from "../mall/settlement";

export function onEnter(){
  return async(dispatch, getState) => {
    dispatch(fetchSettlementData());
  }
}