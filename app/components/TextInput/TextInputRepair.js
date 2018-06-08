/**
 * 修正 ios下，TextInput不能输入中文Bug
 */
import React,{Component} from 'react';
import {TextInput, Platform, Keyboard} from 'react-native';

import PropTypes from 'prop-types';


class TextInputRepair extends Component {

  static propTypes = {
    focusInput: PropTypes.bool, // 聚焦、失焦控制
    setValue: PropTypes.bool, // 是否为设置val，要立即更新
  };

  static defaultProps = {
    setValue: false,
  };

  shouldComponentUpdate(nextProps){

    // 聚焦、失焦 控制
    if(typeof nextProps.focusInput === 'boolean' && nextProps.focusInput !== this.props.focusInput && this.refs && this.refs.input){
      if(nextProps.focusInput){
        this.focusInput();
      }
      else{
        this.blurInput();
      }
    }

    // iOS下，为程序设置值时，也立即更新
    return nextProps.setValue
    // Android下立即更新
      || Platform.OS !== 'ios'
      || (this.props.value === nextProps.value && (nextProps.defaultValue === undefined || nextProps.defaultValue === '' ))
      || (this.props.defaultValue === nextProps.defaultValue &&  (nextProps.value === undefined || nextProps.value === '' ));

  }

  render() {
    return <TextInput {...this.props} ref="input" />;
  }

  componentDidMount(){
    // 软键盘关闭时，失去焦点 (调试模式下，没有软键盘，聚焦 立即 失焦)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',() => this.blurInput());
  }

  componentWillUnmount(){
    this.keyboardDidHideListener.remove();
  }

  // 聚焦input
  focusInput(){
    this.refs.input.focus();
  }

  // 失去焦点
  blurInput(){
    this.refs.input.blur();
  }
}

export default TextInputRepair;