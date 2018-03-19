import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';


const SubmitBtn = props => (<TouchableOpacity onPress={props.submit}>
  <View style={[styles.container].concat(props.style)}>
    <Text style={styles.text}>{props.text}</Text>
  </View>
</TouchableOpacity>);

SubmitBtn.propTypes = {
  text: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired
};

SubmitBtn.defaultProps = {
  text: '确认',
  submit: function(){console.log('未绑定 提交回调');}
};

const styles = StyleSheet.create({
  container: {
    width: 523,
    height: 98,
    padding: 0,
    borderRadius: 48,
    overflow: 'hidden',
    backgroundColor: '#fed309',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: '#fff'
  }
});

export default SubmitBtn;