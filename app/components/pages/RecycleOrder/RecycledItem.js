import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';


import config from '../../../util/request/config';


const RecycledItem = props => (<View style={styles.container}>
  <Image style={styles.specsImage} resizeMode='contain' source={{uri: config.static.base + props.specs.image}} />
  <View style={styles.specsContent}>
    <Text style={styles.specsName}>{`${props.subCategoryName} ${props.specs.name}`}</Text>
    <Text style={styles.specNum}>{'¥' + props.specs.price + ' *' + props.specs.number}</Text>
    <Text style={styles.specTotalPrice}>{'¥' + props.specs.price * props.specs.number}</Text>
  </View>
</View>);

RecycledItem.propTypes = {
  specs: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired
  }),
  subCategoryName: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    paddingHorizontal: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#e4e5e7',
    flexDirection: 'row',
    alignItems: 'center'
  },
  specsImage: {
    width: 110,
    height: 110,
    marginRight: 30
  },
  specsContent: {
    position: 'relative',
    flex: 1
  },
  specsName: {
    paddingTop: 10,
    fontSize: 27,
    fontWeight: '500'
  },
  specNum: {
    paddingTop: 15,
    fontSize: 27,
    fontWeight: '500'
  },
  specTotalPrice: {
    position: 'absolute',
    top: 30,
    right: 20,
    fontSize: 30,
    fontWeight: '500',
    color: 'red'
  }
});

export default RecycledItem;