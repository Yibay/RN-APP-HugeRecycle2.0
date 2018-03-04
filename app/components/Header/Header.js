import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, StatusBar } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';


class Header extends Component{

  static propTypes = {
    title: PropTypes.string.isRequired, // 标题
    back: PropTypes.func.isRequired, // 返回 函数
    rightButton: PropTypes.element.isRequired, // 右侧按钮
    // leftButton: PropTypes.element.isRequired  // 左侧按钮
    hideBack: PropTypes.bool.isRequired
  };

  static defaultProps = {
    title: '',
    back: () => Actions.pop(),
    rightButton: (<View />),
    hideBack: false
  };

  render(){

    let leftButton;

    // 是否隐藏 返回按钮
    if(!this.props.hideBack){
      leftButton = (
        <TouchableWithoutFeedback onPress={() => this.props.back()}>
          <Icon style={styles.back} name="ios-arrow-back" size={50} color="#000" />
        </TouchableWithoutFeedback>
      );
    }
    // 是否有 leftButton 属性
    if(this.props.leftButton){
      leftButton = (<View style={styles.leftButton}>
        {
          this.props.leftButton
        }
      </View>);
    }

    return (
      <View style={styles.header}>
        <StatusBar
          backgroundColor='transparent' // android 状态栏 颜色
          translucent={true} // android 状态栏 设为 沉浸式
        />
        {
          leftButton
        }
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
    paddingTop: 70,
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
  leftButton: {
    position: 'absolute',
    zIndex: 10,
    left: 30,
    bottom: 20
  },
  rightButton: {
    position: 'absolute',
    zIndex: 10,
    right: 30,
    bottom: 20
  }
});

export default Header;