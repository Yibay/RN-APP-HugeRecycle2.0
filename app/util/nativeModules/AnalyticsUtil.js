/**
 * Created by wangfei on 17/8/30.
 */
let { NativeModules } = require('react-native');
console.log('NativeModules',NativeModules);
console.log('NativeModules',NativeModules.HotUpdate);
module.exports = NativeModules.UMAnalyticsModule;