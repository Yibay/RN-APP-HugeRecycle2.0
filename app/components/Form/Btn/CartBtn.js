import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';


const CartBtn = props => <TouchableWithoutFeedback onPress={() => props.onPress()}>
  <View style={[styles.container].concat(props.style)}>
    <Icon name='shopping-cart' size={50} color='#fff' />
  </View>
</TouchableWithoutFeedback>;

CartBtn.propTypes = {
  onPress: PropTypes.func.isRequired
};
CartBtn.defaultProps = {
  onPress: () => {console.log('未绑定回调');}
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd101'
  }
});

export default CartBtn;