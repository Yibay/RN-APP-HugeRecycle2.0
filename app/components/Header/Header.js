import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback, Platform } from 'react-native';

import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';


import TextAdaption from "../Text/TextAdaption";


class Header extends Component{

  static propTypes = {
    title: PropTypes.string.isRequired, // 标题
    back: PropTypes.func, // 返回 函数
    rightButton: PropTypes.element, // 右侧按钮
    leftButton: PropTypes.element,  // 左侧按钮
    hideBack: PropTypes.bool
  };

  static defaultProps = {
    title: '',
    back: () => Actions.pop(),
    hideBack: false
  };

  render(){

    let leftButton;

    // 是否隐藏 返回按钮
    if(!this.props.hideBack){
      leftButton = (
        <TouchableWithoutFeedback onPress={() => this.props.back()}>
          <View style={styles.back}>
            <Image source={require('./img/back2x.png')} resizeMode='contain' style={styles.backIcon}/>
          </View>
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
        {
          leftButton
        }
        <TextAdaption style={styles.headerText}>{this.props.title}</TextAdaption>
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
    ...Platform.select({
      ios: {lineHeight: 38},
      android: {lineHeight: 42},
    }),
    fontWeight: '700'
  },
  back: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    bottom: 0,
    width: 80,
    height: 77,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon: {
    width: 20,
    height: 37
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