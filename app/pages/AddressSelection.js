import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


import { changeLocation } from '../util/task/LocationManage';

import Header from '../components/Header/Header';
import AddressSection from '../components/Address/AddressSection';


class AddressSelection extends Component {

  render(){
    return (<View style={styles.container}>
      <Header title='选择地址' rightButton={<Text style={styles.rightButton} onPress={() => Actions.addressAddPage()}>新增地址</Text>} />
      <ScrollView style={styles.addressList}>
        {
          this.props.userAddressList.map(item => <TouchableWithoutFeedback key={item.id} onPress={() => this.selectAddress(item)}>
            <View style={styles.addressItem}>
              <AddressSection currentLocation={item} rightButton={
                <TouchableWithoutFeedback onPress={() => this.goToEditAddress()}>
                  <Image source={require('../assets/iconImg/edit2x.png')} resizeMode='contain' style={styles.editButton} />
                </TouchableWithoutFeedback>
              } />
            </View>
          </TouchableWithoutFeedback>)
        }
      </ScrollView>
    </View>);
  }

  // 选择地址
  selectAddress(location){
    // 设置为选中地址
    changeLocation(location);
    // 返回上一页
    Actions.pop();
  }

  // 编辑地址页
  goToEditAddress(){
    // 将被编辑地址信息同步到数据流
    // 去编辑地址页
    Actions.addressEditPage();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rightButton: {
    fontSize: 24,
    lineHeight: 24
  },
  addressList: {
    flex: 1
  },
  addressItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#e1e5e8'
  },
  editButton: {
    width: 30,
    height: 30
  }
});

function mapStateToProps(state){
  return {
    userAddressList: state.location.userAddressList
  };
}

export default connect(mapStateToProps)(AddressSelection);