import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';


import { verifyLogin } from '../../../HOC/verifyLogin';
import { verifyStoreInfo } from '../../../HOC/verifyStoreInfo';
import request from '../../../util/request/request';
import config from '../../../util/request/config';

import Header from '../../../components/common/Header/Header';
import ProductList from '../../../containers/MallCart/ProductList';
import SettlementModule from '../../../containers/MallCart/SettlementModule';


class MallCart extends Component {

  constructor(props){
    super(props);

    this.state = {
      validProductList: [],
      invalidProductList: []
    };
  }

  render(){
    return <View style={styles.container}>
      <Header title={`购物车（${this.props.storeName}）`}/>
      <ProductList validProductList={this.state.validProductList} invalidProductList={this.state.invalidProductList} updateCartProductList={() => this.getCartProductList()}/>
      <SettlementModule validProductList={this.state.validProductList} />
    </View>
  }

  async componentDidMount(){
    await this.getCartProductList();
  }

  // 获取购物车 商品
  async getCartProductList(){
    const res = await request.get(config.api.getShoppingCartProductList,{storeId: this.props.storeId},{'X-AUTH-TOKEN': this.props.identityToken.authToken});
    console.log(res);
    if(res && !res.status){
      this.setState({
        validProductList: res.data.validProductList,
        invalidProductList: res.data.invalidProductList
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function mapStateToProps(state){
  return {
    storeId: state.mall.storeInfo[state.mall.storeIndex].storeId,
    storeName: state.mall.storeInfo[state.mall.storeIndex].storeName
  }
}

// 需验证登录
// 需验证绑定便利店
export default verifyLogin(verifyStoreInfo(connect(mapStateToProps)(MallCart)));