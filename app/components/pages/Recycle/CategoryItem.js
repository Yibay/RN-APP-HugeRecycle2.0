import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import PropTypes from 'prop-types';


import config from "../../../util/request/config";

import SpecsItem from './SpecsItem';


const CategoryItem = props => {
  return (<View>
  <View style={styles.categoryHeader}>
    <Image resizeMode='contain' style={styles.categoryImage} source={{uri: (config.static.base + props.category.image)}} />
    <Text style={styles.categoryTitle}>{props.category.name}</Text>
  </View>
  {
    Object.keys(props.category.specsObj).map(key => (<SpecsItem key={key} specs={props.category.specsObj[key]} categoryId={props.category.id} categoryType={props.categoryType} />))
  }
</View>)};

CategoryItem.propTypes = {
  categoryType: PropTypes.string.isRequired,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    specsObj: PropTypes.object.isRequired
  })
};

const styles = StyleSheet.create({
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryImage: {
    width: 80,
    height: 80
  },
  categoryTitle: {
    fontSize: 32,
    fontWeight: '700'
  }
});

export default CategoryItem;