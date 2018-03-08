import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import Header from '../components/Header/Header';
import AddressSection from '../components/Address/AddressSection';
import {verifyLogin} from "../HOC/verifyLogin";


class AddressManagement extends Component {

  static propTypes = {
    identityToken: PropTypes.shape({
      authToken: PropTypes.string.isRequired
    }),
    userAddressList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        customerName: PropTypes.string.isRequired,
        telNo: PropTypes.string.isRequired,
        communityName: PropTypes.string.isRequired,
        haveHouseNumber: PropTypes.bool.isRequired,
        address: PropTypes.string,
        building: PropTypes.string,
        unit: PropTypes.string,
        room: PropTypes.string
      })
    )
  };

  render(){
    return (<View style={styles.container}>
      <Header title='地址管理' rightButton={<Text style={styles.rightButton} onPress={() => Actions.addressAddPage()}>新增地址</Text>} />
      <ScrollView style={styles.addressList}>
        {
          this.props.userAddressList.map(item => <TouchableWithoutFeedback key={item.id} onPress={() => this.selectAddress(item)}>
            <View style={styles.addressItem}>
              <AddressSection currentLocation={item} rightButton={
                <TouchableWithoutFeedback onPress={() => this.goToEditAddress(item)}>
                  <Image source={require('../assets/iconImg/edit2x.png')} resizeMode='contain' style={styles.editButton} />
                </TouchableWithoutFeedback>
              } />
            </View>
          </TouchableWithoutFeedback>)
        }
      </ScrollView>
    </View>);
  }

  // 长按地址模块
  selectAddress(location){
    // 删除地址
    console.log('显示 删除地址 按钮');
  }

  // 去编辑地址页
  goToEditAddress(location){
    // 去编辑地址页
    Actions.addressEditPage({location});
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

export default verifyLogin(connect(mapStateToProps)(AddressManagement));