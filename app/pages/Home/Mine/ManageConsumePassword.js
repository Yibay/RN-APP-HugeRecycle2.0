import React,{Component} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';

import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {Toast} from 'antd-mobile-rn';


import {updateConsumePWValidator} from '../../../util/form/mineValidator';
import request from '../../../util/request/request';
import config from '../../../util/request/config';
import string_xml from "../../../util/request/string";

import Header from "../../../components/Header/Header";
import {verifyLogin} from "../../../HOC/verifyLogin";
import SixDigitCodePassword from "../../../components/Form/Module/SixDigitsCodePassword/SixDigitsCodePassword";
import Loading from "../../../components/Alert/Loading";


class ManageConsumePassword extends Component {

  static propTypes = {
    identityToken: PropTypes.shape({
      authToken: PropTypes.string
    })
  };

  constructor(props){
    super(props);

    this.state = {
      password: '',
      isFetching: false,
    };
  }

  render(){
    let encryptedPhones = this.props.identityToken.user.phone.slice(0,3);
    encryptedPhones += this.props.identityToken.user.phone.slice(3,-4).replace(/\d/g,'*');
    encryptedPhones += this.props.identityToken.user.phone.slice(-4);

    return <View style={styles.container}>
      <Header title='设置消费密码'/>
      <View style={styles.content}>
        <View style={styles.promptSection}>
          <Text style={styles.account}>帐号：{encryptedPhones}</Text>
          <Text style={styles.promptMsg}>{this.state.password.length < 6 ? '设置6位数的消费密码' : '请再输入一次'}</Text>
        </View>
        <SixDigitCodePassword onChangeText={val => this.onChangeText(val)} submit={val => this.submit(val)} />
      </View>
      <Loading show={this.state.isFetching} />
    </View>
  }

  // 6位码textInput 变更回调
  onChangeText(password){
    this.setState({password})
  }

  // 确认修改
  async submit(password){
    // 验证6位码，数据
    const result = updateConsumePWValidator(password);
    if(!result.value){
      return result.reset;
    }
    // 发送请求
    this.setState({isFetching: true});
    const res = await Promise.race([
      request.postFormData(config.api.updateCustomerPayPassword,{payPassword: password.substr(0,6)},{'X-AUTH-TOKEN': this.props.identityToken.authToken}),
      new Promise(resolve => {
        setTimeout(() => resolve({status:1, message: string_xml.network_poor2}), 5000);
      })
    ]);
    if(res && !res.status){
      Alert.alert('修改成功','',[
        {text: '确定', onPress: () => Actions.pop()}
      ]);
    }
    else{
      Toast.offline(res.message, 3);
    }
    this.setState({isFetching: false});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  // 提示区域
  promptSection: {
    height: 190,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  account: {
    fontSize: 26,
    color: '#888'
  },
  promptMsg: {
    marginTop: 28,
    fontSize: 32,
    color: '#000'
  }
});

export default verifyLogin(ManageConsumePassword);