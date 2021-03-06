import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Toast } from 'antd-mobile-rn';


import validator from '../util/form/validator';
import request from '../util/request/request';
import config from '../util/request/config';
import string_xml from '../util/request/string';
import { setIdentityTokenThunk } from '../redux/actions/IdentityToken';
import {getCode, clearData} from '../redux/actions/verificationCode/login';

import Header from '../components/Header/Header';
import Navigator from '../components/Navigator/Navigator';
import PasswordBtn from '../components/Form/Btn/PasswordBtn/PasswordBtn';
import SubmitBtn from '../components/Form/Btn/SubmitBtn';
import InputSection from '../components/Form/Input/InputSection';
import CountDownBtn from '../components/Form/Btn/CountDownBtn';
import Loading from "../components/Alert/Loading";


class Login extends Component{

  static propTypes = {
    needPop: PropTypes.bool,
    setIdentityTokenThunk: PropTypes.func.isRequired,
    verificationCode: PropTypes.shape({ // 短信验证码
      data: PropTypes.string.isRequired,
      isFetching: PropTypes.bool.isRequired,
    }),
    getCode: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props);

    this.state = {
      navigationItems: [
        {itemName: '手机验证码登录'},
        {itemName: '密码登录'}
      ],
      navigationItemsIndex: 0,
      phone: '',
      password: '',
      code: '',
      secureTextEntry: true,
      loginIsFetching: false, // 登录 请求中
    };
  }

  render(){
    return (<View style={styles.container}>
      <Header title='登录'/>
      <View style={styles.content}>
        {/* 导航条 */}
        <Navigator style={styles.navigator} navigationItems={this.state.navigationItems} contentLayoutStyle='highlyAdaptive' getItemIndex={index => {this.changeTabCallBack(index)}} selectPageIndex={this.state.navigationItemsIndex}>
          {
            [
              /* 输入框: 手机验证码登录 */
              <View key={0} style={ styles.form }>
                <InputSection label='手机号码' value={this.state.phone} onChangeText={text => this.changePhone(text)} rightButton={<CountDownBtn style={styles.getCode} text='发送验证码' onPress={() => this.getCode()} textStyle={styles.getCodeTextStyle} />} keyboardType='numeric' />
                <InputSection label='短信验证码' value={this.state.code} onChangeText={text => this.changeCode(text)} keyboardType='numeric'/>
              </View>,
              /* 输入框: 手机密码登录 */
              <View key={1} style={ styles.form }>
                <InputSection label='手机号码' value={this.state.phone} onChangeText={text => this.changePhone(text)} keyboardType='numeric'/>
                <InputSection label='密码' value={this.state.password} onChangeText={text => this.changePassword(text)} secureTextEntry={this.state.secureTextEntry} rightButton={<PasswordBtn secureTextEntry={this.state.secureTextEntry} setSecure={val => this.setSecure(val)}/>}/>
              </View>
            ]
          }
        </Navigator>
        {/* 登录按钮 */}
        <SubmitBtn text='登录' submit={() => this.login()} style={styles.btnSection} />
      </View>
      {/* 请求验证码loading */}
      <Loading show={this.props.verificationCode.isFetching} />
      {/* 登录请求loading */}
      <Loading show={this.state.loginIsFetching} />
    </View>)
  }

  componentDidUpdate(){
    // 获取验证码 成功后，弹出对应消息
    if(!this.props.verificationCode.isFetching && this.props.verificationCode.data){
      Alert.alert(this.props.verificationCode.data,'',[{text:'确认'}]);
      this.props.clearData();
    }
  }

  // 切换Tab 回调
  changeTabCallBack(index){
    if(index){
      this.setState({navigationItemsIndex: index, code: ''});
    }
    else{
      this.setState({navigationItemsIndex: index, password: ''});
    }
  }

  // 显示／隐藏 新密码
  setSecure(val){
    this.setState({
      secureTextEntry: val
    })
  }

  // 修改手机号
  changePhone(phone){
    this.setState({ phone });
  }

  // 修改密码
  changePassword(password){
    this.setState({ password });
  }

  // 修改短信验证码
  changeCode(code){
    this.setState({ code });
  }

  // 获取短信验证码
  async getCode(){
    if(!validator.isPhone(this.state.phone)){
      Alert.alert('手机号码错误','',[{text:'确认'}]);
      return false;
    }
    const res = await this.props.getCode(this.state.phone);
    return res;
  }

  // 登录
  async login(){
    // 检验数据
    if(!validator.isPhone(this.state.phone)){
      Alert.alert('手机号码错误','',[{text:'确认'}]);
      return;
    }
    if(this.state.navigationItemsIndex){
      if(validator.isEmpty(this.state.password)){
        Alert.alert('请填写密码','',[{text:'确认'}]);
        return;
      }
    }
    else {
      if(validator.isEmpty(this.state.code)){
        Alert.alert('请填写短信验证码','',[{text:'确认'}]);
        return;
      }
    }

    // 发送登录请求
    let code = this.state.navigationItemsIndex ? this.state.password : this.state.code;
    let navigationItemsIndex = this.state.navigationItemsIndex;

    if(this.state.loginIsFetching){
      return;
    }

    this.setState({loginIsFetching: true});

    const res = await Promise.race([
      request
        .post(config.api.getToken, {phone: this.state.phone, code})
        .catch(err => {console.log(err); return null;}),
      new Promise(resolve => {
        setTimeout(() => {
          resolve({statusMessage: string_xml.network_poor}); // 网络请求超时
        }, 5000)
      })
    ]);

    this.setState({loginIsFetching: false});

    if(res){

      if(res.statusMessage){
        Toast.offline(res.statusMessage, 5);
        return;
      }

      // 若登录失败 (登录成功 status 为 0，失败为 1)
      if(res.status){
        Alert.alert(navigationItemsIndex ? '密码错误' : '验证码错误','',[{text:'确认'}]);
        // Alert.alert(res.message); // 展示 提示信息
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
      this.props.setIdentityTokenThunk(res.data);
      // 3. 需要退回上一页，则退回上一页
      this.props.needPop && Actions.pop();

    }
    else {
      Toast.offline('网络请求失败！',5);
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
    // paddingVertical: 22,
    borderRadius: 10,
    backgroundColor: '#fed309',
    overflow: 'hidden',
  },
  getCodeTextStyle: {
    fontSize: 22,
    color: '#fff',
  },
  // 提交按钮区
  btnSection: {
    marginTop: 130
  },
  hide: {
    display: 'none'
  }
});

function mapStateToProps(state){
  return {
    verificationCode: state.verificationCode.login,
  }
}

export default connect(mapStateToProps, {setIdentityTokenThunk, getCode, clearData})(Login);