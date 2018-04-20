import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import config from '../../util/request/config';
import request from '../../util/request/request';

import CheckBox from '../../components/Form/CheckBox/CheckBox';
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
      // firstItem: PropTypes.bool.isRequired,
      briefPromotionView: PropTypes.shape({
        promotionStr: PropTypes.string
      }),
    }),
    editable: PropTypes.bool.isRequired,
    updateCartProductList: PropTypes.func.isRequired
  };

  static defaultProps = {
    editable: true,
    updateCartProductList: () => {}
  };

  render(){
    return <View style={[styles.container].concat(this.props.style)}>
      {
        this.props.editable ? <CheckBox style={styles.isNeedPay} value={!!this.props.productItem.isNeedPay} onValueChange={this.changeNeedPay.bind(this)} /> : undefined
      }
      <Image style={[styles.img].concat(this.props.imgStyle)} resizeMdoe='contain' source={{uri: `${config.static.mallBase}${this.props.productItem.productImgAddress}`}}/>
      <View style={styles.content}>
        <Text style={styles.title}>{this.props.productItem.productName}</Text>
        <Text style={styles.promotionStr}>
          {this.props.productItem.coupon ? `已让利${this.props.productItem.coupon}` : ''}
          {this.props.productItem.briefPromotionView ? this.props.productItem.briefPromotionView.promotionStr : ''}
        </Text>
        <Text style={styles.price}>{`¥${this.props.productItem.hugePrice}`}</Text>
        {
          this.props.editable ?
            <ControllerBtn style={styles.ctrlBtn} buyAmount={this.props.productItem.buyAmount} storageAmount={this.props.productItem.storageAmount} shoppingCartId={this.props.productItem.shoppingCartId} updateCartProductList={this.props.updateCartProductList} />
            :
            <Text style={styles.buyAmount}>{`x ${this.props.productItem.buyAmount}`}</Text>
        }
      </View>
    </View>
  }

  // 修改购物车商品选中状态
  async changeNeedPay(value){
    const res = await request.get(`${config.api.changeNeedPay}${this.props.productItem.shoppingCartId}`,{isNeedPay: Number(value)}, {'X-AUTH-TOKEN': this.props.authToken});
    // 若请求成功
    if(res && !res.status){
      await this.props.updateCartProductList();
      return false;
    }
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
  // 可编辑：选中按钮
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
  promotionStr: {
    fontSize: 25,
    color: '#888'
  },
  price: {
    fontSize: 30,
    color: '#ef3300',
    fontWeight: '700'
  },
  // 可编辑：控制器
  ctrlBtn: {
    position: 'absolute',
    right: 30,
    bottom: 26
  },
  // 不可编辑：购买数量
  buyAmount: {
    position: 'absolute',
    right: 30,
    bottom: 26,
    fontSize: 30,
    fontWeight: '700'
  }
});

function mapStateToProps(state){
  return {
    authToken: state.identityToken.authToken
  }
}

export default connect(mapStateToProps)(ProductItem);