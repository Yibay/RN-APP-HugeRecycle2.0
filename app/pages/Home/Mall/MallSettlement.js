import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';


import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';


import {createMallOrderValidator} from '../../../util/form/mallOrderValidator';
import {submitMallOrder} from "../../../redux/actions/mall/settlement";

import {verifyStoreInfo} from "../../../HOC/verifyStoreInfo";
import {verifyLogin} from "../../../HOC/verifyLogin";
import Header from "../../../components/Header/Header";
import Notice from "../../../containers/MallSettlement/Notice";
import OrderAddressSection from '../../../containers/RecycleOrder/AddressSection/OrderAddressSection';
import ProductList from "../../../containers/MallCart/ProductList";
import Remark from "../../../components/Form/Input/Remark";
import SubmitBtn from "../../../components/Form/Btn/SubmitBtn";
import KeyboardAvoidingViewAdapt from '../../../components/KeyboardAvoidingViewAdapt';
import Loading from "../../../components/Alert/Loading";


class MallSettlement extends Component {

  static propTypes = {
    storeId: PropTypes.number.isRequired,
    // 身份令牌
    identityToken: PropTypes.shape({
      authToken: PropTypes.string.isRequired
    }),
    settlementData: PropTypes.shape({
      data: PropTypes.shape({
        validProductList: PropTypes.array.isRequired,
        invalidProductList: PropTypes.array.isRequired,
        payMsg: PropTypes.shape({
          needPayScore: PropTypes.number,
          needPayTotalPrice: PropTypes.number,
          canSale: PropTypes.bool,
          message: PropTypes.string
        })
      }),
      submitMallOrderFetching: PropTypes.bool.isRequired,
      isFetching: PropTypes.bool.isRequired
    })
  };

  constructor(props){
    super(props);

    this.state = {
      // form 表单
      remark: '' // 备注
    };
  }

  render(){
    return <View style={styles.container} ref='componentExisted'>
      <Header title='订单结算' back={() => this.back()}/>
      {/* 配送时间提示 */}
      {/*<Notice/>*/}
      {/* 地址模块 */}
      <OrderAddressSection/>
      <KeyboardAvoidingViewAdapt style={styles.content} behavior='padding'>
        {/* 商品列表 */}
        <ProductList
          style={styles.productList}
          validProductList={this.props.settlementData.data.validProductList}
          invalidProductList={this.props.settlementData.data.invalidProductList}
          validProductEditable={false}
          payMsg={this.props.settlementData.data.payMsg}
          ListFooterComponent={<View style={styles.listFooterComponent}>
            {/* 备注模块 */}
            <Remark value={this.state.remark} onChangeText={val => this.setState({remark: val})}/>
            {/* 支付信息 */}
            <View style={styles.payMsg}>
              <Text style={styles.payMsgText1}>环保金抵扣¥{this.props.settlementData.data.payMsg.needPayScore || 0}，还需支付¥{this.props.settlementData.data.payMsg.needPayTotalPrice || 0}</Text>
              {/*<Text style={styles.payMsgText2}>剩余金额请在收货时直接付给送货员</Text>*/}
            </View>
            {/* 下单按钮 */}
            <SubmitBtn
              style={this.props.settlementData.data.payMsg.canSale ? undefined : styles.cannotSale}
              text={this.props.settlementData.data.payMsg.canSale ? '立即下单' : this.props.settlementData.data.payMsg.message}
              submit={() => this.submit()}/>
          </View>}
        />
      </KeyboardAvoidingViewAdapt>
      <Loading show={this.props.settlementData.submitMallOrderFetching} />
    </View>
  }


  // 返回上一页
  back(){
    Actions.pop();
  }

  // 下单
  async submit(){
    if(this.props.settlementData.data.payMsg.canSale){
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
          {text:'确认', onPress: () => this.props.submitMallOrder(option)},
          {text:'取消'}])
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  content: {
    flex: 1,
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
    storeId: state.mall.store.data.storeInfo[state.mall.store.data.storeIndex].storeId,
    currentLocation: state.location.currentLocation,
    settlementData: state.mall.settlement
  }
}

// 需验证登录
// 需验证绑定便利店
export default  verifyLogin(verifyStoreInfo(connect(mapStateToProps, {submitMallOrder})(MallSettlement)));