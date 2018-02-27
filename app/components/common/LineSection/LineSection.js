import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';


class LineSection extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired, // 标题
    icon: PropTypes.element.isRequired, // 左侧图标
    onPress: PropTypes.func.isRequired, // 点击回调函数
    rightModule: PropTypes.element.isRequired, // 右侧组件
    // textStyle: PropTypes.number.isRequired // title 样式
  };

  static defaultProps = {
    title: '',
    icon: <View/>,
    onPress: () => {},
    rightModule: <View/>
  };

  render(){

    return <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
      <View style={[styles.lineSection].concat(this.props.style)}>
        {
          this.props.icon
        }
        <Text style={[styles.text].concat(this.props.textStyle)}>{this.props.title}</Text>
        <View style={styles.rightModule}>
          {
            this.props.rightModule
          }
        </View>
      </View>
    </TouchableWithoutFeedback>
  }
}

const styles = StyleSheet.create({
  // 行模块
  lineSection: {
    position: 'relative',
    marginTop: 2,
    height: 90,
    paddingLeft: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    marginLeft: 9,
    fontSize: 26
  },
  rightModule: {
    position: 'absolute',
    right: 27,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  }
});

export default LineSection;