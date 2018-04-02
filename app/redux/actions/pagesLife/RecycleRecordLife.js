import fetchRecycleRecordThunk from "../user/recycleRecord";

export function onEnter(){
  return async (dispatch, getState) => {
    dispatch(fetchRecycleRecordThunk());
  }
}