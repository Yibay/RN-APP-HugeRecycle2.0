import React,{Component} from 'react'
import {StyleSheet,View,Text} from 'react-native';

import PropType from 'prop-types';


import ProductItem from '../../containers/MallCart/ProductItem';
import RecordBtn from "../../components/Form/Btn/RecordBtn";


class MallOrderItem extends Component{

  static propTypes = {
    orderId: PropType.number.isRequired,
    orderStatus: PropType.number.isRequired,
    productViewList: PropType.arrayOf(
      PropType.shape({
        orderProductId: PropType.number.isRequired,
        productName: PropType.string.isRequired,
        productImgAddress: PropType.string.isRequired,
        productPrice: PropType.number.isRequired,
        coupon: PropType.number.isRequired,
        amount: PropType.number.isRequired
      })
    ),
    leftOrderScore: PropType.number.isRequired, // 部分退货后，环保金消费
    leftOrderPrice: PropType.number.isRequired, // 部分退货后，现金消费
    orderScore: PropType.number.isRequired, // 下单时，环保金消费
    orderPrice: PropType.number.isRequired // 下单时，现金消费
  };

  render(){

    let orderStatusText =''; // 订单状态 信息
    let orderStatusTextGloom = false;
    let ctrlModule;

    switch(this.props.orderStatus){
      case 1:
      case 2:
      case 3:
      case 4:
        orderStatusText = '等待商家接单';
        ctrlModule = <View style={styles.ctrlModule}><RecordBtn style={styles.btnDetail} text='查看详情' submit={() => {}}/><RecordBtn style={styles.btnSpacing} text='联系商家' submit={() => {}}/></View>;
        break;
      case 5:
        orderStatusText = '已接单，等待配送';
        ctrlModule = <View style={styles.ctrlModule}><RecordBtn style={styles.btnDetail} text='查看详情' submit={() => {}}/><RecordBtn style={styles.btnSpacing} text='联系商家' submit={() => {}}/></View>;
        break;
      case 6:
        orderStatusText = '已完成';
        ctrlModule = <View style={styles.ctrlModule}><RecordBtn style={styles.btnDetail} text='查看详情' submit={() => {}}/></View>;
        orderStatusTextGloom = true;
        break;
      case 8:
        orderStatusText = '已退单';
        orderStatusTextGloom = true;
        break;
      default:
    }

    return <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId}>{`订单号：${this.props.orderId}`}{this.props.orderStatus === 8 ? '（已退货）' : undefined}</Text>
        <Text style={styles.time}>{this.props.time}</Text>
      </View>
      {
        this.props.productViewList
          .map(item => ({
            shoppingCartId: item.orderProductId,
            productName: item.productName,
            productImgAddress: item.productImgAddress,
            hugePrice: item.productPrice,
            coupon: item.coupon, // 让利金额
            buyAmount: this.props.orderStatus !== 8 ? item.leftAmount : item.amount, // 状态8 已整单退货
            isNeedPay: 0,
          }))
          .map(item => <ProductItem key={item.shoppingCartId} style={styles.productItem} imgStyle={styles.productItemImg} productItem={item} editable={false} />)
      }
      <View style={styles.productListFooter}>
        <Text style={styles.productNum}>{`共${this.props.productViewList.length}件商品 小计：`}</Text>
        <Text style={styles.totalPrice}>{`¥${this.props.orderStatus === 8 ? (this.props.orderPrice + this.props.orderScore).toFixed(2) : (this.props.leftOrderPrice + this.props.leftOrderScore).toFixed(2)}`}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={!orderStatusTextGloom ? styles.orderStatusText : [styles.orderStatusText].concat(styles.orderStatusTextGloom)}>{orderStatusText}</Text>
        {
          ctrlModule
        }
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  header: {
    height: 90,
    paddingLeft: 36,
    borderBottomWidth: 2,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  orderId: {
    fontSize: 28,
    color: '#000',
    fontWeight: '400'
  },
  time: {},
  // 商品项
  productItem: {
    height: 214,
    marginBottom: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#e5e5e5',
  },
  productItemImg:{
    width: 198,
    height: 198,
    marginVertical: 8,
  },
  // 商品页脚
  productListFooter: {
    paddingRight: 28,
    paddingTop: 26,
    paddingBottom: 48,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  productNum: {
    fontSize: 28,
    fontWeight: '400'
  },
  totalPrice: {
    fontSize: 34,
    color: '#ef3300',
    fontWeight: '400'
  },
  // 订单页脚
  footer: {
    paddingBottom: 30,
    paddingLeft: 34,
    paddingRight: 28,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  orderStatusText: {
    fontSize: 28,
    color: '#ef3300',
  },
  orderStatusTextGloom: {
    color: '#888'
  },
  ctrlModule: {
    flexDirection: 'row'
  },
  btnSpacing: {
    marginLeft: 32
  },
  btnDetail: {
    backgroundColor: '#888'
  }
});

export default MallOrderItem;