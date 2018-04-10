import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Text } from 'react-native';

import PropTypes from 'prop-types';


import ProductItem from './ProductItem';


class ProductList extends Component{

  static propTypes = {
    // 有效商品 列表
    validProductList: PropTypes.arrayOf(
      PropTypes.shape({
        shoppingCartId: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        productImgAddress: PropTypes.string.isRequired,
        buyAmount: PropTypes.number.isRequired,
        hugePrice: PropTypes.number.isRequired
      })
    ),
    validProductEditable: PropTypes.bool.isRequired, // 有效商品 是否可编辑
    validProductListShowTotal: PropTypes.bool.isRequired, // 有效商品 是否显示总计
    // 无效商品 列表
    invalidProductList: PropTypes.arrayOf(
      PropTypes.shape({
        shoppingCartId: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        productImgAddress: PropTypes.string.isRequired,
        buyAmount: PropTypes.number.isRequired,
        hugePrice: PropTypes.number.isRequired
      })
    ),
    invalidProductListTitle: PropTypes.string.isRequired, //无效列表 title
    updateCartProductList: PropTypes.func, // 更新列表 回调函数
    ListFooterComponent: PropTypes.element.isRequired // 列表底部组件
  };

  static defaultProps = {
    validProductList: [],
    validProductEditable: true,
    validProductListShowTotal: true,
    invalidProductList: [],
    invalidProductListTitle: '以下商品已失效',
    ListFooterComponent: <View/>,
    updateCartProductList: () => {}
  };

  render(){
    // 有效商品
    let validProductList = this.props.validProductList;
    let totalPrice = 0;
    for(let item of validProductList){
      item.valid = this.props.validProductEditable;
      item.key = item.shoppingCartId;
      totalPrice += item.buyAmount * item.hugePrice;
    }

    // 无效商品
    let invalidProductList = this.props.invalidProductList;
    for(let item of invalidProductList){
      item.valid = false;
      item.key = item.shoppingCartId;
    }

    // 商品列表
    return <ScrollView style={[styles.container].concat(this.props.style)}>
      {
        validProductList.map(item => <ProductItem key={item.key} productItem={item} editable={item.valid} updateCartProductList={this.props.updateCartProductList} />)
      }
      <View style={validProductList.length && this.props.validProductListShowTotal ? styles.validProductListTotal : styles.none}>
        <Text style={styles.totalMsg}>{`共${validProductList.length}件商品 小计：`}</Text>
        <Text style={styles.totalPrice}>{`¥${totalPrice.toFixed(2)}`}</Text>
      </View>
      <Text style={(invalidProductList.length) ? styles.invalidProductList : styles.none}>{this.props.invalidProductListTitle}</Text>
      {
        invalidProductList.map(item => <ProductItem key={item.key} productItem={item} editable={item.valid} updateCartProductList={this.props.updateCartProductList} />)
      }
      {
        this.props.ListFooterComponent
      }
    </ScrollView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  // 有效商品 总计
  validProductListTotal: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  totalMsg: {
    fontSize: 28,
    color: '#000'
  },
  totalPrice: {
    fontSize: 34,
    color: '#ef3300'
  },
  // 失效商品title
  invalidProductList: {
    height: 90,
    paddingLeft: 28,
    fontSize: 28,
    lineHeight: 90,
    fontWeight: '700'
  },
  // 隐藏 失效商品title
  none: {
    display: 'none'
  },
});


export default ProductList;