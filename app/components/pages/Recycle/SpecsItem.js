import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';


import config from '../../../util/request/config'


const SpecsItem = props => (<View style={styles.container}>
  <Image style={styles.specsImage} resizeMode='contain' source={{uri: (config.static.base + props.specs.image)}} />
  <View style={styles.specsContent}>
    <Text style={styles.specsName}>{props.specs.name}</Text>
    <View style={styles.specsOtherMsg}>
      <Text style={styles.otherGift}>{props.specs.otherGift}</Text>
      <Text style={styles.price}>¥{props.specs.price}</Text>
    </View>
    <View style={styles.controller}>
      <View style={styles.controllerBtn}><Text style={styles.controllerBtnText}>-</Text></View>
      <View><Text style={styles.recycleNum}>0</Text></View>
      <View style={styles.controllerBtn}><Text style={styles.controllerBtnText}>+</Text></View>
    </View>
  </View>
</View>);

SpecsItem.propTypes = {
  specs: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    otherGift: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  specsImage: {
    width: 100,
    height: 100,
    marginRight: 20
  },
  specsContent: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between'
  },
  specsName: {
    fontSize: 36,
    fontWeight: '700'
  },
  specsOtherMsg: {
    flexDirection: 'row'
  },
  otherGift: {
    fontSize: 26,
    color: 'red'
  },
  price: {
    fontSize: 26,
    color: 'red'
  },
  controller: {
    position: 'absolute',
    right: 0,
    top: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  controllerBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(245, 245, 245, 1)'
  },
  controllerBtnText: {
    fontSize: 34
  },
  recycleNum: {
    paddingHorizontal: 10,
    fontSize: 30
  }
});


export default SpecsItem;