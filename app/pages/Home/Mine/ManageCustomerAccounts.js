import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { Switch } from 'react-native-switch';


import request from "../../../util/request/request";
import config from '../../../util/request/config';
import { verifyLogin } from '../../../HOC/verifyLogin';

import Header from '../../../components/Header/Header';
import LineSection from '../../../components/LineSection/LineSection';


class ManageCustomerAccounts extends Component {

  static propTypes = {
    identityToken: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    PayPasswordFlag: PropTypes.bool
  };

  static defaultProps = {
    PayPasswordFlag: false
  };

  constructor(props){
    super(props);

    this.state = {
      PayPasswordFlag: this.props.PayPasswordFlag,
      PayPasswordFlagFetching: false
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({PayPasswordFlag: nextProps.PayPasswordFlag});
  }

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
        <LineSection title='是否打开消费密码' style={styles.lineSection} textStyle={styles.text} rightModule={
          <Switch containerStyle={styles.PayPasswordSwitch}
                  value={this.state.PayPasswordFlag}
                  onValueChange={val => this.setPayPasswordFlag(val)}
                  activeText='是' inActiveText='否'
                  backgroundActive='#fed309'
                  circleSize={40}
                  activeTextStyle={[styles.PayPasswordFlagText, styles.activeTextStyle]}
                  inactiveTextStyle={styles.PayPasswordFlagText}/>
        }/>
      </View>
    </View>)
  }

  async setPayPasswordFlag(val){
    // 之前请求未结束
    if(this.state.PayPasswordFlagFetching){
      return;
    }
    // 开始请求
    this.setState({PayPasswordFlagFetching: true});
    const res = await request.postFormData(config.api.updatePayPasswordFlag,{payPasswordFlag: Number(val)},{'X-AUTH-TOKEN': this.props.identityToken.authToken});
    if(res && !res.status){
      this.setState({PayPasswordFlag: val, PayPasswordFlagFetching: false})
    }
    else {
      this.setState({PayPasswordFlagFetching: false});
    }
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
  // 昵称
  name: {
    fontSize: 30,
    color: '#010101'
  },
  // 消费密码开关
  PayPasswordSwitch: {
    overflow: 'hidden'
  },
  PayPasswordFlagText: {
    fontSize: 25
  },
  activeTextStyle: {
    color: '#000'
  }
});

function mapPropsToState(state){
  return {
    PayPasswordFlag: !!state.user.payPasswordFlag.data
  }
}

export default verifyLogin(connect(mapPropsToState)(ManageCustomerAccounts));