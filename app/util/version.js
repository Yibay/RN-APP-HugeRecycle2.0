import config from './request/config';

export const checkVersionIOS = (appStoreVersion, currentVersion) => {
  if(!currentVersion && config && config.versionIOS){
    currentVersion = config.versionIOS;
  }
  let currentVersionArray = currentVersion.split('.').map(item => Number(item));
  let appStoreVersionArray = appStoreVersion.split('.').map(item => Number(item));
  // app store版本 高于 本地版本
  for(let i=0;i < Math.min(currentVersionArray.length, appStoreVersionArray.length);i++){
    if(appStoreVersionArray[i] > currentVersionArray[i]){
      // 需要更新
      return true;
    }
    else if(appStoreVersionArray[i] < currentVersionArray[i]){
      // 不需更新
      return false;
    }
    // 相等 则进行下一轮 比较
  }
  // 不需更新
  return false;
};