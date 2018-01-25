import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';


import CommunitySelector from '../containers/Location/CommunitySelector';
import SubmitBtn from '../components/common/Form/Btn/SubmitBtn';


class LocationPage extends Component{
  render(){
    return (<View style={styles.container}>
      <Text style={styles.prompt}>为了更好的为您服务，虎哥需要知道您的位置，请选择您所在的小区</Text>
      <CommunitySelector style={styles.communitySelector} />
      <SubmitBtn style={styles.loginBtn} text='已回收过，手机号码直接登录' submit={() => {Actions.login();}}/>
      <View style={styles.serviceScope}>
        <Text style={styles.serviceScopeText}>查看全部服务范围</Text>
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center'
  },
  prompt: {
    marginTop: 198,
    marginHorizontal: 128,
    lineHeight: 35,
    fontSize: 24,
    textAlign: 'center',
    color: '#828282'
  },
  communitySelector: {
    borderBottomWidth: 2,
    borderBottomColor: '#dcdcdc'
  },
  loginBtn: {
    marginTop: 42,
    marginBottom: 52
  },
  serviceScope: {
    marginBottom: 114,
  },
  serviceScopeText: {
    fontSize: 22,
    lineHeight: 22,
    color: '#525252'
  }
});

export default LocationPage;