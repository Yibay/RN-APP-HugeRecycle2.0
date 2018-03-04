import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';


class SettlementModule extends Component {

  static propTypes = {
    validProductList: PropTypes.arrayOf(
      PropTypes.shape({
        hugePrice: PropTypes.number.isRequired,
        buyAmount: PropTypes.number.isRequired,
        isNeedPay: PropTypes.number.isRequired
      })
    ),
    onPress: PropTypes.func.isRequired
  };

  render(){

    let amount = 0;
    let total = 0;
    console.log(this.props.validProductList);

    this.props.validProductList.forEach(item => {
      if(item.isNeedPay){
        amount += 1;
        total += item.hugePrice * item.buyAmount;
      }
    });

    return <View style={styles.container}>
      <View style={styles.total}>
        <Text style={styles.totalText}>已选中 {amount}件，合计 {total.toFixed(2)}元</Text>
      </View>
      <Text style={styles.settlement} onPress={this.props.onPress}>
        结算
      </Text>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    height: 88,
    flexDirection: 'row'
  },
  total: {
    flex: 1,
    paddingLeft: 24,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  totalText: {
    fontSize: 24,
    color: '#828282',
    fontWeight: '700'
  },
  settlement: {
    width: 243,
    backgroundColor: '#ffd101',
    lineHeight: 88,
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
    fontWeight: '700'
  }
});

export default SettlementModule;