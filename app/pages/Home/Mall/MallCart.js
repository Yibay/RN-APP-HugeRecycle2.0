import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';


import { verifyLogin } from '../../../HOC/verifyLogin';
import { verifyStoreInfo } from '../../../HOC/verifyStoreInfo';
import {fetchShoppingCart} from '../../../redux/actions/mall/shoppingCart';

import Header from '../../../components/Header/Header';
import ProductList from '../../../containers/MallCart/ProductList';
import SettlementModule from '../../../containers/MallCart/SettlementModule';


class MallCart extends Component {

  static propTypes = {
    storeName: PropTypes.string.isRequired,
    shoppingCart: PropTypes.shape({
      data: PropTypes.shape({
        invalidProductList: PropTypes.array.isRequired,
        validProductList: PropTypes.array.isRequired,
        amount: PropTypes.number.isRequired
      }),
      isFetching: PropTypes.bool.isRequired
    }),
    fetchShoppingCart: PropTypes.func.isRequired
  };

  render(){
    return <View style={styles.container}>
      <Header title={`购物车（${this.props.storeName}）`}/>
      <ProductList validProductList={this.props.shoppingCart.data.validProductList} invalidProductList={this.props.shoppingCart.data.invalidProductList} updateCartProductList={() => this.props.fetchShoppingCart()} validProductListShowTotal={false} productDeletable={true}/>
      <SettlementModule validProductList={this.props.shoppingCart.data.validProductList} onPress={() => Actions.mallSettlement({updateCartProductList: this.props.fetchShoppingCart})} />
    </View>
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function mapStateToProps(state){
  // 计划，应该在 购物车按钮 处，点击事件，触发获取购物车数据。这样本页重跑生命周期，不会重复请求购物车数据（同时后续页面下订单成功，也发一次请求购物车数据）
  return {
    storeName: state.mall.store.data.storeInfo[state.mall.store.data.storeIndex].storeName,
    shoppingCart: state.mall.shoppingCart
  }
}

// 需验证登录
// 需验证绑定便利店
export default verifyLogin(verifyStoreInfo(connect(mapStateToProps,{fetchShoppingCart})(MallCart)));