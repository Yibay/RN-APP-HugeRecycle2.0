import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';

import PropTypes from 'prop-types';


const CartBtn = props => <TouchableWithoutFeedback onPress={() => props.onPress()}>
  <Image style={[styles.container].concat(props.style)} source={require('./img/cart.png')} resizeMode='contain'/>
</TouchableWithoutFeedback>;

CartBtn.propTypes = {
  onPress: PropTypes.func.isRequired
};
CartBtn.defaultProps = {
  onPress: () => {console.log('未绑定回调');}
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120
  }
});

export default CartBtn;