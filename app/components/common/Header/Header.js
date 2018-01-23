import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';


class Header extends Component{

  static propTypes = {
    title: PropTypes.string.isRequired, // 标题
    back: PropTypes.func.isRequired, // 返回 函数
    rightButton: PropTypes.element.isRequired // 右侧按钮
  };

  static defaultProps = {
    title: '',
    back: () => Actions.pop(),
    rightButton: (<View />)
  };

  render(){
    return (
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => this.props.back()}>
          <Icon style={styles.back} name="ios-arrow-back" size={50} color="#000" />
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>{this.props.title}</Text>
        <View style={styles.rightButton}>
          {
            this.props.rightButton
          }
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  // 页头
  header: {
    position: 'relative',
    paddingTop: 73,
    height: 128,
    backgroundColor: '#ffd101'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 38,
    lineHeight: 38,
    fontWeight: '700'
  },
  back: {
    position: 'absolute',
    zIndex: 10,
    left: 30,
    bottom: 5
  },
  rightButton: {
    position: 'absolute',
    zIndex: 10,
    right: 30,
    bottom: 20
  }
});

export default Header;