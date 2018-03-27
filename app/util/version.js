import config from './request/config';

export const checkVersionIOS = (appStoreVersion, currentVersion) => {
  if(!currentVersion && config && config.versionIOS){
    currentVersion = config.versionIOS;
  }
  let currentVersionArray = currentVersion.split('.');
  let appStoreVersionArray = appStoreVersion.split('.');
  // app store版本 高于 本地版本
  for(let i=0;i < Math.min(currentVersionArray.length, appStoreVersionArray.length);i++){
    if(Number(appStoreVersionArray[i]) > Number(currentVersionArray[i])){
      // 需要更新
      return true;
    }
  }
  // 不需更新
  return false;
};