import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import PropTypes from 'prop-types';


import config from "../../../util/request/config";

import SpecsItem from './SpecsItem';


const CategoryItem = props => {
  return (<View>
  <View style={props.category.show ? styles.categoryHeader : styles.hide}>
    <Image resizeMode='contain' style={styles.categoryImage} source={{uri: (config.static.base + props.category.image)}} />
    <Text style={styles.categoryTitle}>{props.category.name}</Text>
  </View>
  {
    Reflect.ownKeys(props.category.specsObj)
      .sort((val1, val2) => val1.sort - val2.sort)
      .map(key => (<SpecsItem key={key} specs={props.category.specsObj[key]} categoryId={props.category.id} sort={props.sort} onlyOnePiece={!props.category.show} />))
  }
</View>)};

CategoryItem.propTypes = {
  sort: PropTypes.number.isRequired,
  category: PropTypes.shape({
    show: PropTypes.bool.isRequired,
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
  },
  hide: {
    display: 'none'
  }
});

export default CategoryItem;