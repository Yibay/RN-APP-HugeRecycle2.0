import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';


import ProductItem from '../../components/pages/Mall/ProductItem';
import AddBtn from '../../components/common/Form/Btn/AddBtn';


class ProductList extends Component {

  static propTypes = {
    productList: PropTypes.arrayOf(
      PropTypes.shape({
        smallMallProductImgPath: PropTypes.string.isRequired,
        mallProductName: PropTypes.string.isRequired,
        mallProductPrice: PropTypes.number.isRequired,
        hugePrice: PropTypes.number.isRequired
      })
    )
  };

  static defaultProps = {
    productList: []
  };

  render(){
    return <View style={styles.productList}>
      {
        this.props.productList.map((item, index) => <ProductItem key={index} product={item} addToCart={<AddBtn/>} />)
      }
    </View>
  }
}

const styles = StyleSheet.create({
  // 详细商品列表
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default ProductList;