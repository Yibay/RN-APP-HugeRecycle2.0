import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableOpacity, Platform } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';


import request from '../../util/request/request';
import config from '../../util/request/config';

import AdaptLayoutWidth from '../../components/common/AdaptLayoutWidth';
import HouseNumberAddressSection from '../../components/common/Form/Module/HouseNumberAddressSection';


class CallModal extends Component{

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideCallModal: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      accountName: props.currentLocation.customerName ? props.currentLocation.customerName : '',
      phone: props.currentLocation.telNo ? props.currentLocation.telNo : '',
      haveHouseNumber: typeof props.currentLocation.haveHouseNumber !== 'undefined' ? props.currentLocation.haveHouseNumber : true, // 有无户号
      address: props.currentLocation.address ? props.currentLocation.address : '',
      building: props.currentLocation.building ? props.currentLocation.building : '',
      unit: props.currentLocation.unit ? props.currentLocation.unit : '',
      room: props.currentLocation.room ? props.currentLocation.room : ''
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState(
      _.assign(
        {},
        nextProps.currentLocation.customerName ? { accountName: nextProps.currentLocation.customerName } : {},
        nextProps.currentLocation.telNo ? { phone: nextProps.currentLocation.telNo } : {},
        typeof nextProps.currentLocation.haveHouseNumber !== 'undefined' ? { haveHouseNumber: nextProps.currentLocation.haveHouseNumber } : {},
        nextProps.currentLocation.address ? { address: nextProps.currentLocation.address } : {},
        nextProps.currentLocation.building ? { building: nextProps.currentLocation.building } : {},
        nextProps.currentLocation.unit ? { unit: nextProps.currentLocation.unit } : {},
        nextProps.currentLocation.room ? { room: nextProps.currentLocation.room } : {},
      )
    );
  }

  render(){
    return (<Modal transparent={true} visible={this.props.visible} onRequestClose={() => this.onRequestClose()}>
      <AdaptLayoutWidth>
        <View style={styles.container}>
          <View style={styles.msgBox}>
            <Text style={styles.title}>您未选择可回收物，直接呼叫虎哥</Text>
            <View style={styles.lineSection}>
              <Text style={styles.msgText}>联系人</Text>
              <TextInput style={[styles.msgText, styles.msgTextInput, styles.linkman]} underlineColorAndroid="transparent" onChangeText={val => this.setState({accountName: val.trim()})} value={this.state.accountName} />
              <Text style={styles.msgText}>电话</Text>
              <TextInput style={[styles.msgText, styles.msgTextInput, styles.tel]} underlineColorAndroid="transparent" onChangeText={val => this.setState({phone: val.trim()})} value={this.state.phone} />
            </View>
            <View style={styles.lineSection}>
              <Text style={styles.msgText}>小区名称 {this.props.currentLocation.communityName}</Text>
            </View>
            <View style={styles.lineSection}>
              {/* 有无户号 选择器 */}
              <HouseNumberAddressSection onChangeText={valObj => this.setState(valObj)} currentLocation={this.props.currentLocation} />
            </View>
            <View style={styles.btnSection}>
              <TouchableOpacity style={[styles.btn, styles.btnConfirm]} onPress={() => this.confirmCall()}>
                <Text style={[styles.msgText, styles.btnConfirmText]}>确认呼叫</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => this.cancelCall()}>
                <Text style={styles.msgText}>取消呼叫</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </AdaptLayoutWidth>
    </Modal>);
  }

  cancelCall(){
    this.props.hideCallModal();
  }

  confirmCall(){

    // 请求数据
    let params = _.assign(
      {},
      _.pick(this.props.currentLocation, ['communityId', 'communityName']), // 小区信息
      this.state // 联系人、电话、有无户号等信息
    );
    params.isAerialWork = false; // 是否需要拆卸空调
    params.orderSource = Platform.select({ android: 4, ios: 5 });

    // 检验数据
    console.log(params);

    // 发送请求
    // 若已登录
    if(this.props.authToken){
      // 带 X-AUTH-TOKEN 发送请求
    }
    // 若未登录
    else {
      // 带验证码 发送请求
    }

    // 发送成功后，关闭弹窗
    this.props.hideCallModal();
  }

  // Android Modal 必须属性
  onRequestClose(){}
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(215, 215, 215, 0.8)'
  },
  msgBox: {
    width: 700,
    paddingHorizontal:20,
    borderRadius: 50,
    alignItems: 'stretch',
    overflow: 'hidden',
    backgroundColor: '#eee'
  },
  title: {
    paddingVertical: 30,
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center'
  },
  lineSection: {
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  msgText: {
    fontSize: 30
  },
  btnSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    flex: 1,
    marginTop: 40,
    marginBottom: 50,
    paddingVertical: 20,
    alignItems: 'center'
  },
  btnConfirm: {
    marginRight: 30,
    backgroundColor: '#169bd5'
  },
  btnConfirmText: {
    color: '#fff'
  },
  btnCancel: {
    backgroundColor: 'rgba(249, 249, 249, 1)'
  },
  msgTextInput: {
    height: 50,
    padding: 0,
    borderWidth: 1
  },
  linkman: {
    flex: 2,
    marginLeft: 20,
    marginRight: 50
  },
  tel: {
    flex: 3,
    marginLeft: 20,
  },
  haveHouseNumberSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  address: {
    flex: 1,
    marginHorizontal: 10,
    textAlign: 'center'
  },
  hide: {
    display: 'none'
  }
});

function mapStateToProps(state){
  return {
    currentLocation: state.location.currentLocation,
    authToken: state.identityToken.authToken
  }
}

export default connect(mapStateToProps)(CallModal);