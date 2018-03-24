import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

import PropTypes from 'prop-types';


class InputSection extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired, // input value （必选）
    onChangeText: PropTypes.func.isRequired, // value 改变时，更新外部数据的func
    label: PropTypes.string.isRequired, // label 文案
    placeholder: PropTypes.string.isRequired, // placeholder 文案
    editable: PropTypes.bool.isRequired, // input 是否可手动编辑
    leftButton: PropTypes.element, // 左侧按钮
    rightButton: PropTypes.element, // 右侧按钮
    keyboardType: PropTypes.oneOf(['default','numeric','email-address','phone-pad']),
    secureTextEntry: PropTypes.bool.isRequired // 隐藏输入内容(密文)
  };

  static defaultProps = {
    onChangeText: () => {console.log('do nothing.')},
    label: '',
    placeholder: '',
    editable: true,
    keyboardType: 'default',
    secureTextEntry: false
  };

  render(){
    return (<View {...this.props} style={[styles.container].concat(this.props.style)}>
      {
        this.props.leftButton ?
          <TouchableWithoutFeedback onPress={() => this.focusInput()}>
            {
              this.props.leftButton // 有定义左侧按钮，显示自定义左侧按钮
            }
          </TouchableWithoutFeedback>
          :
          <Text style={styles.label} onPress={() => this.focusInput()}>{this.props.label}</Text> // 没有自定义左侧按钮显示，label
      }
      <TextInput style={styles.textInput}
                 ref="input"
                 value={this.props.value}
                 onChangeText={val => this.props.onChangeText(val)}
                 placeholder={this.props.placeholder}
                 editable={this.props.editable}
                 secureTextEntry={this.props.secureTextEntry}
                 underlineColorAndroid="transparent"
                 keyboardType={this.props.keyboardType}
                 onSubmitEditing={() => this.blurInput()}/>
      {
        this.props.rightButton // 若有右侧按钮，则添加
      }
    </View>);
  }

  componentDidMount(){
    // 软键盘关闭时，失去焦点 (调试模式下，没有软键盘，聚焦 立即 失焦)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',() => this.blurInput());
  }

  componentWillUnmount(){
    this.keyboardDidHideListener.remove();
  }

  // 点击label 聚焦input
  focusInput(){
    this.refs.input.focus();
  }

  // 失去焦点
  blurInput(){
    this.refs.input.blur();
  }
}

const styles = StyleSheet.create({
  container: {
    height: 86,
    paddingHorizontal: 34,
    borderColor: '#e1e5e8',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    width: 192,
    fontSize: 26,
    color: '#888'
  },
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 0,
    fontSize: 30
  }
});

export default InputSection;