import React, { Component } from 'react';
import { NativeModules, Alert } from 'react-native';

import { ActionSheet } from 'antd-mobile-rn';
import { bd09togcj02, gcj02towgs84 } from 'coordtransform';


let UtilMapManager = NativeModules.UtilMap;

export function showMap(lon,lat,name) {
  [lon,lat] = bd09togcj02(lon,lat).map(item => String(item)); // 百度坐标转火星坐标(百度、高德、腾讯、苹果地图uri接口都用的火星坐标)
  let array = [];
  // 查找 当前手机支持的地图
  UtilMapManager.findEvents(lon, lat, name, (events) => {
    events.map((index, item) => {
      array.push(index.title);
    });
    // 若支持多个地图
    if (array.length > 2) {
      ActionSheet.showActionSheetWithOptions({
          options: array,
          cancelButtonIndex: array.length - 1,
          maskClosable: true,
        },
        (buttonIndex) => {
          //跳到原生方法对应的app地图导航内
          UtilMapManager.addEvent(events[buttonIndex].title, events[buttonIndex].url, lon, lat, name);//lon是经度，，，log是维度
        });
    }
    // 若仅支持一个地图
    else if (array.length === 2) {
      if (events.length === 2 && events[0].url === 'ios') {
        //只针对ios平台
        UtilMapManager.addEvent(events[0].title, events[0].url, lon, lat, name);
      }
      else {
        ActionSheet.showActionSheetWithOptions({
            options: array,
            cancelButtonIndex: array.length - 1,
            maskClosable: true,
          },
          (buttonIndex) => {
            //跳到原生方法对应的app地图导航内
            UtilMapManager.addEvent(events[buttonIndex].title, events[buttonIndex].url, lon, lat, name);//lon是经度，log是维度
          });
      }
    }
    // Android下，没有可用地图
    else {//只适用于android平台
      Alert.alert('没有可用的地图软件！');
    }
  })

}