import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';


class SettlementModule extends Component {

  static propTypes = {
    validProductList: PropTypes.arrayOf(
      PropTypes.shape({
        productPrice: PropTypes.number.isRequired,
        buyAmount: PropTypes.number.isRequired
      })
    )
  };

  render(){

    let total = 0;

    this.props.validProductList.forEach(item => {
      total += item.productPrice * item.buyAmount;
    });

    return <View style={styles.container}>
      <View style={styles.total}>
        <Text style={styles.totalText}>已选中 {this.props.validProductList.length}件，合计 {total}元</Text>
      </View>
      <Text style={styles.settlement}>
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