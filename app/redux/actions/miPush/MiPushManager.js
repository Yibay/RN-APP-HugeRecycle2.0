import {Platform} from 'react-native';

import MIPush from 'react-native-xmpush';
import {Actions} from "react-native-router-flux";


import {jumpRecycleRecord} from './jumpRecycleRecord';
import * as RecycleRecordLife from "../pagesLife/RecycleRecordLife";


/** 订阅推送 */
export function miPushInit(){
  return (dispatch, getState) => {
    // MIPush.setAlias("oooooo"); // 实际 应在 用户登录时，设置别名

    /** 1、接收到通知 */
    Platform.select({
      ios: () => {
        MIPush.setBadgeNumber(0);   // 每次进入app将角标设置为0
        MIPush.addEventListener("notification", (notification) => {
          // 1、iOS 必须用线上app包名（精确包名），才能接到iOS平台发来的通知
          // 2、在应用内部时，不会出现 通知栏提示。（需要修改RCTMIPushModule.m文件）
          // 3、iOS 模拟器不能接到通知栏消息；真机线上包 才能接到通知栏消息；
          console.log("app接收到通知:", notification);
        });
      },
      android: () => {
        // 1、Android 模拟器不能接到通知栏消息；真机才能接到通知栏消息；
        MIPush.addEventListener("xmpush_notify", (notification) => {
          console.log("app接收到通知:", notification);
          MIPush.presentLocalNotification(notification);
        });
      }
    })();

    /** 2、app运行时，点击通知 */
    MIPush.addEventListener("xmpush_click", (notification) => {
      console.log("app运行过程中点击通知:", notification);
      //  点击回调
      dispatch(clickForeNoticeCB(notification));
    });

    /** 3、app关闭时，点击通知 */
    MIPush.getInitialNotification((notification) => {
      console.log("app关闭时获取点击通知消息:", notification);
      //  点击回调
      Platform.select({
        ios: () => {
          dispatch(clickIOSBackNoticeCB(notification));
        },
        android: () => {
          dispatch(clickAndroidBackNoticeCB(notification));
        }
      })();
    });
  };
}


// 点击通知栏消息 回调（iOS、Android 运行中）
function clickForeNoticeCB(notification){
  return (dispatch, getState) => {

    if(notification){

      if(notification.content){
        // content 为 Android 传输数据默认属性；iOS 要自定义一个键值对 content：...
        // content 以JSON形式传递数据，解析后，做跳转等动作。
        try{
          let content = JSON.parse(notification.content);
          dispatch(clickNoticeActions(content));
        }
        catch (e){
          console.log(e);
        }
      }
    }
  };
}

// 点击通知栏消息 回调（Android 已关闭）
function clickAndroidBackNoticeCB(notification){
  return (dispatch, getState) => {

    if(notification){

      if(notification.content){
        // content 为 Android 传输数据默认属性；iOS 要自定义一个键值对 content：...
        // content 以JSON形式传递数据，解析后，做跳转等动作。
        try{
          let content = JSON.parse(notification.content);
          dispatch(clickNoticeActions(content));
        }
        catch(e){
          console.log(e);
        }
      }
    }
  };
}

// 点击通知栏消息 回调（iOS app 已关闭）
function clickIOSBackNoticeCB(notification){
  return (dispatch, getState) => {

    if(notification){

      if(notification._data.content){
        try{
          let content = JSON.parse(notification._data.content);
          dispatch(clickNoticeActions(content));
        }
        catch(e){
          console.log(e);
        }
      }
    }
  };
}

// 根据 传来的自定义数据，做相关操作（页面跳转等）
/**
 *
 * @param content
 * @param status bool true:运行中actions，false:重启actions
 * @returns {function(*, *)}
 */
function clickNoticeActions(content){
  return (dispatch, getState) => {
    switch (content.action){
      // 回收消息，跳转到 我的环保记录页
      case 'receiptOrder': // 接单
      case 'completeOrder': // 完成
      case 'cancelOrder': // 撤单
        if(Actions.currentScene === 'environmentalRecordPage'){
          dispatch(RecycleRecordLife.onEnter());
        }
        else {
          Actions.environmentalRecordPage();
        }
        break;
      default:
    }
  };
}

/** 取消订阅推送 */
export function miPushUninstall(){

  return (dispatch, getState) => {
    // MIPush.unsetAlias("oooooo"); // 实际 应在 用户退出时，卸载别名

    Platform.select({
      ios: () => {
        MIPush.removeEventListener("notification");
      },
      android: () => {
        MIPush.removeEventListener("xmpush_notify");
      }
    })();

    MIPush.removeEventListener("xmpush_click");
  };

}