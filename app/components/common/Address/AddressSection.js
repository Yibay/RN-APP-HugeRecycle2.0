/**
 * 地址模块
 * 显示 用户名、电话、市、区、街道、小区
 * 根据有无户号，分别显示 幢、单元、室 或 详细地址
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';


class AddressSection extends Component {

  static propTypes = {
    currentLocation: PropTypes.shape({
      customerName: PropTypes.string.isRequired,
      telNo: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      communityName: PropTypes.string.isRequired,
      haveHouseNumber: PropTypes.bool.isRequired
    }),
    rightButton: PropTypes.element.isRequired
  };

  static defaultProps = {
    rightButton: (<View />)
  };

  render(){
    return (<View style={styles.container}>
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
      <View style={styles.icon}>
        {
          this.props.rightButton
        }
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 138,
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  nameSection: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
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
    top: 0,
    right: 32,
    bottom: 0,
    justifyContent: 'center'
  },
});


export default AddressSection;