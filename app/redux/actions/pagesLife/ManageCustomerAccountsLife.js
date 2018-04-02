import {fetchPayPasswordFlagThunk} from "../user/payPasswordFlag";

export function onEnter(){
  return async (dispatch, getState) => {
    dispatch(fetchPayPasswordFlagThunk());
  };
}