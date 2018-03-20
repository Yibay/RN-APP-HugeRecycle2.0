import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

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
      <TouchableWithoutFeedback onPress={() => this.settlement(amount)}>
        <View style={amount ? styles.settlement : [styles.settlement, styles.disable]}>
          <Text style={styles.settlementText}>结算</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  }

  settlement(amount){
    if(!amount){return;}
    this.props.onPress();
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  disable: {
    backgroundColor: '#888'
  },
  settlementText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
    fontWeight: '700'
  }
});

export default SettlementModule;