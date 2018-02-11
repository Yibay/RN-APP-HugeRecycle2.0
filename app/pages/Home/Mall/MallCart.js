import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';


import { verifyLogin } from '../../../HOC/verifyLogin';
import { verifyStoreInfo } from '../../../HOC/verifyStoreInfo';
import request from '../../../util/request/request';
import config from '../../../util/request/config';

import Header from '../../../components/common/Header/Header';
import OrderAddressSection from '../../../containers/RecycleOrder/AddressSection/OrderAddressSection';


class MallCart extends Component {

  render(){
    return <View style={styles.container}>
      <Header title='订单结算'/>
      {/* 地址模块 */}
      <OrderAddressSection />
    </View>
  }

  componentDidMount(){
    console.log(this.props);
    // this.getCartProductList();
  }

  // 获取购物车
  // async getCartProductList(){
  //   const res = await request.get(config.api.getShoppingCartProductList,{storeId: this.props.storeId},{'X-AUTH-TOKEN': this.props.identityToken.authToken});
  //   console.log(res);
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function mapStateToProps(state){
  return {
    storeId: state.mall.storeInfo[state.mall.storeIndex].storeId
  }
}

// 需验证登录
// 需验证绑定便利店
export default verifyLogin(verifyStoreInfo(connect(mapStateToProps)(MallCart)));