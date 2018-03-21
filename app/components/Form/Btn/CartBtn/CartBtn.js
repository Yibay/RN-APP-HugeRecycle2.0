import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Image, View, Text } from 'react-native';

import PropTypes from 'prop-types';


const CartBtn = props => <TouchableWithoutFeedback onPress={() => props.onPress()}>
  <View style={[styles.container].concat(props.style)}>
    <Image style={[styles.containerBtn]} source={require('./img/cart.png')} resizeMode='contain'/>
    {
      props.num ?
        <View style={styles.badge}>
          <Text style={styles.num}>{props.num <= props.maxNum ? props.num : `${props.maxNum}+`}</Text>
        </View>
        :
        undefined
    }
  </View>
</TouchableWithoutFeedback>;

CartBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  num: PropTypes.number,
  maxNum: PropTypes.number
};
CartBtn.defaultProps = {
  onPress: () => {console.log('未绑定回调');},
  maxNum: 100
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120
  },
  containerBtn: {
    flex: 1
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 36,
    height: 36,
    paddingHorizontal: 5,
    borderRadius: 18,
    backgroundColor: '#dd2c10',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  num: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700'
  }
});

export default CartBtn;