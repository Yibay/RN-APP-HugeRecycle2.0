import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';


class RecordBtn extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired
  };

  static defaultProps = {
    submit: () => {console.log('未绑定 回调')}
  };

  render(){
    return (<TouchableWithoutFeedback onPress={() => this.props.submit()}>
      <View style={[styles.container].concat(this.props.style)}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    </TouchableWithoutFeedback>)
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