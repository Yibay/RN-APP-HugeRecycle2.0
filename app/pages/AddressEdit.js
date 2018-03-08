/**
 * 地址编辑页
 */

import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Alert } from 'react-native';

import {Actions} from "react-native-router-flux";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';


import {editAddress} from '../util/form/locationValidator';
import request from '../util/request/request';
import config from '../util/request/config';
import {setUserAddressList} from '../redux/actions/Location';

import Header from '../components/Header/Header';
import InputSection from '../components/Form/Input/InputSection';
import HouseNumberAddressSection from '../components/Form/Module/HouseNumberAddressSection';
import SubmitBtn from '../components/Form/Btn/SubmitBtn';
import LocationBtn from '../containers/common/LocationBtn';
import {verifyLogin} from "../HOC/verifyLogin";


class AddressEdit extends Component {

  static propTypes = {
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired,
      telNo: PropTypes.string.isRequired,
      cityId: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      regionId: PropTypes.number.isRequired,
      region: PropTypes.string.isRequired,
      streetId: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      communityId: PropTypes.number.isRequired,
      communityName: PropTypes.string.isRequired,
      haveHouseNumber: PropTypes.bool.isRequired,
      address: PropTypes.string,
      building: PropTypes.string,
      unit: PropTypes.string,
      room: PropTypes.string
    })
  };

  constructor(props){
    super(props);

    this.state = {
      id: this.props.location.id,
      customerName: this.props.location.customerName || '',
      telNo: this.props.location.telNo || '',
      cityId: this.props.location.cityId,
      city: this.props.location.city,
      regionId: this.props.location.regionId,
      region: this.props.location.region,
      streetId: this.props.location.streetId,
      street: this.props.location.street,
      communityId: this.props.location.communityId,
      communityName: this.props.location.communityName || '',
      haveHouseNumber: this.props.location.haveHouseNumber,
      address: this.props.location.address || '',
      building: this.props.location.building || '',
      unit: this.props.location.unit || '',
      room: this.props.location.room || '',
      isLocationDefault: false
    };
  }

  render(){
    console.log(123);
    console.log(this.props);
    return (<View style={styles.container}>
      <Header title='编辑地址' />
      <InputSection label='联系人' value={this.state.customerName} onChangeText={val => this.setState({customerName: val})} />
      <InputSection label='手机号码' value={this.state.telNo} onChangeText={val => this.setState({telNo: val})} />
      <View style={styles.communitySection}>
        <InputSection label='小区名称' value={this.state.communityName} editable={false} rightButton={<LocationBtn/>} />
        <TouchableWithoutFeedback onPress={() => {Actions.locationPage({selectedLocationCallBack: (community) => this.updateCommunityAddress(community)})}}>
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
      </View>
      <HouseNumberAddressSection
        currentLocation={{
          haveHouseNumber: this.state.haveHouseNumber,
          address: this.state.address,
          building: this.state.building,
          unit: this.state.unit,
          room: this.state.room
        }}
        onChangeText={val => this.updateDetailedAddress(val)}
        style={styles.HouseNumberAddressSection} />
      <SubmitBtn style={styles.submitBtn} submit={() => this.commitUpdate()} />
    </View>)
  }

  // 更新 haveHouseNumber, address, building, unit, room
  updateDetailedAddress(valObj){
    this.setState(valObj);
  }

  // 更新 小区地址
  updateCommunityAddress(community){
    this.setState(_.pick(community,['cityId','city','regionId','region','streetId','street','communityId','communityName']));
  }

  // 确认更新到数据库
  async commitUpdate(){
    console.log(this.props);
    // 检验数据
    if(editAddress(this.state)){
      // 更新到数据库
      const res = await request.post(config.api.editAddress,this.state,{'X-AUTH-TOKEN': this.props.identityToken.authToken});
      // 刷新全局 userAddressList 数据
      if(res && !res.status){
        const userAddressList = await request.get(config.api.getAddressList,null,{'X-AUTH-TOKEN': this.props.identityToken.authToken});
        if(userAddressList && !userAddressList.status){
          this.props.setUserAddressList(userAddressList.data.addresses);
          Actions.pop();
        }
      }
      else{
        Alert.alert('编辑失败');
      }
    }

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

export default verifyLogin(connect(null,{setUserAddressList})(AddressEdit));