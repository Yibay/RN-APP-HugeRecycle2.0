import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';


import AddressSection from '../../../components/Address/AddressSection';
import TextAdaption from "../../../components/Text/TextAdaption";


class OrderAddressSection extends Component {

  static propTypes = {
    currentLocation: PropTypes.object.isRequired
  };

  render(){

    // 一键回收地址
    if(this.props.currentLocation.id || this.props.currentLocation.address){
      return (
        <TouchableWithoutFeedback onPress={() => this.goToAddressSelectionPage()}>
          <View>
            {/* 显示地址模块 */}
            <AddressSection currentLocation={this.props.currentLocation} rightButton={<Icon style={styles.icon} name='ios-arrow-forward' size={50} color='#828282' />}/>
            <Image source={require('./img/address.png')} resizeMode='contain'/>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    // 定位得来的新地址
    else{
      return (
        <TouchableWithoutFeedback onPress={() => this.goToAddressAddPage()}>
          <View>
            {/* 新增地址模块 */}
            <View style={[styles.container, styles.addNewAddress]}>
              <TextAdaption style={styles.newAddressTitle}>请添加回收地址</TextAdaption>
              <Icon name='md-add' size={50} color='#828282' />
            </View>
            <Image source={require('./img/address.png')} resizeMode='contain'/>
          </View>
        </TouchableWithoutFeedback>
      );
    }

  }

  goToAddressSelectionPage(){
    Actions.addressSelectionPage();
  }

  goToAddressAddPage(){
    Actions.addressAddPage();
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 140,
    padding: 30,
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  // 一键呼叫 地址
  nameSection: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 25,
    fontWeight: '700'
  },
  name: {
    paddingRight: 50
  },
  icon: {
    position: 'absolute',
    right: 32,
    top: 47
  },
  // 新增地址
  addNewAddress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  newAddressTitle: {
    fontSize: 28,
    fontWeight: '400'
  }
});

function mapStateToProps(state){
  return {
    currentLocation: state.location.currentLocation
  };
}


export default connect(mapStateToProps)(OrderAddressSection);