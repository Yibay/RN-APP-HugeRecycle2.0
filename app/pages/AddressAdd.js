import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';


import Header from '../components/common/Header/Header';
import InputSection from '../components/common/Form/Input/InputSection';
import LocationBtn from '../containers/common/LocationBtn';
import AddressSection from '../components/common/Form/Module/AddressSection';
import SubmitBtn from '../components/common/Form/Btn/SubmitBtn';


class AddressAdd extends Component {

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
      <InputSection label='小区名称' value={this.state.communityName} editable={false} rightButton={<LocationBtn/>} />
      <AddressSection onChangeText={val => this.updateAddress(val)} />
      <SubmitBtn style={styles.submitBtn} submit={() => this.addAddress()} />
    </View>);
  }

  // 更新 有无户号 及 address等信息
  updateAddress(valObj){
    this.setState(valObj);
  }

  // 新增地址
  addAddress(){
    console.log(this.state);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  submitBtn: {
    marginTop: 78
  }
});

function mapStateToProps(state){
  return {
    communityName: state.location.currentLocation.communityName
  }
}

export default connect(mapStateToProps)(AddressAdd);