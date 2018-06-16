import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import request from "../../../util/request/request";
import config from "../../../util/request/config";
import {forgetPasswordValidator} from "../../../util/form/mineValidator";
import validator from "../../../util/form/validator";
import {verifyLogin} from "../../../HOC/verifyLogin";
import {getCode, clearData} from '../../../redux/actions/verificationCode/forgetLoginPassword';

import Header from "../../../components/Header/Header";
import InputSection from "../../../components/Form/Input/InputSection";
import SubmitBtn from "../../../components/Form/Btn/SubmitBtn";
import PasswordBtn from "../../../components/Form/Btn/PasswordBtn/PasswordBtn";
import CountDownBtn from '../../../components/Form/Btn/CountDownBtn';
import Loading from '../../../components/Alert/Loading';
import string_xml from "../../../util/request/string";


class ForgetLoginPassword extends Component {

  static propTypes = {
    verificationCode: PropTypes.shape({
      data: PropTypes.string.isRequired,
      isFetching: PropTypes.bool.isRequired,
    }),
    getCode: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props);

    this.state = {
      phone: this.props.identityToken.user.phone,
      code: '',
      newPassword: '',
      secureTextEntry: true,
      updatePasswordFetching: false,
    };
  }

  render(){
    return <View style={styles.container}>
      <Header title='修改登录密码'/>
      <InputSection style={styles.inputSection} value={this.state.phone} onChangeText={val => this.setState({phone: val})} editable={false} label='手机号码'/>
      <InputSection style={styles.inputSection} value={this.state.code} onChangeText={val => this.setState({code: val})} label='验证码' rightButton={<CountDownBtn style={styles.getCode} text='发送验证码' onPress={() => this.getCode()}/>}/>
      <InputSection style={styles.inputSection} value={this.state.newPassword} onChangeText={val => this.setState({newPassword: val.trim()})} label='新密码' secureTextEntry={this.state.secureTextEntry} rightButton={<PasswordBtn secureTextEntry={this.state.secureTextEntry} setSecure={val => this.setSecure(val)}/>}/>
      <SubmitBtn text='确认修改' style={styles.submitBtn} submit={() => this.submit()} />
      <Loading show={this.props.verificationCode.isFetching} />
      {/* 修改密码请求 */}
      <Loading show={this.state.updatePasswordFetching} />
    </View>
  }

  componentDidUpdate(){
    if(!this.props.verificationCode.isFetching && this.props.verificationCode.data){
      Alert.alert(this.props.verificationCode.data);
      this.props.clearData();
    }
  }

  // 显示／隐藏 新密码
  setSecure(val){
    this.setState({
      secureTextEntry: val
    })
  }

  // 获取验证码
  async getCode(){
    if(!validator.isPhone(this.state.phone)){
      Alert.alert('请填写正确手机号码');
      return false;
    }
    const res = await this.props.getCode(this.state.phone);
    return res;

  }

  // 修改密码
  async submit() {
    if(!forgetPasswordValidator(this.state)){
      return false;
    }
    if(this.state.updatePasswordFetching){
      return;
    }

    this.setState({updatePasswordFetching: true});
    const res = await Promise.race([
      request.post(config.api.updatePassword,{oldPassword: this.state.code, newPassword: this.state.newPassword}, {'X-AUTH-TOKEN': this.props.identityToken.authToken}),
      new Promise(resolve => {setTimeout(() => resolve({status: 1,message: string_xml.network_poor2}), 5000)})
    ]);
    this.setState({updatePasswordFetching: false});
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

function mapStateToProps(state){
  return {
    verificationCode: state.verificationCode.forgetLoginPassword
  };
}

export default verifyLogin(connect(mapStateToProps,{getCode, clearData})(ForgetLoginPassword));