import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';


class OrderItem extends Component {

  static propTypes = {
    createdTs: PropTypes.number.isRequired,
    createOrderTime: PropTypes.string.isRequired,
    recycledItems: PropTypes.string.isRequired,
    statusDesc: PropTypes.element.isRequired,
    rightButton: PropTypes.element.isRequired
  };

  static defaultProps = {
    firstSectionStyle: undefined
  };

  render(){

    return (<View style={[styles.container].concat(this.props.style)}>
      <View style={[styles.firstSection].concat(this.props.firstSectionStyle)}>
        <View style={styles.orderAndTime}>
          <View style={styles.orderIdSection}>
            <Text style={styles.orderId}>订单号: </Text>
            <Text style={styles.orderId}>{this.props.createdTs}</Text>
          </View>
          <Text style={styles.orderTime}>{this.props.createOrderTime}</Text>
        </View>
        <Text style={styles.recycledItems}>{this.props.recycledItems}</Text>
      </View>
      <View style={styles.secondSection}>
        { this.props.statusDesc }
        <View style={styles.rightButton}>{this.props.rightButton}</View>
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  // 第1内容区
  firstSection: {
    height: 126,
    paddingHorizontal: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#e1e5e8',
    justifyContent: 'center'
  },
  orderAndTime: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderIdSection: {
    flexDirection: 'row'
  },
  orderId: {
    fontSize: 28,
    fontWeight: '700'
  },
  orderTime: {
    fontSize: 26,
    color: '#888'
  },
  recycledItems: {
    fontSize: 28,
    color: '#888'
  },
  // 第2内容区
  secondSection: {
    minHeight: 82,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});


export default OrderItem;