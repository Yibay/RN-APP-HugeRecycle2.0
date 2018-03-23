import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';

import PropTypes from 'prop-types';


class SubmitBtn extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    submit: PropTypes.func,
    disable: PropTypes.bool,
    disableStyle: ViewPropTypes.style
  };

  static defaultProps = {
    text: '确认',
    submit: function(){console.log('未绑定 提交回调');},
    disable: false
  };

  render(){
    return <TouchableOpacity onPress={() => this.submit()} style={[styles.container].concat(this.props.style).concat(this.props.disable ? [styles.disable].concat(this.props.disableStyle) : undefined)}>
      <Text style={styles.text}>{this.props.text}</Text>
    </TouchableOpacity>;
  }

  submit(){
    if(!this.props.disable){
      this.props.submit();
    }
  }
}

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
  disable: {
    backgroundColor: '#888'
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: '#fff'
  }
});

export default SubmitBtn;