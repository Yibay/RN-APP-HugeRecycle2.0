import {Platform} from 'react-native';

import MIPush from 'react-native-xmpush';
import {Actions} from 'react-native-router-flux';

let MiPushManager = {
  init(){
    // MIPush.setAlias("oooooo"); // 实际 应在 用户登录时，设置别名

    Platform.select({
      ios: () => {
        MIPush.setBadgeNumber(0);   // 每次进入app将角标设置为0
        MIPush.addEventListener("notification", (notification) => {
          // 1、iOS 必须用线上app包名（精确包名），才能接到iOS平台发来的通知
          // 2、在应用内部时，不会出现 通知栏提示。（需要修改RCTMIPushModule.m文件）
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

    MIPush.addEventListener("xmpush_click", (notification) => {
      console.log("app运行过程中点击通知:", notification);
      //  点击回调
      this._clickNoticeCB(notification);
    });

    MIPush.getInitialNotification((notification) => {
      console.log("app关闭时获取点击通知消息:", notification);
      //  点击回调
      this._clickNoticeCB(notification);
    });
  },

  // 点击通知栏消息跳转函数
  _clickNoticeCB: function(notification){
    if(notification){

      if(notification.content){
        // content 为 Android 传输数据默认属性；iOS 要自定义一个键值对 content：...
        // content 以JSON形式传递数据，解析后，做跳转等动作。
        let content = JSON.parse(notification.content);
        switch(content.action){
          // 回收消息，跳转到 我的环保记录页
          case 'receiptOrder': // 接单
          case 'completeOrder': // 完成
          case 'cancelOrder': // 撤单
            Actions.environmentalRecordPage();
            break;
          default:
            break;
        }
      }
    }
  },
  uninstall(){
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
  }
};

export default MiPushManager;