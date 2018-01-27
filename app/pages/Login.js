import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

import { connect } from 'react-redux';


import validator from '../util/form/validator';
import request from '../util/request/request';
import config from '../util/request/config';
import { setIdentityToken } from '../redux/actions/IdentityToken';

import Header from '../components/common/Header/Header';
import Navigator from '../components/common/Navigator/Navigator';
import SubmitBtn from '../components/common/Form/Btn/SubmitBtn';
import InputSection from '../components/common/Form/Input/InputSection';


class Login extends Component{

  constructor(props){
    super(props);

    this.state = {
      navigationItems: [
        {itemName: '手机验证码登录'},
        {itemName: '密码登录'}
      ],
      navigationItemsIndex: 0,
      phone: '',
      code: ''
    };
  }

  render(){
    return (<View style={styles.container}>
      <Header title='登录'/>
      <View style={styles.content}>
        {/* 导航条 */}
        <Navigator style={styles.navigator} navigationItems={this.state.navigationItems} pageFlex={false} getItemIndex={index => {this.setState({navigationItemsIndex: index})}} selectPageIndex={this.state.navigationItemsIndex}>
          {
            [
              /* 输入框: 手机验证码登录 */
              <View key={0} style={ styles.form }>
                <InputSection label='手机号码' value={this.state.phone} onChangeText={text => this.changePhone(text)} rightButton={<Text style={styles.getCode} onPress={() => this.getCode()}>发送验证码</Text>}/>
                <InputSection label='短信验证码' value={this.state.code} onChangeText={text => this.changeCode(text)}/>
              </View>,
              /* 输入框: 手机密码登录 */
              <View key={1} style={ styles.form }>
                <InputSection label='手机号码' value={this.state.phone} onChangeText={text => this.changePhone(text)}/>
                <InputSection label='密码' value={this.state.code} onChangeText={text => this.changeCode(text)}/>
              </View>
            ]
          }
        </Navigator>
        {/* 登录按钮 */}
        <SubmitBtn text='登录' submit={() => this.login()} style={styles.btnSection} />
      </View>
    </View>)
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
  async login(){
    // 检验数据
    if(!validator.isPhone(this.state.phone)){
      Alert.alert('手机号码错误');
      return;
    }
    if(validator.isEmpty(this.state.code)){
      this.state.navigationItemsIndex ? Alert.alert('请填写密码') : Alert.alert('请填写短信验证码');
      return;
    }

    // 发送登录请求
    const res = await request
      .post(config.api.getToken, {phone: this.state.phone, code: this.state.code})
      .catch(err => {console.log(err); return null;})

    if(res){

      // 若登录失败 (登录成功 status 为 0，失败为 1)
      if(res.status){
        Alert.alert(res.message); // 展示 提示信息
        return;
      }

      // 1. 登录成功，本地储存
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
      // 2. 登录成功更新全局数据
      this.props.setIdentityToken(res.data);

    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigator: {
    height: 86
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
    fontSize: 26,
    lineHeight: 45,
    color: '#888'
  },
  navigationItemTextActive: {
    height: 65,
    fontSize: 30,
    lineHeight: 45,
    fontWeight: '700'
  },
  activeLine: {
    width: 261,
    borderBottomWidth: 7,
    borderColor: '#ffd100'
  },
  unActiveLine: {
    width: 261,
    borderBottomWidth: 7,
    borderColor: '#f7f7f7'
  },
  // 输入框区
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

const actionsCreator = { setIdentityToken };

export default connect(null, actionsCreator)(Login)