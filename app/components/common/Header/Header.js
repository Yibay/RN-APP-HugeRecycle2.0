import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';


class Header extends Component{

  static propTypes = {
    title: PropTypes.string.isRequired, // 标题
    back: PropTypes.func.isRequired // 返回 函数
  };

  static defaultProps = {
    title: '',
    back: () => Actions.pop()
  };

  render(){
    return (
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => this.props.back()}>
          <Icon style={styles.back} name="ios-arrow-back" size={50} color="#000" />
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  // 页头
  header: {
    position: 'relative',
    paddingTop: 65,
    height: 125,
    marginBottom: 12,
    backgroundColor: '#f7f7f7'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '700'
  },
  back: {
    position: 'absolute',
    zIndex: 10,
    left: 30,
    top: 60
  }
});

export default Header;