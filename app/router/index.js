import React, { Component } from 'react';

import { Router, Scene, Stack } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';


// HOC 屏宽适配
import { adaptLayoutWidth } from '../HOC/adaptLayout';

// 页面路由
import Intro from '../pages/Intro';
import Home from '../pages/Home';
import LocationPage from '../pages/Location';
import Login from '../pages/Login';

// 导航按钮
import HomeRightButton from '../containers/Home/NavBarRightButton/NavBarRightButton';

const AppRouter = () => (
  <Router>
    <Stack key='root'>
      {/* 回收页 */}
      <Scene key='home' component={Home} title='选择回收物' navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle} renderRightButton={<HomeRightButton />} />
      {/* 定位地址页 */}
      <Scene key='locationPage' component={LocationPage} hideNavBar={true} />
      {/* 轮播简介页 */}
      <Scene key='intro' component={Intro} hideNavBar={true} />
      {/* 登录页 */}
      <Scene key='login' component={Login} hideNavBar={true} />
    </Stack>
  </Router>
);

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

// 屏宽适配
export default adaptLayoutWidth(AppRouter);
// export default AppRouter;