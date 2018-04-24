import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewPropTypes } from 'react-native';

import PropTypes from 'prop-types';


class RecordBtn extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
  };

  static defaultProps = {
    onPress: () => {console.log('未绑定 回调')}
  };

  render(){
    return (<TouchableOpacity onPress={() => this.props.onPress()}>
      <View style={[styles.container].concat(this.props.style)}>
        <Text style={[styles.text].concat(this.props.textStyle)}>{this.props.text}</Text>
      </View>
    </TouchableOpacity>)
  }

}

const styles = StyleSheet.create({
  container: {
    minWidth: 139,
    height: 57,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#ffd101'
  },
  text: {
    fontSize: 28,
    color: '#fff'
  }
});

export default RecordBtn;