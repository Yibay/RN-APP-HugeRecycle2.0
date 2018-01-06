import React, { Component } from 'react';

import { Router, Scene, Stack } from 'react-native-router-flux';


// 页面路由
import Intro from '../pages/Intro';
import Home from '../pages/Home';
import LocationPage from '../pages/Location';

// 导航按钮
import HomeRightButton from '../containers/Home/NavBarRightButton/NavBarRightButton';

const AppRouter = () => (
  <Router>
    <Stack key='root'>
      {/* 回收页 */}
      <Scene key='home' component={Home} title='选择回收物' renderRightButton={<HomeRightButton />} />
      {/* 定位地址页 */}
      <Scene key='locationPage' component={LocationPage} hideNavBar={true} />
      {/* 轮播简介页 */}
      <Scene key='intro' component={Intro} hideNavBar={true} />
    </Stack>
  </Router>
);

export default AppRouter;