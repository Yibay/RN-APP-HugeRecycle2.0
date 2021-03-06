/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTLinkingManager.h> // <-- Alipay 需要

#import "RCTPushNotificationManager.h" // <-- MiPush 需要
#import "RCTMIPushModule.h" // <-- MiPush 需要
//#import "MiPushSDK.h"

#import "RNUMConfigure.h" // <-- 友盟基础配置 需要

#import "RCTHotUpdate.h" // <-- react-native-update 热更新 需要

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import "Orientation.h" // <--- import react-native-orientation 禁止横屏

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  
  #if DEBUG
    // 原来的jsCodeLocation保留在这里
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    // 非DEBUG情况下启用热更新
    jsCodeLocation=[RCTHotUpdate bundleURL];
  #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"HugeRecycle2_0"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [RCTMIPushModule application:application didFinishLaunchingWithOptions:launchOptions]; // <-- MiPush 注册推送
  
  // 初始化 友盟统计
  [UMConfigure setLogEnabled:YES];
  [RNUMConfigure initWithAppkey:@"5b1f760f8f4a9d3c71000115" channel:@"App Store"];
  
  return YES;
}

// MiPush 注册推送设置
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RCTMIPushModule application:application didRegisterUserNotificationSettings:notificationSettings];
}

// MiPush 注册成功后，接收deviceToken
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  // 注册APNS成功, 注册deviceToken
  [RCTMIPushModule application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// MiPush 接收服务器 推送的消息
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
{
//  [MiPushSDK handleReceiveRemoteNotification :notification]; // <-- 使用此方法后，所有消息会进行去重，然后通过miPushReceiveNotification:回调返回给App
  [RCTMIPushModule application:application didReceiveRemoteNotification:notification];
}

// MiPush 接收本地 推送的消息
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [RCTMIPushModule application:application didReceiveLocalNotification:notification];
}

// MiPush ios 10
// MiPush 应用在前台收到通知
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  [RCTMIPushModule userNotificationCenter:center willPresentNotification:notification withCompletionHandler:completionHandler];
}

// MiPush 点击通知进入应用
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  [RCTMIPushModule userNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
  completionHandler();
}

// Alipay 需要
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

@end
