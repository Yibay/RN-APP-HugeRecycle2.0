import request from "../request/request";
import config from "../request/config";
import { setLocation } from "../../redux/actions/Location";
import { setStoreInfo, setProductList } from '../../redux/actions/Mall';
import { changeStore } from './StoreManage';


export const changeLocation = async (location) => {
  // 更新 当前地址
  global.store && global.store.dispatch(setLocation(location));
  // 更新 地址相关数据
  await updateLocationAssociatedData(location, 0);
};

/**
 *
 * @param currentLocation
 * @param storeIndex
 * @returns {Promise<void>}
 */
export const updateLocationAssociatedData = async (currentLocation) => {
  /** 1、根据小区id, 获取便利店信息 */
  let storeInfo = await loadInitStoreInfoByCommunityId(currentLocation.communityId);
  // 若数据异常、立即结束（包含该小区无对应服务站）
  if(!storeInfo || storeInfo.status || !storeInfo.data || !storeInfo.data.length){  // {data: null, status: 0}
    if(global.store){
      global.store.dispatch(setStoreInfo([]));
      global.store.dispatch(setProductList({mallCategoryInfo: {}, productList:[]}));
    }
    return;
  }
  // 若成功
  global.store && global.store.dispatch(setStoreInfo(storeInfo.data));

  // 更新 属下的便利店信息
  await changeStore(storeInfo.data, 0);
};

/** 1、根据小区名字, 获取便利店信息 */
async function loadInitStoreInfoByCommunityId(communityId){
  const storeInfo = await request.get(config.api.loadInitStoreInfoByCommunityId, {communityId});
  return storeInfo;
}

