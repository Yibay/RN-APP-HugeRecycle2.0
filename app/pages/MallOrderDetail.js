import React,{Component} from 'react';
import {StyleSheet, View, Text, Linking, Alert} from 'react-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Actions} from "react-native-router-flux";


import {verifyLogin} from "../HOC/verifyLogin";
import {onEnter} from "../redux/actions/pagesLife/MallOrderDetailLife";
import {deleteMallOrder} from '../redux/actions/mall/mallOrder/deleteMallOrder';
import {continueMallOrder} from '../redux/actions/mall/settlement';

import Header from "../components/Header/Header";
import MallOrderItem from "../containers/MallOrderRecord/MallOrderItem";
import OrderStatusBar from "../containers/RecycleRecordDetail/OrderStatusBar";
import RecordBtn from "../components/Form/Btn/RecordBtn";


class MallOrderDetail extends Component{

  static propTypes = {
    orderCode: PropTypes.string.isRequired,
    identityToken: PropTypes.shape({
      authToken: PropTypes.string
    }),
    orderItem: PropTypes.object.isRequired,
    onEnter: PropTypes.func.isRequired,
    continueMallOrder: PropTypes.func.isRequired,
    deleteMallOrder: PropTypes.func.isRequired,
  };

  static defaultProps = {
    orderItem: {},
  };

  render(){
    let orderItem = this.props.orderItem; // 订单信息
    let orderPrice = orderItem.orderStatus === 8 ? orderItem.orderPrice : orderItem.leftOrderPrice;
    let orderScore = orderItem.orderStatus === 8 ? orderItem.orderScore : orderItem.leftOrderScore;

    let orderStatusText =''; // 订单状态 信息
    let ctrlModule;

    switch(orderItem.orderStatus){
      case 1: // 未支付
        orderStatusText = '待付款';
        ctrlModule = <View style={styles.ctrlModule}><RecordBtn style={styles.btnSpacing} text='去付款' onPress={() => {this.props.continueMallOrder(orderItem.orderId)}}/><RecordBtn style={styles.btnSpacing} text='取消订单' onPress={() => {this.deleteMallOrder(orderItem.orderId)}}/></View>;
        break;
      case 2: // 已支付
      case 3: // 已分配
        orderStatusText = '等待商家接单';
        ctrlModule = <View style={styles.ctrlModule}><RecordBtn style={styles.btnSpacing} text='联系商家' onPress={() => {this.contactSeller()}}/></View>;
        break;
      case 4: // 已配货
      case 5: // 已接单
        orderStatusText = '已接单，等待配送';
        ctrlModule = <View style={styles.ctrlModule}><RecordBtn style={styles.btnSpacing} text='联系商家' onPress={() => {this.contactSeller()}}/></View>;
        break;
      case 6: // 已签收
        orderStatusText = '已完成';
        ctrlModule = <View style={styles.ctrlModule} />;
        break;
      // case 7: // 退货中
      //   break;
      case 8: // 已退货
        orderStatusText = '已退单';
        ctrlModule = <View style={styles.ctrlModule} />;
        break;
      // case 9: // 已删除
      // case 10: // 被打回
      default:
    }

    return <View style={styles.container}>
      <Header title='我的消费订单'/>
      {
        this.props.orderItem.orderCode ?
          <View style={styles.content}>
            {/* 订单状态 */}
            <OrderStatusBar statusText={orderStatusText}/>
            <MallOrderItem {...this.props.orderItem} showFooter={false} productListFooterStyle={styles.productListFooterStyle}/>
            <View style={styles.lineSection}>
              <Text style={styles.title}>收件信息</Text>
              <Text style={styles.detail}>
                {
                  [
                    orderItem.customerName,
                    orderItem.customerLocation ? orderItem.customerLocation.customerPhone : '',
                    orderItem.customerLocation ? [orderItem.customerLocation.regionName, orderItem.customerLocation.streetName, orderItem.customerLocation.communityName, orderItem.customerLocation.address].filter(item => item).join(' ') : ''
                  ].filter(item => item).join(', ')
                }
              </Text>
            </View>
            <View style={styles.lineSection}>
              <Text style={styles.title}>支付信息</Text>
              <Text style={styles.detail}>环保金支付 ¥{orderScore.toFixed(2)} ，现金支付 ¥{orderPrice.toFixed(2)}</Text>
            </View>
            {
              ctrlModule
            }
          </View>
          :
          undefined
      }
    </View>
  }

  async componentDidMount(){
    this.props.onEnter(this.props.orderCode);
  }

  // 联系商家
  async contactSeller(){
    if(this.props.orderItem.storePhone){
      const supported = await Linking.canOpenURL(`tel:${this.props.orderItem.storePhone}`).catch(e => {console.log(e);return false});
      if(supported){
        Linking.openURL(`tel:${this.props.orderItem.storePhone}`);
      }
      else{
        Alert.alert('此设备不支持 拨打电话',`请手动拨打${this.props.orderItem.storePhone}`);
      }
    }
    else{
      Alert.alert('无商家电话');
    }
  }

  // 取消订单
  async deleteMallOrder(orderId){
    const res = await this.props.deleteMallOrder(orderId);
    if(Actions.currentScene === 'mallOrderDetailPage' && res){
      if(res && !res.status){
        Actions.pop();
      }
      else if(res.status && res.message){
        Alert.alert(res.message);
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  // 订单信息样式
  productListFooterStyle: {
    paddingBottom: 26,
  },
  // 收件信息样式
  lineSection: {
    paddingVertical: 30,
    paddingHorizontal: 36,
    marginBottom: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 10,
    fontSize: 28,
    color: '#000',
    fontWeight: '900'
  },
  detail: {
    fontSize: 28,
    color: '#000',
  },
  // 控制按钮
  ctrlModule: {
    paddingHorizontal: 36,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnSpacing: {
    marginLeft: 32,
  },
});

function mapStateToProps(state){
  return {
    orderItem: state.user.mallOrderDetail.data,
  };
}

export default verifyLogin(connect(mapStateToProps, {onEnter, deleteMallOrder, continueMallOrder})(MallOrderDetail));