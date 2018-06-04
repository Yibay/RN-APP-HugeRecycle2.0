import React, { Component } from 'react';
import { StyleSheet, View, Alert, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';


import validator  from '../util/form/validator';
import config from '../util/request/config';
import request from '../util/request/request';
import { setLocation } from '../redux/actions/Location';
import {fetchUserAddressList} from '../redux/actions/user/userAddressList';

import Header from '../components/Header/Header';
import InputSection from '../components/Form/Input/InputSection';
import LocationBtn from '../containers/common/LocationBtn';
import HouseNumberAddressSection from '../components/Form/Module/HouseNumberAddressSection';
import SubmitBtn from '../components/Form/Btn/SubmitBtn';


class AddressAdd extends Component {

  static propTypes = {
    getSelectedLocationFunc: PropTypes.func, // 此方法 获取 选中location，代替 更新全局 currentLocation
  };

  constructor(props){
    super(props);

    this.state={
      customerName: '',
      telNo: '',
      communityName: props.communityName,
      haveHouseNumber: true,
      address: '',
      building: '',
      unit: '',
      room: ''
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      communityName: nextProps.communityName
    })
  }

  render(){
    return (<View style={styles.container}>
      <Header title='新增地址' />
      <InputSection label='联系人' value={this.state.customerName} onChangeText={val => this.setState({customerName: val})} />
      <InputSection label='手机号码' value={this.state.telNo} onChangeText={val => this.setState({telNo: val})} />
      <View style={styles.communitySection}>
        <InputSection label='小区名称' value={this.state.communityName} editable={false} rightButton={<LocationBtn/>} />
        <TouchableWithoutFeedback onPress={() => {Actions.locationPage({getSelectedLocationFunc: this.props.getSelectedLocationFunc})}}>
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
      </View>
      <HouseNumberAddressSection onChangeText={val => this.updateAddress(val)} style={styles.HouseNumberAddressSection} />
      <SubmitBtn style={styles.submitBtn} submit={() => this.addAddress()} />
    </View>);
  }

  // 更新 有无户号 及 address等信息
  updateAddress(valObj){
    this.setState(valObj);
  }

  // 新增地址
  async addAddress(){
    // 请求参数
    let addAddress = _.merge({}, _.pick(this.props.currentLocation, ['cityId', 'city', 'regionId', 'region', 'streetId', 'street', 'communityId', 'communityName']), this.state);
    // 默认 不设为 默认地址
    addAddress.isLocationDefault = false;
    // 检验数据格式
    if(validator.isEmpty(addAddress.customerName)){
      Alert.alert('请输入联系人姓名','',[{text:'确认'}]);
      return;
    }
    if(!validator.isPhone(addAddress.telNo)){
      Alert.alert('请输入正确的手机号码','',[{text:'确认'}]);
      return;
    }
    if(addAddress.haveHouseNumber){
      if(validator.isEmpty(addAddress.building)){
        Alert.alert('请填写栋','',[{text:'确认'}]);
        return;
      }
      if(validator.isEmpty(addAddress.unit)){
        Alert.alert('请填写单元','',[{text:'确认'}]);
        return;
      }
      if(validator.isEmpty(addAddress.room)){
        Alert.alert('请填写室','',[{text:'确认'}]);
        return;
      }
      addAddress.building.toUpperCase(); // 统一转成 大写字母
      addAddress.unit = Number(addAddress.unit);
      addAddress.room = Number(addAddress.room);
      addAddress.address = `${addAddress.building}-${addAddress.unit}-${addAddress.room}`;
    }
    else{
      if(validator.isEmpty(addAddress.address)){
        Alert.alert('请填写详细地址','',[{text:'确认'}]);
        return;
      }
      addAddress.building = null;
      addAddress.unit = null;
      addAddress.room = null;
    }

    // 1. 添加新地址 请求
    let newAddress = await request
      .post(config.api.addAddress, addAddress, {'X-AUTH-TOKEN': this.props.authToken})
      .catch(err => {console.log(err); return null;});

    // 若请求成功 数据正确
    if(newAddress && !newAddress.status && newAddress.data){
      await this.props.setLocation(newAddress.data); // 更新到 数据流
      Actions.pop(); // 返回上一页
    }
    else {
      console.log(newAddress);
      Alert.alert(newAddress.message || '添加地址失败','',[{text:'确认'}]);
      return;
    }

    // 2. 请求更新 用户地址列表(异步)
    this.props.fetchUserAddressList();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  submitBtn: {
    marginTop: 78
  },
  HouseNumberAddressSection: {
    height: 106,
    paddingHorizontal: 34,
    paddingVertical: 24,
    borderColor: '#e1e5e8',
    borderBottomWidth: 2,
  },
  communitySection: {
    position: 'relative'
  },
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});

function mapStateToProps(state){
  return {
    communityName: state.location.currentLocation.communityName,
    currentLocation: state.location.currentLocation,
    authToken: state.identityToken.authToken
  }
}


export default connect(mapStateToProps, { setLocation, fetchUserAddressList })(AddressAdd);