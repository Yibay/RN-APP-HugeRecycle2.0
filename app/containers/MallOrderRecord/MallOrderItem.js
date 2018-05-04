import React,{PureComponent} from 'react'
import {StyleSheet,View,Text,Alert,Linking} from 'react-native';

import PropType from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';


import ProductItem from '../../containers/MallCart/ProductItem';
import RecordBtn from "../../components/Form/Btn/RecordBtn";
import {continueMallOrder} from "../../redux/actions/mall/settlement";
import {deleteMallOrder} from '../../redux/actions/mall/mallOrder/deleteMallOrder';


class MallOrderItem extends PureComponent{

  static propTypes = {
    orderId: PropType.number.isRequired,
    orderCode: PropType.string.isRequired,
    orderStatus: PropType.number.isRequired,
    storePhone: PropType.string, // 商家电话，可能为空
    distributionPrice: PropType.number,
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
    orderPrice: PropType.number.isRequired, // 下单时，现金消费
    productListFooterStyle: PropType.number, // 列表底栏 样式
    showFooter: PropType.bool, // 是否显示底栏（订单状态、控制按钮）
  };

  static defaultProps = {
    showFooter: true
  };

  render(){

    let orderStatusText =''; // 订单状态 信息
    let orderStatusTextGloom = false;
    let ctrlModule;

    switch(this.props.orderStatus){
      case 1: // 未支付
        orderStatusText = '待付款';
        ctrlModule = <View style={styles.ctrlModule}><RecordBtn style={styles.btnDetail} text='查看详情' onPress={() => {Actions.mallOrderDetailPage({orderCode: this.props.orderCode});}}/><RecordBtn style={styles.btnSpacing} text='去付款' onPress={() => {this.props.continueMallOrder(this.props.orderId)}}/><RecordBtn style={styles.btnSpacing} text='取消订单' onPress={() => {this.deleteMallOrder(this.props.orderId)}}/></View>;
        break;
      case 2: // 已支付
      case 3: // 已分配
        orderStatusText = '等待商家接单';
        ctrlModule = <View style={styles.ctrlModule}><RecordBtn style={styles.btnDetail} text='查看详情' onPress={() => {Actions.mallOrderDetailPage({orderCode: this.props.orderCode});}}/><RecordBtn style={styles.btnSpacing} text='联系商家' onPress={() => {this.contactSeller()}}/></View>;
        break;
      case 4: // 已配货
      case 5: // 已接单
        orderStatusText = '已接单，等待配送';
        ctrlModule = <View style={styles.ctrlModule}><RecordBtn style={styles.btnDetail} text='查看详情' onPress={() => {Actions.mallOrderDetailPage({orderCode: this.props.orderCode});}}/><RecordBtn style={styles.btnSpacing} text='联系商家' onPress={() => {this.contactSeller()}}/></View>;
        break;
      case 6: // 已签收
        orderStatusText = '已完成';
        ctrlModule = <View style={styles.ctrlModule}><RecordBtn style={styles.btnDetail} text='查看详情' onPress={() => {Actions.mallOrderDetailPage({orderCode: this.props.orderCode});}}/></View>;
        orderStatusTextGloom = true;
        break;
      // case 7: // 退货中
      //   break;
      case 8: // 已退货
        orderStatusText = '已退单';
        orderStatusTextGloom = true;
        break;
      // case 9: // 已删除
      // case 10: // 被打回
      default:
    }

    return <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderCode}>{`订单号：${this.props.orderCode}`}{this.props.orderStatus === 8 ? '（已退货）' : undefined}</Text>
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
      <View style={[styles.productListFooter].concat(this.props.productListFooterStyle)}>
        <Text style={styles.productNum}>{`共${this.props.productViewList.length}件商品 小计：`}</Text>
        <Text style={styles.totalPrice}>{`¥${this.props.orderStatus === 8 ? (this.props.orderPrice + this.props.orderScore).toFixed(2) : (this.props.leftOrderPrice + this.props.leftOrderScore).toFixed(2)}`}</Text>
        {
          this.props.distributionPrice ?
            <Text style={styles.productNum}> (含配送费 ¥{this.props.distributionPrice})</Text>
            :
            null
        }
      </View>
      {
        this.props.showFooter ?
          <View style={styles.footer}>
            <Text style={!orderStatusTextGloom ? styles.orderStatusText : [styles.orderStatusText].concat(styles.orderStatusTextGloom)}>{orderStatusText}</Text>
            {
              ctrlModule
            }
          </View>
          :
          undefined
      }
    </View>
  }

  // 联系商家
  async contactSeller(){
    if(this.props.storePhone){
      const supported = await Linking.canOpenURL(`tel:${this.props.storePhone}`).catch(e => {console.log(e);return false});
      if(supported){
        Linking.openURL(`tel:${this.props.storePhone}`);
      }
      else{
        Alert.alert('此设备不支持 拨打电话',`请手动拨打${this.props.storePhone}`);
      }
    }
    else{
      Alert.alert('无商家电话');
    }
  }

  // 取消订单
  async deleteMallOrder(orderId){
    const res = await this.props.deleteMallOrder(orderId);
    if(Actions.currentScene === 'mallOrderRecordPage' && res){
      if(res.message){
        Alert.alert(res.message);
      }
    }
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
  orderCode: {
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

export default connect(null,{continueMallOrder, deleteMallOrder})(MallOrderItem);