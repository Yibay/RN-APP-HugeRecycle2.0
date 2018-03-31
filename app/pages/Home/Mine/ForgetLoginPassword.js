import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import {Actions} from 'react-native-router-flux';


import request from "../../../util/request/request";
import config from "../../../util/request/config";
import {forgetPasswordValidator} from "../../../util/form/mineValidator";
import validator from "../../../util/form/validator";

import Header from "../../../components/Header/Header";
import InputSection from "../../../components/Form/Input/InputSection";
import SubmitBtn from "../../../components/Form/Btn/SubmitBtn";
import PasswordBtn from "../../../components/Form/Btn/PasswordBtn/PasswordBtn";
import RecordBtn from "../../../components/Form/Btn/RecordBtn";
import {verifyLogin} from "../../../HOC/verifyLogin";


class ForgetLoginPassword extends Component {

  constructor(props){
    super(props);

    this.state = {
      phone: this.props.identityToken.user.phone,
      code: '',
      newPassword: '',
      secureTextEntry: true
    };
  }

  render(){
    console.log(this.props);
    return <View style={styles.container}>
      <Header title='修改登录密码'/>
      <InputSection style={styles.inputSection} value={this.state.phone} onChangeText={val => this.setState({phone: val})} editable={false} label='手机号码'/>
      <InputSection style={styles.inputSection} value={this.state.code} onChangeText={val => this.setState({code: val})} label='验证码' rightButton={<RecordBtn style={styles.getCode} text='发送验证码' submit={() => this.getCode()}/>}/>
      <InputSection style={styles.inputSection} value={this.state.newPassword} onChangeText={val => this.setState({newPassword: val.trim()})} label='新密码' secureTextEntry={this.state.secureTextEntry} rightButton={<PasswordBtn secureTextEntry={this.state.secureTextEntry} setSecure={val => this.setSecure(val)}/>}/>
      <SubmitBtn text='确认修改' style={styles.submitBtn} submit={() => this.submit()} />
    </View>
  }

  // 显示／隐藏 新密码
  setSecure(val){
    this.setState({
      secureTextEntry: val
    })
  }

  // 获取验证码
  getCode(){
    if(!validator.isPhone(this.state.phone)){
      Alert.alert('请填写正确手机号码');
      return;
    }
    request
      .post(config.api.getCode, {phone: this.state.phone})
      .then(res => {
        // 发送成功 status 为 0，弹出 返回的data信息
        res.status || Alert.alert(res.data);
      });
  }

  // 修改密码
  async submit() {
    console.log(this.props);
    if(!forgetPasswordValidator(this.state)){
      return;
    }
    const res = await request.post(config.api.updatePassword,{oldPassword: this.state.code, newPassword: this.state.newPassword}, {'X-AUTH-TOKEN': this.props.identityToken.authToken})
    if(res){
      if(!res.status){
        Alert.alert('修改成功','',[{text: '确定', onPress: () => Actions.popTo('manageCustomerAccounts')}]);
      }
      else{
        Alert.alert(res.message);
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  inputSection: {
    height: 98
  },
  getCode: {
    height: 64
  },
  submitBtn: {
    marginTop: 80
  },
});

export default verifyLogin(ForgetLoginPassword);