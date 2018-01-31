import React, { Component } from 'react';

import { Router, Scene, Stack } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';


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
import LocationManuallyPage from '../pages/LocationManually';
import RecycleOrder from '../pages/RecycleOrder';
import Login from '../pages/Login';
import AddressSelection from '../pages/AddressSelection';
import AddressAdd from '../pages/AddressAdd';
import AddressEdit from '../pages/AddressEdit';
import RecycleRecord from '../pages/RecycleRecord';
import CallSuccess from '../pages/CallSuccess';
import RecycleEvaluation from '../pages/RecycleEvaluation';
import ManageCustomerAccounts from '../pages/ManageCustomerAccounts';
import ManageLoginPassword from '../pages/ManageLoginPassword';
import CustomerScore from '../pages/CustomerScore';
// TabIcon
import { RecycleIcon, MallIcon, MineIcon } from '../HOC/configTabIcon';


const AppRouter = () => (
  <Router>
    <Stack key='root'>
      {/* 主入口页 */}
      <Scene key='home' tabs={true} tabBarPosition='bottom' labelStyle={tabsStyle.labelStyle} activeTintColor='#000' inactiveTintColor='#000' tabBarStyle={tabsStyle.tabBarStyle} showLabel={false} >
        {/* 回收分页 */}
        <Scene key='recycle' icon={RecycleIcon} component={Recycle} hideNavBar={true} />
        {/* 商场分页 */}
        <Scene key='shoppingMall' icon={MallIcon} component={Mall} hideNavBar={true} />
        {/* 我的分页 */}
        <Scene key='mine' icon={MineIcon} component={Mine} hideNavBar={true} />
      </Scene>
      {/* 定位地址页 */}
      <Scene key='locationPage' component={LocationPage} hideNavBar={true} />
      {/* 手动输入小区 */}
      <Scene key='locationManuallyPage' component={LocationManuallyPage} hideNavBar={true} />
      {/* 回收订单页 */}
      <Scene key='recycleOrderPage' title='待回收物品' component={RecycleOrder} navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle} hideNavBar={true} />
      {/* 新增地址页 */}
      <Scene key='addressAddPage' component={AddressAdd} hideNavBar={true} />
      {/* 选择地址页 */}
      <Scene key='addressSelectionPage' component={AddressSelection} hideNavBar={true} />
      {/* 编辑地址 */}
      <Scene key='addressEditPage' component={AddressEdit} hideNavBar={true} />
      {/* 呼叫成功 */}
      <Scene key='callSuccessPage' component={CallSuccess} hideNavBar={true} />
      {/* 环保记录 */}
      <Scene key='environmentalRecordPage' component={RecycleRecord} hideNavBar={true} />
      {/* 评价虎哥 */}
      <Scene key='recycleEvaluationPage' component={RecycleEvaluation} hideNavBar={true} />
      {/* 安全中心 */}
      <Scene key='manageCustomerAccounts' component={ManageCustomerAccounts} hideNavBar={true} />
      {/* 修改登录密码 */}
      <Scene key='manageLoginPassword' component={ManageLoginPassword} hideNavBar={true} />
      {/* 环保金余额 */}
      <Scene key='customerScorePage' component={CustomerScore} hideNavBar={true} />
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
    paddingTop: 40,
    fontSize: 20
  },
  tabBarStyle: {
    position: 'relative',
    alignItems: 'center',
    // paddingVertical: 14,
    height: 100,
    borderTopWidth: 1,
    backgroundColor: '#fff'
  },
  tabStyle: {
    flexDirection: 'column'
  }
};

// 初始化登录状态, 屏宽适配
export default initIdentityToken(adaptLayoutWidth(AppRouter));
// export default adaptLayoutWidth(AppRouter);