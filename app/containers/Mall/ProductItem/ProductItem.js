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
      hugePrice: PropTypes.number.isRequired,
      coupon: PropTypes.number, // 已让利
      briefPromotionView: PropTypes.shape({
        promotionStr: PropTypes.string, // 促销文案
      }),
    }),
    addToCart: PropTypes.element.isRequired,
  };

  static defaultProps = {
    addToCart: <View/>,
    briefPromotionView: {},
  };

  render(){
    return (<View style={[styles.container].concat(this.props.style)}>
      <Image style={styles.productImg} resizeMode='stretch' source={{uri: `${config.static.mallBase}${this.props.product.productImgAddress}`}}/>
      {
        this.props.product.coupon ?
          <View style={styles.costDown}>
            <Image style={styles.costDownBg} source={require('./img/costdown.png')} resizeMode='stretch'/>
            <Text style={styles.costDownText}>已让利 ¥{this.props.product.coupon}</Text>
          </View>
          :
          undefined
      }
      {
        this.props.product.briefPromotionView && this.props.product.briefPromotionView.promotionStr ?
          <View style={styles.costDown}>
            <Text style={styles.costDownText}>{this.props.product.briefPromotionView.promotionStr}</Text>
          </View>
          :
          undefined
      }
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
  costDown:{
    position: 'absolute',
    top: 5,
    left: 0,
    backgroundColor: 'transparent'
  },
  costDownBg:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  costDownText:{
    paddingLeft: 10,
    paddingVertical: 5,
    paddingRight: 30,
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
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