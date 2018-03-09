import React,{Component} from 'react'
import {StyleSheet, View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';

import PropTypes from 'prop-types';
import SubmitBtn from '../../Btn/SubmitBtn';
import DigitItem from './DigitItem';


class SixDigitsCodePassword extends Component {

  static propTypes = {
    msg: PropTypes.string,
    btnText: PropTypes.string,
    onChangeText: PropTypes.func, // 即时获取修改后的密码（12位原始值）
    submit: PropTypes.func // 提交密码修改
  };

  static defaultProps = {
    msg: '使用6位不连续的数字来作为消费密码',
    btnText: '确认修改'
  };

  constructor(props){
    super(props);

    this.state = {
      password: ''
    }
  }

  render(){
    return <TouchableWithoutFeedback onPress={() => this.focusPassword()}>
      <View style={styles.container}>
        {/* 6位码 */}
        <View style={styles.passwordView}>
          <DigitItem encode={true} code={this.state.password.length <6 ? this.state.password.substr(0,1) : this.state.password.substr(6,1)} />
          <DigitItem encode={true} code={this.state.password.length <6 ? this.state.password.substr(1,1) : this.state.password.substr(7,1)} />
          <DigitItem encode={true} code={this.state.password.length <6 ? this.state.password.substr(2,1) : this.state.password.substr(8,1)} />
          <DigitItem encode={true} code={this.state.password.length <6 ? this.state.password.substr(3,1) : this.state.password.substr(9,1)} />
          <DigitItem encode={true} code={this.state.password.length <6 ? this.state.password.substr(4,1) : this.state.password.substr(10,1)} />
          <DigitItem encode={true} code={this.state.password.length <6 ? this.state.password.substr(5,1) : this.state.password.substr(11,1)} />
        </View>
        <TextInput ref='passwordData' style={styles.passwordData} value={this.state.password} onChangeText={val => this.setPassword(val)} keyboardType='numeric' underlineColorAndroid='transparent'/>
        {/* 消息提示 */}
        <Text style={styles.msg}>{this.props.msg}</Text>
        {
          // 确认按钮
          this.state.password.length >= 6 ? <SubmitBtn style={this.state.password.length === 12 ? styles.submitBtn : [styles.submitBtn].concat(styles.submitBtnDisable)} text={this.props.btnText} submit={() => this.submit()}/> : undefined
        }
      </View>
    </TouchableWithoutFeedback>
  }

  componentDidMount(){
    // 进入页面自动聚焦
    this.focusPassword();
  }

  // 事件1: 聚焦真实密码(点击6位码框)
  focusPassword(){
    this.refs.passwordData.focus();
  }

  // 事件2: 设置真实密码(键盘输入密码)
  setPassword(val){
    if(/^\d*$/.test(val) && val.length <=12){
      // 更新组件状态
      this.setState({password: val});
      // 向回调函数，回传数据
      this.props.onChangeText && this.props.onChangeText(val);
    }
  }

  // 事件3: 提交修改
  submit(){
    // 根据回调函数 返回结果，决定是否 要重置密码
    this.props.submit && this.props.submit(this.state.password) && this.reset();
  }

  // 重置密码
  reset(){
    this.setState({password: ''});
    // 向回调函数，回传数据
    this.props.onChangeText && this.props.onChangeText('');
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignSelf: 'center'
  },
  // 6位码视图
  passwordView: {
    flexDirection: 'row'
  },
  // 6位码数据 (隐藏)
  passwordData: {
    display: 'none'
  },
  // 消息文案
  msg: {
    marginTop: 32,
    fontSize: 24,
    color: '#888',
    textAlign: 'center'
  },
  // 确认修改 按钮
  submitBtn: {
    marginTop: 80
  },
  submitBtnDisable: {
    backgroundColor: '#888'
  }
});


export default SixDigitsCodePassword;