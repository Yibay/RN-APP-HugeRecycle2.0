import React,{Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';


import request from "../util/request/request";
import config from '../util/request/config';
import {verifyLogin} from "../HOC/verifyLogin";

import Header from "../components/Header/Header";
import MallOrderItem from "../containers/MallOrderRecord/MallOrderItem";


class MallOrderDetail extends Component{

  static propTypes = {
    orderCode: PropTypes.string.isRequired,
    identityToken: PropTypes.shape({
      authToken: PropTypes.string
    })
  };

  constructor(props){
    super(props);

    this.state = {
      orderItem: {}
    };
  }

  render(){
    let orderItem = this.state.orderItem; // 订单信息
    let orderPrice = orderItem.orderStatus === 8 ? orderItem.orderPrice : orderItem.leftOrderPrice;
    let orderScore = orderItem.orderStatus === 8 ? orderItem.orderScore : orderItem.leftOrderScore;
    return <View style={styles.container}>
      <Header title='我的消费订单'/>
      {
        this.state.orderItem.orderCode ?
          <View style={styles.content}>
            <MallOrderItem {...this.state.orderItem} showFooter={false} productListFooterStyle={styles.productListFooterStyle}/>
            <View style={styles.lineSection}>
              <Text style={styles.title}>收件信息</Text>
              <Text style={styles.detail}>
                {
                  [
                    orderItem.customerName,
                    orderItem.customerLocation ? orderItem.customerLocation.customerPhone : '',
                    orderItem.customerLocation ? [orderItem.customerLocation.regionName, orderItem.customerLocation.streetName, orderItem.customerLocation.communityName, orderItem.customerLocation.address].filter(item => item).join(' ') : ''
                  ].filter(item => item).join(', ')
                }
              </Text>
            </View>
            <View style={styles.lineSection}>
              <Text style={styles.title}>支付信息</Text>
              <Text style={styles.detail}>环保金支付 ¥{orderScore.toFixed(2)} ，现金支付 ¥{orderPrice.toFixed(2)}</Text>
            </View>
          </View>
          :
          undefined
      }
    </View>
  }

  async componentDidMount(){
    await this.getMallOrderDetail()
  }

  async getMallOrderDetail(){
    const res = await request.postFormData(config.api.getMallOrderDetail,{orderCode: this.props.orderCode},{'X-AUTH-TOKEN': this.props.identityToken.authToken});
    if(res && !res.status){
      this.setState({orderItem: res.data});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  // 订单信息样式
  productListFooterStyle: {
    paddingBottom: 26,
  },
  // 收件信息样式
  lineSection: {
    paddingVertical: 30,
    paddingHorizontal: 36,
    marginBottom: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 10,
    fontSize: 28,
    color: '#000',
    fontWeight: '900'
  },
  detail: {
    fontSize: 28,
    color: '#000',
  }
});

export default verifyLogin(MallOrderDetail);