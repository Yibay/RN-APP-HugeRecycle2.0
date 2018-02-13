import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';


import config from '../../../util/request/config';

import ControllerBtn from '../../../containers/MallCart/ControllerBtn';


class ProductItem extends Component {

  static propTypes = {
    productItem: PropTypes.shape({
      shoppingCartId: PropTypes.number.isRequired,
      productName: PropTypes.string.isRequired,
      productImgAddress: PropTypes.string.isRequired,
      productPrice: PropTypes.number.isRequired,
      buyAmount: PropTypes.number.isRequired,
      // firstItem: PropTypes.bool.isRequired
    }),
    editable: PropTypes.bool.isRequired,
    updateCartProductList: PropTypes.func.isRequired
  };

  static defaultProps = {
    editable: true
  };

  render(){
    console.log(this.props);
    return <View>
        <Text style={(this.props.productItem.firstItem && !this.props.editable) ? styles.invalidProductList : styles.none}>以下商品已失效</Text>
        <View style={styles.container}>
        <Image style={styles.img} resizeMdoe='contain' source={{uri: `${config.static.mallBase}${this.props.productItem.productImgAddress}`}}/>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.productItem.productName}</Text>
          <Text style={styles.price}>{`¥${this.props.productItem.productPrice}`}</Text>
          <ControllerBtn buyAmount={this.props.productItem.buyAmount} shoppingCartId={this.props.productItem.shoppingCartId} updateCartProductList={this.props.updateCartProductList} />
        </View>
        <View style={this.props.editable ? styles.none : styles.mask} />
        </View>
      </View>
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 226,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  invalidProductList: {
    height: 90,
    paddingLeft: 28,
    fontSize: 28,
    lineHeight: 90,
    fontWeight: '700'
  },
  img: {
    height: 226,
    width: 226,
    marginRight: 22,
  },
  content: {
    flex: 1,
    position: 'relative',
    paddingVertical: 26,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30,
    color: '#000',
    fontWeight: '700'
  },
  price: {
    fontSize: 30,
    color: '#ef3300',
    fontWeight: '700'
  },
  // 失效商品、不可编辑
  none: {
    display: 'none'
  },
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
});

export default ProductItem;