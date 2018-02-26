import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import config from '../../util/request/config';
import request from '../../util/request/request';

import CheckBox from '../../components/common/Form/CheckBox/CheckBox';
import ControllerBtn from './ControllerBtn';


class ProductItem extends Component {

  static propTypes = {
    productItem: PropTypes.shape({
      shoppingCartId: PropTypes.number.isRequired,
      productName: PropTypes.string.isRequired,
      productImgAddress: PropTypes.string.isRequired,
      hugePrice: PropTypes.number.isRequired,
      coupon: PropTypes.number.isRequired, // 让利金额
      buyAmount: PropTypes.number.isRequired,
      isNeedPay: PropTypes.number.isRequired,
      // firstItem: PropTypes.bool.isRequired
    }),
    editable: PropTypes.bool.isRequired,
    updateCartProductList: PropTypes.func.isRequired
  };

  static defaultProps = {
    editable: true
  };

  render(){
    return <View>
        <Text style={(this.props.productItem.firstItem && !this.props.editable) ? styles.invalidProductList : styles.none}>以下商品已失效</Text>
        <View style={this.props.editable ? styles.container : [styles.container].concat(styles.nonEditableContainer)}>
          {
            this.props.editable ? <CheckBox style={styles.isNeedPay} value={!!this.props.productItem.isNeedPay} onValueChange={this.changeNeedPay.bind(this)} /> : undefined
          }
          <Image style={styles.img} resizeMdoe='contain' source={{uri: `${config.static.mallBase}${this.props.productItem.productImgAddress}`}}/>
          <View style={styles.content}>
            <Text style={styles.title}>{this.props.productItem.productName}</Text>
            <Text style={styles.price}>{`¥${this.props.productItem.hugePrice}`}</Text>
            <ControllerBtn buyAmount={this.props.productItem.buyAmount} storageAmount={this.props.productItem.storageAmount} shoppingCartId={this.props.productItem.shoppingCartId} updateCartProductList={this.props.updateCartProductList} />
          </View>
          <View style={this.props.editable ? styles.none : styles.mask} />
        </View>
      </View>
  }

  // 修改购物车商品选中状态
  async changeNeedPay(value){
    const res = await request.get(`${config.api.changeNeedPay}${this.props.productItem.shoppingCartId}`,{isNeedPay: Number(value)}, {'X-AUTH-TOKEN': this.props.authToken});
    // 若请求成功
    if(res && !res.status){ return true; }
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
  nonEditableContainer: {
    marginBottom: 0,
  },
  // 失效商品title
  invalidProductList: {
    height: 90,
    paddingLeft: 28,
    fontSize: 28,
    lineHeight: 90,
    fontWeight: '700'
  },
  isNeedPay: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    padding: 0,
    marginLeft: 20,
    marginRight: 40,
    borderColor: '#000'
  },
  // 单种商品
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.6)',
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
});

function mapStateToProps(state){
  return {
    authToken: state.identityToken.authToken
  }
}

export default connect(mapStateToProps)(ProductItem);