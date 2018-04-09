import {combineReducers} from 'redux';
import {SET_Location} from "../../actions/Location";
import {SET_ShowStoreSelector, SET_StoreIndex, SET_StoreInfo} from "../../actions/Mall";

/**
 * 服务站信息
 * @param state: arrayOf({
 *  storeId: number,     服务站id
 *  storeName: string,   服务站名称
 *  storeNumber: string,
 *  storePhone: string,   服务站电话
 *  onlineStatus: number
 * }),
 * @param actions
 * @returns {*}
 */
function storeInfo(state=[], actions){
  switch (actions.type){
    // 设置 便利店信息
    case SET_StoreInfo:
      return actions.storeInfo;
    default:
      return state;
  }
}

/** 小区对应多个便利店时，当前选中的便利店序号 */
function storeIndex(state=0, actions){
  switch (actions.type){
    // 设置 便利店信息
    case SET_StoreInfo:
      return 0;
    case SET_StoreIndex:
      return actions.storeIndex;
    default:
      return state;
  }
}

/** 小区对应多个便利店时，是否显示便利店选择器 */
function showStoreSelector(state=true, actions){
  switch (actions.type){
    // 切换 小区
    case SET_Location:
      return true;
    // 切换 小区便利店
    case SET_StoreIndex:
      return false;
    // 控制显示 便利店选择器 开关
    case SET_ShowStoreSelector:
      return actions.showStoreSelector;
    default:
      return state;
  }
}

let data = combineReducers({storeInfo, storeIndex, showStoreSelector});

function isFetching(state=false, actions){
  switch (actions.type){
    default:
      return state;
  }
}

let store = combineReducers({data, isFetching});

export default store;