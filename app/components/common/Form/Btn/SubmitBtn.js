import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

import PropTypes from 'prop-types';


const SubmitBtn = props => (<Text style={[styles.container].concat(props.style)} onPress={props.submit}>{props.text}</Text>);

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
    width: 524,
    paddingVertical: 33,
    borderRadius: 48,
    alignSelf: 'center',
    backgroundColor: '#fed309',
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: '#fff'
  }
});

export default SubmitBtn;