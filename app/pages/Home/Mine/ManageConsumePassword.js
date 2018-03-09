import React,{Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';


import {updateConsumePWValidator} from '../../../util/form/mineValidator';

import Header from "../../../components/Header/Header";
import {verifyLogin} from "../../../HOC/verifyLogin";
import SixDigitCodePassword from "../../../components/Form/Module/SixDigitsCodePassword/SixDigitsCodePassword";


class ManageConsumePassword extends Component {

  static propTypes = {
    identityToken: PropTypes.shape({
      authToken: PropTypes.string
    })
  };

  constructor(props){
    super(props);

    this.state = {
      password: ''
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
    </View>
  }

  // 6位码textInput 变更回调
  onChangeText(password){
    this.setState({password})
  }

  // 确认修改
  submit(password){
    // 验证6位码，数据
    const result = updateConsumePWValidator(password);
    if(!result.value){
      return result.reset;
    }
    // 发送请求
    console.log(password.substr(0,6));
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