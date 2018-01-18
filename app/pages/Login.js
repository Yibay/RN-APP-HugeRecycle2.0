import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TextInput, Alert } from 'react-native';

import { connect } from 'react-redux';


import { validator } from '../util/form/validator';
import request from '../util/request/request';
import config from '../util/request/config';
import { setIdentityToken } from '../redux/actions/IdentityToken';

import Header from '../components/common/Header/Header';
import SubmitBtn from '../components/common/Form/Btn/SubmitBtn';


class Login extends Component{

  constructor(props){
    super(props);

    this.state = {
      useCodeLogin: true, // 是否使用验证码 登录
      phone: '',
      code: ''
    };
  }

  render(){
    return (<View style={styles.container}>
      <Header title='登录'/>
      <View style={styles.content}>
        {/* 导航条 */}
        <View style={styles.navigation}>
          <TouchableWithoutFeedback onPress={() => this.chooseCodeLogin()}>
            <View style={styles.navigationItem}>
              <Text style={this.state.useCodeLogin ? styles.navigationItemTextActive : styles.navigationItemText}>手机验证码登录</Text>
              <View style={this.state.useCodeLogin ? styles.activeLine : styles.unActiveLine} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.splitLine} />
          <TouchableWithoutFeedback onPress={() => this.choosePasswordLogin()}>
            <View style={styles.navigationItem}>
              <Text style={!this.state.useCodeLogin ? styles.navigationItemTextActive : styles.navigationItemText}>密码登录</Text>
              <View style={!this.state.useCodeLogin ? styles.activeLine : styles.unActiveLine} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* 输入框 */}
        <View style={this.state.useCodeLogin ? styles.form : styles.hide}>
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>手机号码</Text>
            <TextInput style={styles.formInput} value={this.state.phone} onChangeText={text => this.changePhone(text)} underlineColorAndroid="transparent" />
            <Text style={styles.getCode} onPress={() => this.getCode()}>发送验证码</Text>
          </View>
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>短信验证码</Text>
            <TextInput style={styles.formInput} value={this.state.code} onChangeText={text => this.changeCode(text)} underlineColorAndroid="transparent" />
          </View>
        </View>
        {/* 登录按钮 */}
        <View style={styles.btnSection}>
          <SubmitBtn text='登录' submit={() => this.login()} />
        </View>
      </View>
    </View>)
  }

  // 使用验证码 登录
  chooseCodeLogin(){
    this.setState({
      useCodeLogin: true
    })
  }

  // 使用密码 登录
  choosePasswordLogin(){
    this.setState({
      useCodeLogin: false
    })
  }

  // 修改手机号
  changePhone(phone){
    this.setState({ phone });
  }

  // 修改短信验证码
  changeCode(code){
    this.setState({ code })
  }

  // 获取短信验证码
  getCode(){
    if(!validator.isPhone(this.state.phone)){
      Alert.alert('手机号码错误');
      return;
    }
    request
      .post(config.api.getCode, {phone: this.state.phone})
      .then(res => {
        // 发送成功 status 为 0，弹出 返回的data信息
        res.status || Alert.alert(res.data);
      });
  }

  // 登录
  login(){
    if(!validator.isPhone(this.state.phone)){
      Alert.alert('手机号码错误');
      return;
    }
    if(validator.isEmpty(this.state.code)){
      Alert.alert('请填写短信验证码');
      return;
    }
    console.log(this.state.phone, this.state.code);
    request
      .post(config.api.getToken, {phone: this.state.phone, code: this.state.code})
      .then(res => {
        console.log(res);
        // 登录成功 status 为 0，失败为 1
        if(res.status){
          Alert.alert(res.message); // 展示 提示信息
          return;
        }
        // 登录成功，本地储存
        storage.save({
          key: 'identityToken',
          data: {
            'X-AUTH-TOKEN': res.data['X-AUTH-TOKEN'],
            h5Code: res.data.h5Code,
            user: res.data.user
          },
          // 未指定过期时间，会使用defaultExpires参数
          // 指定 null，则永不过期
          expires: null
        });
        // 登录成功更新全局数据
        this.props.setIdentityToken(res.data);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // 内容区
  content: {
    flex:1,
    backgroundColor: '#f7f7f7'
  },
  // 内容区内 导航条（验证码登录、密码登录）
  navigation: {
    flexDirection: 'row',
    paddingTop: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e6e9'
  },
  navigationItem: {
    flex: 1,
    alignItems: 'center'
  },
  splitLine: {
    height: 60,
    borderWidth: 1,
    borderColor: '#e7e8ea'
  },
  navigationItemText: {
    height: 65,
    fontSize: 24,
    lineHeight: 45,
    color: '#898989'
  },
  navigationItemTextActive: {
    height: 65,
    fontSize: 27,
    lineHeight: 45,
    fontWeight: '700'
  },
  activeLine: {
    width: 260,
    borderWidth: 3,
    borderColor: '#fed309'
  },
  unActiveLine: {
    width: 260,
    borderWidth: 3,
    borderColor: '#f7f7f7'
  },
  // 输入框区
  form: {},
  formSection: {
    height: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#e1e5e8',
    flexDirection: 'row',
    alignItems: 'center'
  },
  formLabel: {
    paddingLeft: 33,
    width: 200,
    fontSize: 22,
    color: '#878787'
  },
  formInput: {
    flex: 1,
    padding: 0,
    height: 60,
    fontSize: 24,
    fontWeight: '700'
  },
  getCode: {
    marginRight: 30,
    paddingHorizontal: 16,
    paddingVertical: 22,
    borderRadius: 10,
    backgroundColor: '#fed309',
    overflow: 'hidden',
    fontSize: 22,
    color: '#fff'
  },
  // 提交按钮区
  btnSection: {
    marginTop: 130
  },
  hide: {
    display: 'none'
  }
});

const actionsCreator = {
  setIdentityToken
};

export default connect(null, actionsCreator)(Login)