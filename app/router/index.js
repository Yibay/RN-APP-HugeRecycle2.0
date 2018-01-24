import React, { Component } from 'react';

import { Router, Scene, Stack } from 'react-native-router-flux';
import { StyleSheet, Platform } from 'react-native';


// HOC 屏宽适配
import { adaptLayoutWidth } from '../HOC/adaptLayout';
// HOC 初始化 登录状态
import initIdentityToken from '../HOC/initIdentityToken';

// 页面路由
import Intro from '../pages/Intro';
import Recycle from '../pages/Home/Recycle';
import Mall from '../pages/Home/Mall';
import Mine from '../pages/Home/Mine';
import LocationPage from '../pages/Location';
import RecycleOrder from '../pages/RecycleOrder';
import Login from '../pages/Login';
import AddressSelection from '../pages/AddressSelection';
import AddressAdd from '../pages/AddressAdd';
import AddressEdit from '../pages/AddressEdit';
import EnvironmentalRecord from '../pages/EnvironmentalRecord';


const AppRouter = () => (
  <Router>
    <Stack key='root'>
      {/* 主入口页 */}
      <Scene key='home' tabs={true} tabBarPosition='bottom' labelStyle={tabsStyle.labelStyle} tabBarStyle={tabsStyle.tabBarStyle} >
        {/* 回收分页 */}
        <Scene key='recycle' tabBarLabel='我要回收' component={Recycle} hideNavBar={true} />
        {/* 商场分页 */}
        <Scene key='shoppingMall' title='虎哥便利店' tabBarLabel='虎哥商场' component={Mall} navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle} />
        {/* 我的分页 */}
        <Scene key='mine' tabBarLabel='我的' component={Mine} hideNavBar={true} />
      </Scene>
      {/* 定位地址页 */}
      <Scene key='locationPage' component={LocationPage} hideNavBar={true} />
      {/* 回收订单页 */}
      <Scene key='recycleOrderPage' title='待回收物品' component={RecycleOrder} navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle} hideNavBar={true} />
      {/* 新增地址页 */}
      <Scene key='addressAddPage' component={AddressAdd} hideNavBar={true} />
      {/* 选择地址页 */}
      <Scene key='addressSelectionPage' component={AddressSelection} hideNavBar={true} />
      {/* 编辑地址 */}
      <Scene key='addressEditPage' component={AddressEdit} hideNavBar={true} />
      {/* 环保记录 */}
      <Scene key='environmentalRecordPage' component={EnvironmentalRecord} hideNavBar={true} />
      {/* 轮播简介页 */}
      <Scene key='intro' component={Intro} hideNavBar={true} />
      {/* 登录页 */}
      <Scene key='login' component={Login} hideNavBar={true} />
    </Stack>
  </Router>
);

// 因为对屏幕做了适配，所以要对导航的默认样式做些调整
const styles = StyleSheet.create({
  navigationBarStyle: {
    paddingTop: 20.5,
    height: 108
  },
  titleStyle: {
    fontSize: 34,
    fontWeight: '600'
  },
  backButtonTextStyle: {
    fontSize: 34
  }
});

// tabs 修正样式
const tabsStyle = {
  labelStyle: {
    fontSize: 30
  },
  tabBarStyle: {
    ...Platform.select({
      ios: {
        paddingBottom: 30,
        height: 100
      },
      android: {
        paddingBottom: 70,
        height: 140
      }
    })
  }
};

// 初始化登录状态, 屏宽适配
export default initIdentityToken(adaptLayoutWidth(AppRouter));
// export default adaptLayoutWidth(AppRouter);