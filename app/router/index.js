import React, {Component} from 'react';

import { Router, Scene, Stack } from 'react-native-router-flux';
import { StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';


// HOC 锁定视图方向
import {lockOrientation} from '../HOC/lockOrientation';
// HOC 屏宽适配
import { adaptLayoutWidth } from '../HOC/adaptLayout';
// HOC 中间件 初始化（登录状态，等）
import initApp from '../HOC/initApp';
// HOC 启动页、引导页轮播图
import {guidePage} from '../HOC/guidePage';

// Actions
import * as ManageCustomerAccountsLife from '../redux/actions/pagesLife/ManageCustomerAccountsLife';
import * as MallLife from '../redux/actions/pagesLife/MallLife';
import * as MallCartLife from '../redux/actions/pagesLife/MallCartLife';
import * as MallSettlementLife from '../redux/actions/pagesLife/MallSettlementLife';
import {unJumpRecycleRecord} from '../redux/actions/miPush/jumpRecycleRecord';

// 页面路由 TabIcon
import { RecycleIcon, MallIcon, MineIcon } from '../HOC/configTabIcon';
// 页面路由
import AboutUs from '../pages/Home/Mine/AboutUs';
import Intro from '../pages/Guide/Guide';
import Recycle from '../pages/Home/Recycle/Recycle';
import Mall from '../pages/Home/Mall/Mall';
import Mine from '../pages/Home/Mine/Mine';
import LocationPage from '../pages/Location';
import LocationManuallyPage from '../pages/LocationManually';
import RecycleOrder from '../pages/Home/Recycle/RecycleOrder';
import Login from '../pages/Login';
import AddressSelection from '../pages/AddressSelection';
import AddressAdd from '../pages/AddressAdd';
import AddressEdit from '../pages/AddressEdit';
import RecycleRecord from '../pages/RecycleRecord';
import CallSuccess from '../pages/Home/Recycle/CallSuccess';
import RecycleEvaluation from '../pages/RecycleEvaluation';
import ManageCustomerAccounts from '../pages/Home/Mine/ManageCustomerAccounts';
import ManageLoginPassword from '../pages/Home/Mine/ManageLoginPassword';
import ForgetLoginPassword from "../pages/Home/Mine/ForgetLoginPassword";
import CustomerScore from '../pages/Home/Mine/CustomerScore';
import MallCategory from '../pages/Home/Mall/MallCategory';
import MallCart from '../pages/Home/Mall/MallCart';
import MallSearch from '../pages/Home/Mall/MallSearch';
import MallNotOpen from '../pages/Home/Mall/MallNotOpen';
import MallSettlement from "../pages/Home/Mall/MallSettlement";
import MallOrderRecord from "../pages/MallOrderRecord";
import MallOrderSuccess from "../pages/Home/Mall/MallOrderSuccess";
import AddressManagement from "../pages/AddressManagement";
import HugeInformation from "../pages/Home/Mine/HugeInformation";
import HugeInformationDetail from "../pages/Home/Mine/HugeInformationDetail";
import ManageConsumePassword from "../pages/Home/Mine/ManageConsumePassword";
import CoverageArea from "../pages/Home/Mine/CoverageArea";
import MallOrderDetail from "../pages/MallOrderDetail";
import RecycleRecordDetail from "../pages/RecycleRecordDetail";
import {Actions} from "react-native-router-flux";


class AppRouter extends Component{

  render(){
    return <Router>
      <Stack key='root'>
        {/* 主入口页 */}
        <Scene key='home' tabs={true} tabBarPosition='bottom' labelStyle={tabsStyle.labelStyle} activeTintColor='#000' inactiveTintColor='#000' tabBarStyle={tabsStyle.tabBarStyle} showLabel={false} >
          {/* 回收分页: 回收首页 */}
          <Scene key='recycle' icon={RecycleIcon} component={Recycle} hideNavBar={true} />
          {/* 商城分页: 商城首页 key='mall' 不可用 */}
          <Scene key='shoppingMall' icon={MallIcon} component={Mall} hideNavBar={true} onEnter={() => {this.props.dispatch(MallLife.onEnter())}} />
          {/*<Scene key='shoppingMall' icon={MallIcon} component={MallNotOpen} hideNavBar={true} />*/}
          {/* 我的分页 */}
          <Scene key='mine' icon={MineIcon} component={Mine} hideNavBar={true} />
        </Scene>

        {/* 1、回收分页 */}
        {/* 回收订单页 */}
        <Scene key='recycleOrderPage' component={RecycleOrder} hideNavBar={true} />
        {/* 呼叫成功 */}
        <Scene key='callSuccessPage' component={CallSuccess} hideNavBar={true} />

        {/* 2、商城分页 */}
        {/* 商城 商品分类页 */}
        <Scene key='mallCategoryPage' component={MallCategory} hideNavBar={true} />
        {/* 商城 商品购物车页 */}
        <Scene key='mallCart' component={MallCart} hideNavBar={true} onEnter={() => {this.props.dispatch(MallCartLife.onEnter())}} />
        {/* 商城 商品搜索页 */}
        <Scene key='mallSearch' component={MallSearch} hideNavBar={true} />
        {/* 商城 便利店暂未开通页  */}
        <Scene key='mallNotOpen' component={MallNotOpen} hideNavBar={true} />
        {/* 商城 订单结算页 */}
        <Scene key='mallSettlement' component={MallSettlement} hideNavBar={true} onEnter={() => {this.props.dispatch(MallSettlementLife.onEnter())}} />
        {/* 商城 下单成功页 */}
        <Scene key='mallOrderSuccess' component={MallOrderSuccess} hideNavBar={true} />

        {/* 3、我的分页 */}
        {/* 环保金余额 */}
        <Scene key='customerScorePage' component={CustomerScore} hideNavBar={true} />
        {/* 地址管理页 */}
        <Scene key='addressManagementPage' component={AddressManagement} hideNavBar={true} />
        {/* 环保记录 */}
        <Scene key='environmentalRecordPage' component={RecycleRecord} hideNavBar={true} />
        {/* 回收单详情 */}
        <Scene key='recycleRecordDetailPage' component={RecycleRecordDetail} hideNavBar={true} />
        {/* 评价虎哥 */}
        <Scene key='recycleEvaluationPage' component={RecycleEvaluation} hideNavBar={true} />
        {/* 消费记录 */}
        <Scene key='mallOrderRecordPage' component={MallOrderRecord} hideNavBar={true} />
        {/* 消费订单（详情） */}
        <Scene key='mallOrderDetailPage' component={MallOrderDetail} hideNavBar={true} />
        {/* 虎哥资讯 */}
        <Scene key='hugeInformationPage' component={HugeInformation} hideNavBar={true} />
        {/* 虎哥资讯（详情） */}
        <Scene key='hugeInformationDetail' component={HugeInformationDetail} hideNavBar={true} />
        {/* 关于我们 */}
        <Scene key='aboutUsPage' component={AboutUs} hideNavBar={true} />
        {/* 服务范围 */}
        <Scene key='coverageAreaPage' component={CoverageArea} hideNavBar={true} />

        {/* 3.2 安全中心 */}
        <Scene key='manageCustomerAccounts' component={ManageCustomerAccounts} hideNavBar={true} onEnter={() => {this.props.dispatch(ManageCustomerAccountsLife.onEnter())}} />
        {/* 修改登录密码 */}
        <Scene key='manageLoginPassword' component={ManageLoginPassword} hideNavBar={true} />
        {/* 修改登录密码（忘记密码） */}
        <Scene key='forgetLoginPassword' component={ForgetLoginPassword} hideNavBar={true}/>
        {/* 设置消费密码 */}
        <Scene key='manageConsumePassword' component={ManageConsumePassword} hideNavBar={true}/>

        {/* 4、其他 */}
        {/* 定位地址页 */}
        <Scene key='locationPage' component={LocationPage} hideNavBar={true} />
        {/* 手动输入小区 */}
        <Scene key='locationManuallyPage' component={LocationManuallyPage} hideNavBar={true} />
        {/* 新增地址页 */}
        <Scene key='addressAddPage' component={AddressAdd} hideNavBar={true} />
        {/* 选择地址页 */}
        <Scene key='addressSelectionPage' component={AddressSelection} hideNavBar={true} />
        {/* 编辑地址 */}
        <Scene key='addressEditPage' component={AddressEdit} hideNavBar={true} />

        {/* 5、HOC */}
        {/* 登录页 */}
        <Scene key='login' component={Login} hideNavBar={true} />
        {/* 轮播简介页 */}
        <Scene key='intro' component={Intro} hideNavBar={true} />
      </Stack>
    </Router>
  }

  componentWillMount(){
    console.log('路由器 componentWillMount');
  }

  componentDidMount(){
    console.log('路由器 componentDidMount');
    // 若点击通知栏 进入 app
    // 1、跳转到回收记录页
    // Alert.alert('componentDidMount',this.props.jumpRecycleRecord);
    if(this.props.jumpRecycleRecord){
      Actions._mine();
      Actions.environmentalRecordPage();
      this.props.dispatch(unJumpRecycleRecord());
    }
  }

  componentWillUpdate(){
    console.log('路由器 componentWillUpdate');
  }

  componentDidUpdate(){
    console.log('路由器 componentDidUpdate');
    // 若点击通知栏 进入 app
    // 1、跳转到回收记录页
    // Alert.alert('componentDidUpdate',this.props.jumpRecycleRecord);
    if(this.props.jumpRecycleRecord){
      Actions._mine();
      Actions.environmentalRecordPage();
      this.props.dispatch(unJumpRecycleRecord());
    }
  }

}

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

function mapStateToProps(state){
  return {
    jumpRecycleRecord: state.miPush.jumpRecycleRecord
  }
}

// 视图锁定纵向,屏宽适配, 检验版本 ,登录状态管理相关数据, 地址管理相关数据
export default lockOrientation(adaptLayoutWidth(initApp(guidePage(connect(mapStateToProps)(AppRouter)))));
// export default lockOrientation(adaptLayoutWidth(initApp(connect(null)(AppRouter))));