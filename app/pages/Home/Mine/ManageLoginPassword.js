import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';


import { verifyLogin } from '../../../HOC/verifyLogin';
import { updatePasswordValidator } from '../../../util/form/mineValidator';
import request from '../../../util/request/request';
import config from '../../../util/request/config';

import Header from '../../../components/Header/Header';
import InputSection from '../../../components/Form/Input/InputSection';
import SubmitBtn from '../../../components/Form/Btn/SubmitBtn';
import PasswordBtn from "../../../components/Form/Btn/PasswordBtn/PasswordBtn";


class ManageLoginPassword extends Component{

  constructor(props){
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      secureTextEntry: true
    };
  }

  render(){
    return (<View style={styles.container}>
      <Header title='修改登录密码'/>
      <InputSection style={styles.inputSection} value={this.state.oldPassword} onChangeText={val => this.setState({oldPassword: val.trim()})} label='旧密码' placeholder='如未设置过登录密码请留空'/>
      <InputSection style={styles.inputSection} value={this.state.newPassword} onChangeText={val => this.setState({newPassword: val.trim()})} label='新密码' secureTextEntry={this.state.secureTextEntry} rightButton={<PasswordBtn secureTextEntry={this.state.secureTextEntry} setSecure={val => this.setSecure(val)}/>}/>
      <SubmitBtn style={styles.submitBtn} text='确认修改' submit={() => this.submit()}/>
      <Text style={styles.forgetBtn} onPress={() => Actions.forgetLoginPassword()}>忘记密码</Text>
    </View>);
  }

  // 显示／隐藏 新密码
  setSecure(val){
    this.setState({
      secureTextEntry: val
    })
  }

  async submit() {
    if(!updatePasswordValidator(this.state)){
      return;
    }
    const res = await request.post(config.api.updatePassword,{oldPassword: this.state.oldPassword, newPassword: this.state.newPassword}, {'X-AUTH-TOKEN': this.props.identityToken.authToken})
    if(res){
      if(!res.status && res.data.result){
        Alert.alert('修改成功','',[{text: '确定', onPress: () => Actions.popTo('manageCustomerAccounts')}]);
      }
      else{
        if(res.message === '验证码验证失败！'){
          Alert.alert('旧密码验证失败！');
        }
        else{
          Alert.alert(res.message);
        }
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
  submitBtn: {
    marginTop: 80
  },
  forgetBtn: {
    marginTop: 34,
    alignSelf: 'center',
    fontSize: 24,
    color: '#888'
  }
});

export default verifyLogin(ManageLoginPassword);