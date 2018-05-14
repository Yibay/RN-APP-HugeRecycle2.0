import {Platform} from 'react-native';

import MIPush from 'react-native-xmpush';

let MiPushManager = {
  init(){
    // MIPush.setAlias("oooooo"); // 实际 应在 用户登录时，设置别名

    Platform.select({
      ios: () => {
        MIPush.setBadgeNumber(0);   // 每次进入app将角标设置为0
        MIPush.addEventListener("notification", (notification) => {
          // 1、iOS 必须用线上app包名（精确包名），才能接到iOS平台发来的通知
          // 2、在应用内部时，不会出现 通知栏提示。（但程序可以走到这里）
          console.log("app接收到通知:", notification);
        });
      },
      android: () => {
        // 1、Android 模拟器不能接到通知栏消息；真机才能接到通知栏消息；
        MIPush.addEventListener("xmpush_click", (notification) => {
          console.log("app运行过程中点击通知:", notification);
        });
        MIPush.addEventListener("xmpush_notify", (notification) => {
          console.log("app接收到通知:", notification);
          MIPush.presentLocalNotification(notification);
        });
      }
    })();

    MIPush.getInitialNotification((notification) => {
      console.log("app关闭时获取点击通知消息:", notification);
    });
  },
  uninstall(){
    // MIPush.unsetAlias("oooooo"); // 实际 应在 用户退出时，卸载别名

    Platform.select({
      ios: () => {
        MIPush.removeEventListener("notification");
      },
      android: () => {
        MIPush.removeEventListener("xmpush_click");
        MIPush.removeEventListener("xmpush_notify");
      }
    })();
  }
};

export default MiPushManager;