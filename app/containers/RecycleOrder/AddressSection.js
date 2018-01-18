import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';


class AddressSection extends Component {

  static propTypes = {
    currentLocation: PropTypes.object.isRequired
  };

  render(){

    // 一键回收地址
    if(this.props.currentLocation.id){
      return (
        <TouchableWithoutFeedback onPress={() => this.goToAddressSelectionPage()}>
          <View style={styles.container}>
            <View style={styles.nameSection}>
              <Text style={[styles.text ,styles.name]}>{this.props.currentLocation.customerName}</Text>
              <Text style={styles.text}>{this.props.currentLocation.telNo}</Text>
            </View>
            <Text style={styles.text}>
              {
                `${this.props.currentLocation.city}${this.props.currentLocation.region}${this.props.currentLocation.street}${this.props.currentLocation.communityName}`
                + (this.props.currentLocation.haveHouseNumber ?
                  `${this.props.currentLocation.building}幢${this.props.currentLocation.unit}单元${this.props.currentLocation.room}室` :
                  `${this.props.currentLocation.address}`)
              }
            </Text>
            <Icon style={styles.icon} name='ios-arrow-forward' size={50} color='#828282' />
          </View>
        </TouchableWithoutFeedback>
      );
    }
    // 定位得来的新地址
    else{
      return (
        <TouchableWithoutFeedback onPress={() => this.goToAddressAddPage()}>
          <View style={[styles.container, styles.addNewAddress]}>
            <Text style={styles.text}>请添加回收地址</Text>
            <Icon style={styles.icon2} name='md-add' size={50} color='#828282' />
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
    borderBottomWidth: 12,
    borderColor: '#fed309',
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
  }
});

function mapStateToProps(state){
  return {
    currentLocation: state.location.currentLocation
  };
}


export default connect(mapStateToProps)(AddressSection);