import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { Actions } from 'react-native-router-flux';


import { verifyLogin } from '../../HOC/verifyLogin';

import Header from '../../components/common/Header/Header';


class Mine extends Component {

  render(){
    console.log(this.props);
    return (<View style={styles.container}>
      <Header title='我的' hideBack={true} rightButton={<Text style={styles.rightButton}>消息</Text>} />
      <ScrollView>
        {/* 基本信息 */}
        <View style={styles.basicFacts}>
          <View style={styles.message}>
            <Text style={styles.text}>{this.props.identityToken.user.name}</Text>
            <Text style={styles.text}>{this.props.identityToken.user.phone}</Text>
            <View style={styles.securityCenter}>
              <Text style={styles.text}>安全中心</Text>
            </View>
          </View>
        </View>
        <View style={styles.lineSection}>
          <Text style={styles.text}>环保金</Text>
        </View>
        <View style={styles.lineSection}>
          <Text style={styles.text}>地址管理</Text>
        </View>
        <View style={styles.lineSection}>
          <Text style={styles.text} onPress={() => Actions.environmentalRecordPage()}>环保记录</Text>
        </View>
      </ScrollView>
    </View>)
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
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

// 此页面需验证身份
export default verifyLogin(Mine);