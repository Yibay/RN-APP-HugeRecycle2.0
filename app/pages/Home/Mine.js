import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, RefreshControl } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


import { verifyLogin } from '../../HOC/verifyLogin';
import { setIdentityToken, emptyIdentityToken } from '../../redux/actions/IdentityToken';
import request from '../../util/request/request';
import config from '../../util/request/config';

import Header from '../../components/common/Header/Header';


class Mine extends Component {

  constructor(props){
    super(props);

    this.state = {
      customerScore: 0,
      isRefreshing: false
    };
  }

  render(){
    return (<View style={styles.container}>
      <Header title='我的' hideBack={true} rightButton={<Text style={styles.rightButton}>消息</Text>} />
      <ScrollView style={styles.content} refreshControl={<RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={() => this.refreshCustomerScore()}
        title='下拉刷新'
      />}>
        {/* 基本信息 */}
        <View style={styles.basicFacts}>
          <View style={styles.message}>
            <Text style={styles.text}>{this.props.identityToken.user.name}</Text>
            <Text style={styles.text}>{this.props.identityToken.user.phone}</Text>
            <View style={styles.securityCenter}>
              <Text style={styles.text} onPress={() => {Actions.manageCustomerAccounts()}}>安全中心</Text>
            </View>
          </View>
        </View>
        <View style={styles.lineSection}>
          <Text style={styles.text} onPress={() => {Actions.customerScorePage()}}>环保金</Text>
          <Text style={styles.customerScore}>{`¥${this.state.customerScore}`}</Text>
        </View>
        <View style={styles.lineSection}>
          <Text style={styles.text}>地址管理</Text>
        </View>
        <View style={styles.lineSection}>
          <Text style={styles.text} onPress={() => Actions.environmentalRecordPage()}>环保记录</Text>
        </View>
        <View style={styles.lineSection}>
          <Text style={styles.text} onPress={() => this.exitLogon()}>退出登录</Text>
        </View>
      </ScrollView>
    </View>)
  }

  async componentDidMount(){
    // this.refreshCustomerScore();
  }

  // 刷新环保金余额
  async refreshCustomerScore(){
    const res = await request.get(config.api.getCustomerScore,null,{'X-AUTH-TOKEN': this.props.identityToken.authToken});
    if(res){
      if(!res.status){
        this.setState({customerScore: res.data, isRefreshing: false});
      }
      else {
        console.log(res);
        this.setState({isRefreshing: false});
      }
    }
  }

  // 退出登录
  exitLogon(){
    Alert.alert('确认退出登录？','',[
      {text: '取消', onPress: () => {}},
      {text: '确认', onPress: () => {
          // 更新全局身份令牌
          this.props.setIdentityToken(emptyIdentityToken);
          // 删除本地身份令牌
          // storage.remove({key: 'identityToken'});
          Actions.jump('recycle');
        }
      }
    ]);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // 页头
  rightButton: {
    fontSize: 24
  },
  // 内容区
  content: {
    flex: 1
  },
  basicFacts: {
    flexDirection: 'row'
  },
  message: {
    position: 'relative',
    flex: 1,
    height: 150,
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 26
  },
  securityCenter: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  },
  lineSection: {
    marginTop: 10,
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  customerScore: {
    fontSize: 26,
    color: 'red'
  }
});

// 此页面需验证身份
export default verifyLogin(connect(null, { setIdentityToken })(Mine));