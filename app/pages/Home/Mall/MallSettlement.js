import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


import {connect} from "react-redux";


import request from '../../../util/request/request';
import config from '../../../util/request/config';

import {verifyStoreInfo} from "../../../HOC/verifyStoreInfo";
import {verifyLogin} from "../../../HOC/verifyLogin";
import Header from "../../../components/Header/Header";
import Notice from "../../../containers/MallSettlement/Notice";
import OrderAddressSection from '../../../containers/RecycleOrder/AddressSection/OrderAddressSection';
import ProductList from "../../../containers/MallCart/ProductList";


class MallSettlement extends Component {

  constructor(props){
    super(props);

    this.state = {
      validProductList: [],
      invalidProductList: []
    };
  }

  render(){
    return <View style={styles.container} ref='componentExisted'>
      <Header title='订单结算'/>
      <Notice/>
      {/* 地址模块 */}
      <OrderAddressSection/>
      {/* 商品列表 */}
      <ProductList validProductList={this.state.validProductList} invalidProductList={this.state.invalidProductList} updateCartProductList={() => this.getSettlementProductList()} validProductEditable={false}/>
    </View>
  }

  componentDidUpdate(){
    console.log('-----update-------');
    console.log(this.props.storeId);
  }

  async componentDidMount(){
    await this.getSettlementProductList();
    console.log('----didMount---');
    console.log(this.props.storeId);
  }

  // 获取结算页 商品列表 数据
  async getSettlementProductList(){
    console.log('---storeId---', this.props.storeId);
    const res = await request.get(config.api.settlementProductList,{storeId: this.props.storeId},{'X-AUTH-TOKEN': this.props.identityToken.authToken});
    console.log(res);
    if(res && !res.status && this.refs.componentExisted){
      this.setState({
        validProductList: res.data.validProductList,
        invalidProductList: res.data.invalidProductList
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  }
});

function mapStateToProps(state){
  return {
    storeId: state.mall.store.storeInfo[state.mall.store.storeIndex].storeId,
    storeIndex: state.mall.store.storeIndex
  }
}

// 需验证登录
// 需验证绑定便利店
export default verifyLogin(verifyStoreInfo(connect(mapStateToProps)(MallSettlement)));