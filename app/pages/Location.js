import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import CommunitySelector from '../containers/Location/CommunitySelector/CommunitySelector';
import SubmitBtn from '../components/Form/Btn/SubmitBtn';


class LocationPage extends Component{

  static propTypes = {
    authToken: PropTypes.string,
    selectedLocationCallBack: PropTypes.func // 有此回调函数，则选中小区后，不更新给redux currentLocation
  };

  render(){
    return (<View style={styles.container}>
      <Text style={styles.prompt}>为了更好的为您服务，虎哥需要知道您的位置，请选择您所在的小区</Text>
      <CommunitySelector style={styles.communitySelector} selectedLocationCallBack={this.props.selectedLocationCallBack} />
      {
        this.props.authToken ?
          undefined
          :
          <SubmitBtn style={styles.loginBtn} text='已回收过，手机号码直接登录' submit={() => {Actions.login();}}/>
      }

      <View style={this.props.authToken ? [styles.serviceScope].concat(styles.serviceScopeOnly) : styles.serviceScope }>
        <Text style={styles.serviceScopeText} onPress={() => Actions.coverageAreaPage()}>查看全部服务范围</Text>
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
  serviceScopeOnly: {
    marginTop: 50
  },
  serviceScopeText: {
    fontSize: 22,
    lineHeight: 22,
    color: '#525252'
  }
});

function mapStateToProps(state){
  return {
    authToken: state.identityToken.authToken
  }
}

export default connect(mapStateToProps)(LocationPage);