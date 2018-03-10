import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';


import { verifyLogin } from '../../../HOC/verifyLogin';

import Header from '../../../components/Header/Header';
import LineSection from '../../../components/LineSection/LineSection';


class ManageCustomerAccounts extends Component {

  static propTypes = {
    identityToken: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string
      })
    })
  };

  render(){
    return (<View style={styles.container}>
      <Header title='安全中心'/>
      <View style={styles.content}>
        <View style={styles.customerPhotoSection}>
          <Image style={styles.customerPhoto} source={require('../../../assets/img/personalImage2x.png')} resizeMode='contain'/>
        </View>
        <LineSection title='昵称' style={styles.lineSection} rightModule={<Text style={styles.name}>{this.props.identityToken.user.name}</Text>} textStyle={styles.text}/>
        {/*<LineSection title='绑定微信' style={styles.lineSection} textStyle={styles.text} rightModule={<Icon style={styles.icon} name='ios-arrow-forward' size={50} color='#828282' />}/>*/}
        <LineSection title='修改登录密码' style={styles.lineSection} textStyle={styles.text} onPress={() => Actions.manageLoginPassword()} rightModule={<Icon style={styles.icon} name='ios-arrow-forward' size={50} color='#828282' />}/>
        <LineSection title='修改消费密码' style={styles.lineSection} textStyle={styles.text} onPress={() => Actions.manageConsumePassword()} rightModule={<Icon style={styles.icon} name='ios-arrow-forward' size={50} color='#828282' />}/>
      </View>
    </View>)
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
  // 用户头像
  customerPhotoSection: {
    height: 188,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  customerPhoto: {
    width: 157,
    height: 157,
    borderRadius: 78.5,
    backgroundColor: '#ccc'
  },
  // 各模块
  lineSection: {
    height: 100
  },
  text: {
    fontSize: 28,
    fontWeight: '700',
    color: '#888'
  },
  name: {
    fontSize: 30,
    color: '#010101'
  }
});

export default verifyLogin(ManageCustomerAccounts);