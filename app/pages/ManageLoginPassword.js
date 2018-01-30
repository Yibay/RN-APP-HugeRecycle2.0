import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';


import { verifyLogin } from '../HOC/verifyLogin';
import { updatePasswordValidator } from '../util/form/mineValidator';
import request from '../util/request/request';
import config from '../util/request/config';

import Header from '../components/common/Header/Header';
import InputSection from '../components/common/Form/Input/InputSection';
import SubmitBtn from '../components/common/Form/Btn/SubmitBtn';


class ManageLoginPassword extends Component{

  constructor(props){
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  render(){
    return (<View style={styles.container}>
      <Header title='修改登录密码'/>
      <InputSection style={styles.inputSection} value={this.state.oldPassword} onChangeText={val => this.setState({oldPassword: val.trim()})} label='旧密码' placeholder='如未设置过登录密码请留空'/>
      <InputSection style={styles.inputSection} value={this.state.newPassword} onChangeText={val => this.setState({newPassword: val.trim()})} label='新密码'/>
      <InputSection style={styles.inputSection} value={this.state.confirmPassword} onChangeText={val => this.setState({confirmPassword: val.trim()})} label='重复密码'/>
      <SubmitBtn style={styles.submitBtn} text='修改登录密码' submit={() => this.submit()}/>
    </View>);
  }

  async submit() {
    if(!updatePasswordValidator(this.state)){
      return;
    }
    const res = await request.postFormData(config.api.updatePassword,{oldPassword: this.state.oldPassword, newPassword: this.state.newPassword}, {'X-AUTH-TOKEN': this.props.identityToken.authToken})
    console.log(res);
    if(res){
      if(!res.status && res.data.result){
        Alert.alert('修改成功');
      }
      else{
        Alert.alert(res.message);
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputSection: {
    backgroundColor: '#fff'
  },
  submitBtn: {
    marginTop: 80
  }
});

export default verifyLogin(ManageLoginPassword);