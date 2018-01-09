import React, { Component } from 'react';

import { Router, Scene, Stack } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';


// HOC 屏宽适配
import { adaptLayoutWidth } from '../HOC/adaptLayout';

// 页面路由
import Intro from '../pages/Intro';
import Recycle from '../pages/Recycle';
import Mine from '../pages/Mine';
import LocationPage from '../pages/Location';
import Login from '../pages/Login';
import Register from '../pages/Register';

// 导航按钮
import RecycleRightButton from '../containers/Recycle/NavBarRightButton/NavBarRightButton';

const AppRouter = () => (
  <Router>
    <Stack key='root'>
      {/* 主入口页 */}
      <Scene key='home' tabs={true} >
        {/* 回收分页 */}
        <Scene key='recycle' title='选择回收物' tabBarLabel='我要回收' component={Recycle} navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle} renderRightButton={<RecycleRightButton />} />
        {/* 商场分页 */}
        <Scene key='register' title='虎哥便利店' tabBarLabel='虎哥商场' component={Register} navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle} />
        {/* 我的分页 */}
        <Scene key='mine' title='我的' component={Mine} navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle} />
      </Scene>
      {/* 定位地址页 */}
      <Scene key='locationPage' component={LocationPage} hideNavBar={true} />
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

// 屏宽适配
export default adaptLayoutWidth(AppRouter);
// export default AppRouter;