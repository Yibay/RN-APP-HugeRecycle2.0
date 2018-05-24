import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, RefreshControl } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import {setLocation} from "../redux/actions/Location";
import {fetchUserAddressList} from '../redux/actions/user/userAddressList';

import Header from '../components/Header/Header';
import AddressSection from '../components/Address/AddressSection';
import FlatListDefault from "../components/List/FlatListDefault";
import Loading from "../components/Alert/Loading";


class AddressSelection extends Component {

  static propTypes = {
    userAddressList: PropTypes.shape({
      data: PropTypes.arrayOf(
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
      ),
      isFetching: PropTypes.bool.isRequired,
    }),
    setLocationFetching: PropTypes.bool.isRequired,
  };

  render(){
    return (<View style={styles.container}>
      <Header title='选择地址' rightButton={<Text style={styles.rightButton} onPress={() => Actions.addressAddPage()}>新增地址</Text>} />
      <FlatListDefault style={styles.addressList}
                       data={this.props.userAddressList.data}
                       renderItem={({item}) => <TouchableWithoutFeedback onPress={() => this.selectAddress(item)}>
                         <View style={styles.addressItem}>
                           <AddressSection currentLocation={item} rightButton={
                             <TouchableWithoutFeedback onPress={() => this.goToEditAddress(item)}>
                               <Image source={require('../assets/iconImg/edit2x.png')} resizeMode='contain' style={styles.editButton} />
                             </TouchableWithoutFeedback>
                           } />
                         </View>
                       </TouchableWithoutFeedback>}
                       refreshControl={<RefreshControl refreshing={this.props.userAddressList.isFetching} onRefresh={this.props.fetchUserAddressList} />}
                       ListEmptyComponentText='尚未添加地址'
                       isFetching={this.props.userAddressList.isFetching}
                       ListFooterComponentText=''
      />
      <Loading show={this.props.setLocationFetching} />
    </View>);
  }

  // 选择地址
  async selectAddress(location){
    // 设置为选中地址
    await this.props.setLocation(location);
    // 返回上一页
    Actions.pop();
  }

  // 编辑地址页
  goToEditAddress(location){
    // 去编辑地址页
    Actions.addressEditPage({location,getSelectedLocationFunc: this.getSelectedLocationFunc});
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
    userAddressList: state.user.userAddressList,
    setLocationFetching: state.location.isFetching,
  };
}

export default connect(mapStateToProps, {setLocation, fetchUserAddressList})(AddressSelection);