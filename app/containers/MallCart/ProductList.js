import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import PropTypes from 'prop-types';


import ProductItem from './ProductItem';


class ProductList extends Component{

  static propTypes = {
    validProductList: PropTypes.arrayOf(
      PropTypes.shape({
        shoppingCartId: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        productImgAddress: PropTypes.string.isRequired,
        buyAmount: PropTypes.number.isRequired,
        productPrice: PropTypes.number.isRequired
      })
    ),
    invalidProductList: PropTypes.arrayOf(
      PropTypes.shape({
        shoppingCartId: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        productImgAddress: PropTypes.string.isRequired,
        buyAmount: PropTypes.number.isRequired,
        productPrice: PropTypes.number.isRequired
      })
    ),
    updateCartProductList: PropTypes.func.isRequired
  };

  static defaultProps = {
    validProductList: [],
    invalidProductList: []
  };

  render(){
    // 有效商品
    let validProductList = this.props.validProductList;
    for(let item of validProductList){
      item.valid = true;
      item.key = item.shoppingCartId;
    }

    // 无效商品
    let invalidProductList = this.props.invalidProductList;
    for(let i=0;i<invalidProductList.length;i++){
      i===0 && (invalidProductList[i].firstItem = true);
      invalidProductList[i].valid = false;
      invalidProductList[i].key = invalidProductList[i].shoppingCartId;
    }

    let productList = validProductList.concat(invalidProductList);
    console.log(productList);

    return <View style={[styles.container].concat(this.props.style)}>
      <FlatList data={productList} renderItem={({item}) => <ProductItem productItem={item} editable={item.valid} updateCartProductList={this.props.updateCartProductList} />} />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


export default ProductList;