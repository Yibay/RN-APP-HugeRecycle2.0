import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';


import config from '../../util/request/config';


class ProductItem extends Component {

  static propTypes = {
    product: PropTypes.shape({
      productImgAddress: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      productOriginalPrice: PropTypes.number.isRequired,
      hugePrice: PropTypes.number.isRequired
    }),
    addToCart: PropTypes.element.isRequired,
  };

  static defaultProps = {
    addToCart: <View/>
  };

  render(){
    return (<View style={[styles.container].concat(this.props.style)}>
      <Image style={styles.productImg} resizeMode='stretch' source={{uri: `${config.static.mallBase}${this.props.product.productImgAddress}`}}/>
      <Text style={styles.productName}>{this.props.product.productName}</Text>
      <Text style={styles.hugePrice}>{`¥${this.props.product.hugePrice}`}</Text>
      <View style={styles.addToCart}>
        {
          this.props.addToCart
        }
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 340,
    height: 516,
    backgroundColor: '#fff'
  },
  productImg: {
    width: 340,
    height: 340
  },
  productName: {
    paddingHorizontal: 10,
    paddingVertical: 18,
    fontSize: 24,
    color: '#000'
  },
  hugePrice: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    fontSize: 30,
    lineHeight: 30,
    color: '#ef3300'
  },
  addToCart: {
    position: 'absolute',
    bottom: 18,
    right: 20
  }
});

export default ProductItem;