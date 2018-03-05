import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';


import {connect} from "react-redux";
import PropType from 'prop-types';
import {Actions} from 'react-native-router-flux';


import request from '../../../util/request/request';
import config from '../../../util/request/config';
import {createMallOrderValidator} from '../../../util/form/mallOrderValidator';

import {verifyStoreInfo} from "../../../HOC/verifyStoreInfo";
import {verifyLogin} from "../../../HOC/verifyLogin";
import Header from "../../../components/Header/Header";
import Notice from "../../../containers/MallSettlement/Notice";
import OrderAddressSection from '../../../containers/RecycleOrder/AddressSection/OrderAddressSection';
import ProductList from "../../../containers/MallCart/ProductList";
import Remark from "../../../components/Form/Module/Remark";
import SubmitBtn from "../../../components/Form/Btn/SubmitBtn";


class MallSettlement extends Component {

  static propTypes = {
    storeId: PropType.number.isRequired,
    storeIndex: PropType.number.isRequired,
    updateCartProductList: PropType.func.isRequired, // 更新上一页 购物车内商品列表
    // 身份令牌
    identityToken: PropType.shape({
      authToken: PropType.string.isRequired
    })
  };

  static defaultProps = {
    updateCartProductList: () => {}
  };

  constructor(props){
    super(props);

    this.state = {
      validProductList: [],
      invalidProductList: [],
      payMsg: {},
      // form 表单
      remark: '' // 备注
    };
  }

  render(){
    return <View style={styles.container} ref='componentExisted'>
      <Header title='订单结算' back={() => this.back()}/>
      <Notice/>
      {/* 地址模块 */}
      <OrderAddressSection/>
      {/* 商品列表 */}
      <ProductList
        style={styles.productList}
        validProductList={this.state.validProductList}
        invalidProductList={this.state.invalidProductList}
        updateCartProductList={() => this.getSettlementProductList()}
        validProductEditable={false}
        ListFooterComponent={<View style={styles.listFooterComponent}>
          {/* 备注模块 */}
          <Remark val={this.state.remark} onChangeText={val => this.setState({remark: val})}/>
          {/* 支付信息 */}
          <View style={styles.payMsg}>
            <Text style={styles.payMsgText1}>环保金抵扣¥{this.state.payMsg.needPayScore}，还需支付¥{this.state.payMsg.needPayTotalPrice}</Text>
            <Text style={styles.payMsgText2}>剩余金额请在收获时直接付给送货员</Text>
          </View>
          {/* 下单按钮 */}
          <SubmitBtn
            style={this.state.payMsg.canSale ? undefined : styles.cannotSale}
            text={this.state.payMsg.canSale ? '立即下单' : this.state.payMsg.message}
            submit={() => this.submit()}/>
        </View>}
      />
    </View>
  }

  async componentDidMount(){
    await Promise.all([
      this.getSettlementProductList(),
      this.getNeedPayResult()
    ]);
  }

  // 获取结算页 商品列表 数据
  async getSettlementProductList(){
    const res = await request.get(config.api.settlementProductList,{storeId: this.props.storeId},{'X-AUTH-TOKEN': this.props.identityToken.authToken});
    if(res && !res.status && this.refs.componentExisted){
      this.setState({
        validProductList: res.data.validProductList,
        invalidProductList: res.data.invalidProductList
      });
    }
  }

  // 获取结算页 支付信息
  async getNeedPayResult(){
    const res = await request.get(config.api.getNeedPayResult,{storeId: this.props.storeId},{'X-AUTH-TOKEN': this.props.identityToken.authToken});
    console.log(res);
    if(res && !res.status && this.refs.componentExisted){
      this.setState({
        payMsg: res.data
      });
    }
  }

  // 返回上一页
  back(){
    this.props.updateCartProductList && this.props.updateCartProductList(); // 更新上一页 购物车列表
    Actions.pop();
  }

  // 下单
  async submit(){
    if(this.state.payMsg.canSale){
      let option = {
        storeId: this.props.storeId,
        customerName: this.props.currentLocation.customerName,
        customerPhone: this.props.currentLocation.telNo,
        regionId: this.props.currentLocation.regionId,
        regionName: this.props.currentLocation.region,
        streetId: this.props.currentLocation.streetId,
        streetName: this.props.currentLocation.street,
        communityId: this.props.currentLocation.communityId,
        communityName: this.props.currentLocation.communityName,
        address: this.props.currentLocation.address || '',
        building: this.props.currentLocation.building || '',
        unit: this.props.currentLocation.unit || '',
        room: this.props.currentLocation.room || '',
        orderSource: 3, // 下单平台标示码（3为 app下单）
        remark: this.state.remark
      };
      if(createMallOrderValidator(option)){
        Alert.alert('立即下单','',[
          {text:'确认', onPress: () => this.submitReq(option)},
          {text:'取消'}])
      }
    }
  }

  // 下单请求
  async submitReq(option){
    // 1. 下单请求
    const res = await request.postFormData(config.api.confirmMallOrder, option, {'X-AUTH-TOKEN': this.props.identityToken.authToken});
    // 2. 支付请求
    let resReceipt;
    (res && !res.status) && (resReceipt = await request.postFormData(config.api.receiptMallOrderPay,{orderId:res.data.orderId},{'X-AUTH-TOKEN': this.props.identityToken.authToken}));

    (resReceipt && !resReceipt.status)
      ?
      (Alert.alert('下单成功')) // 跳转到下单成功页面
      :
      (Alert.alert('下单失败'));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  // 商品列表
  productList: {
    paddingTop: 20
  },
  // 列表底部组件（备注、支付信息、下单按钮等）
  listFooterComponent: {
    paddingBottom: 60
  },
  // 支付信息模块
  payMsg: {
    marginTop: 54,
    marginBottom: 64,
    paddingHorizontal: 30,
  },
  payMsgText1: {
    marginBottom: 22,
    fontSize: 30,
    color: '#000',
    fontWeight: '500'
  },
  payMsgText2: {
    fontSize: 30,
    color: '#ef3300',
    fontWeight: '500'
  },
  // 下单支付按钮
  cannotSale: {
    backgroundColor: '#898989',
  }
});

function mapStateToProps(state){
  return {
    storeId: state.mall.store.storeInfo[state.mall.store.storeIndex].storeId,
    storeIndex: state.mall.store.storeIndex,
    currentLocation: state.location.currentLocation
  }
}

// 需验证登录
// 需验证绑定便利店
export default verifyLogin(verifyStoreInfo(connect(mapStateToProps)(MallSettlement)));