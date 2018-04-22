import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity, Alert } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import config from '../../util/request/config';
import {deleteFormCart,changeNeedPay} from '../../redux/actions/mall/shoppingCart';

import CheckBox from '../../components/Form/CheckBox/CheckBox';
import ControllerBtn from './ControllerBtn';


let adaptionScale = config.adaptionScale;

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
    deletable: PropTypes.bool,
    deleteFormCart: PropTypes.func.isRequired, // 删除 购物车中商品 Actions
  };

  static defaultProps = {
    editable: true,
    deletable: false
  };

  constructor(props){
    super(props);

    this.state = {
      containerMarginLeft: new Animated.Value(0),
    };

    this.touchX = 0; // touch参考坐标
    this.startX = 0; // 计算容器偏移 参考起始点
  }

  render(){
    return<Animated.View style={this.props.deletable ? [styles.containerDeletable, {marginLeft: this.state.containerMarginLeft}] : null}
                onStartShouldSetResponder={e => this.props.deletable}
                onResponderGrant={e => {this.moveStart(e.nativeEvent.pageX);}}
                onResponderMove={e => {this.move(e.nativeEvent.pageX);}}
                onResponderRelease={e => {this.moveEnd(e.nativeEvent.pageX);}}
    >
      <View style={[styles.container].concat(this.props.style)}>
        {
          this.props.editable ? <CheckBox style={styles.isNeedPay} value={!!this.props.productItem.isNeedPay} onValueChange={this.changeNeedPay.bind(this)} /> : undefined
        }
        <Image style={[styles.img].concat(this.props.imgStyle)} resizeMdoe='contain' source={{uri: `${config.static.mallBase}${this.props.productItem.productImgAddress}`}}/>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.productItem.productName}</Text>
          <Text style={styles.promotionStr}>
            {this.props.productItem.coupon ? `已让利 ¥${this.props.productItem.coupon}` : ''}
            {this.props.productItem.briefPromotionView ? this.props.productItem.briefPromotionView.promotionStr : ''}
          </Text>
          <Text style={styles.price}>{`¥${this.props.productItem.hugePrice}`}</Text>
          {
            this.props.editable ?
              <ControllerBtn style={styles.ctrlBtn} buyAmount={this.props.productItem.buyAmount} storageAmount={this.props.productItem.storageAmount} shoppingCartId={this.props.productItem.shoppingCartId} />
              :
              <Text style={styles.buyAmount}>{`x ${this.props.productItem.buyAmount}`}</Text>
          }
        </View>
      </View>
      {
        this.props.deletable ? <TouchableOpacity style={styles.deleteBtn} onPress={() => this.deleteProduct(this.props.productItem.shoppingCartId)}><Text style={styles.deleteBtnText}>删除</Text></TouchableOpacity> : undefined
      }
    </Animated.View>
  }

  // 修改购物车商品选中状态
  async changeNeedPay(isNeedPay){
    const res = await this.props.changeNeedPay(this.props.productItem.shoppingCartId, isNeedPay);
    // 若请求成功
    if(res){
      return false;
    }
  }

  // 左右划动，显示/隐藏 删除按钮
  moveStart(touchX){
    this.startX = this.state.containerMarginLeft._value;
    this.touchX = touchX;
  }
  move(touchX){
    let displacement = touchX - this.touchX;
    let destination = this.startX + displacement * adaptionScale;

    if(destination < -158){
      destination = -158;
    }
    else if(destination > 0){
      destination = 0;
    }
    Animated.timing(this.state.containerMarginLeft,{toValue:(destination), duration:0}).start();
  }
  moveEnd(touchX){
    let displacement = touchX - this.touchX;
    let destination = this.startX + displacement * adaptionScale;

    if(destination < -79){
      // 弹出删除选项按钮
      Animated.timing(this.state.containerMarginLeft,{toValue: -158,duration: 100}).start();
    }
    else{
      // 收回删除选项按钮
      Animated.timing(this.state.containerMarginLeft,{toValue: 0,duration: 100}).start();
    }
  }

  // 删除 购物车中商品
  deleteProduct(shoppingCartId){
    Alert.alert('删除此商品','',[
      {text: '确定', onPress: () => {this.props.deleteFormCart(shoppingCartId);}},
      {text: '取消'}
    ]);
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 750,
    height: 226,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  containerDeletable: {
    width: 908,
    flexDirection: 'row',
  },
  // 可编辑：选中按钮
  isNeedPay: {
    alignSelf: 'center',
    width: 60,
    height: 60,
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
    fontWeight: '700',
  },
  deleteBtn: {
    width: 158,
    backgroundColor: '#ef3401',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: {
    fontSize: 30,
    color: '#fff',
  }
});

function mapStateToProps(state){
  return {
    authToken: state.identityToken.authToken
  }
}

export default connect(mapStateToProps,{deleteFormCart,changeNeedPay})(ProductItem);