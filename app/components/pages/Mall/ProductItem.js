import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';


import config from '../../../util/request/config';


class ProductItem extends Component {

  static propTypes = {
    product: PropTypes.shape({
      productImgAddress: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      productOriginalPrice: PropTypes.number.isRequired,
      hugePrice: PropTypes.number.isRequired
    }),
    addToCart: PropTypes.element.isRequired
  };

  static defaultProps = {
    addToCart: <View/>
  };

  render(){
    return (<View style={styles.container}>
      <Image style={styles.productImg} resizeMode='stretch' source={{uri: `${config.static.mallBase}${this.props.product.productImgAddress}`}}/>
      <Text style={styles.productName}>{this.props.product.productName}</Text>
      <Text style={styles.productPrice}>{`¥${this.props.product.productOriginalPrice}`}</Text>
      <Text style={styles.hugePrice}>{`虎哥价：¥${this.props.product.hugePrice}`}</Text>
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
    width: 375,
    borderWidth: 1.5,
    borderColor: '#e1e5e8',
    paddingHorizontal:21,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  productImg: {
    width: 330,
    height: 330
  },
  productName: {
    paddingVertical: 20,
    fontSize: 26
  },
  productPrice: {
    fontSize: 26,
    color: '#ababab',
    textDecorationLine: 'line-through'
  },
  hugePrice: {
    paddingVertical: 20,
    fontSize: 26,
    color: '#ff0f00'
  },
  addToCart: {
    position: 'absolute',
    bottom: 30,
    right: 20
  }
});

export default ProductItem;