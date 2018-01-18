import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';


import config from '../../../util/request/config';


const RecycledItem = props => (<View style={styles.container}>
  <Image style={styles.specsImage} resizeMode='contain' source={{uri: config.static.base + props.specs.image}} />
  <View style={styles.specsContent}>
    <Text style={styles.specsName}>{props.specs.name}</Text>
    <Text style={styles.specNum}>{'¥' + props.specs.price + '*' + props.specs.number}</Text>
    <Text style={styles.specPrice}>{'¥' + props.specs.price * props.specs.number}</Text>
  </View>
</View>);

RecycledItem.propTypes = {
  specs: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired
  })
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 40,
    paddingVertical: 30,
    flexDirection: 'row',
    backgroundColor: '#f7f7f7'
  },
  specsImage: {
    width: 100,
    height: 100,
    marginRight: 30
  },
  specsContent: {
    position: 'relative',
    flex: 1
  },
  specsName: {
    paddingTop: 10,
    fontSize: 30
  },
  specNum: {
    paddingTop: 15,
    fontSize: 30
  },
  specPrice: {
    position: 'absolute',
    top: 30,
    right: 20,
    fontSize: 30,
    fontWeight: '500',
    color: 'red'
  }
});

export default RecycledItem;