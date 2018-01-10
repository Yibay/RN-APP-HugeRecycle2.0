import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import PropTypes from 'prop-types';


import CategoryItem from '../../components/pages/Recycle/CategoryItem';


class FurnitureProducts extends Component{

  static propTypes = {
    show: PropTypes.bool.isRequired,
    furnitureProductsObj: PropTypes.object.isRequired
  };

  render(){
    return (<ScrollView style={[styles.container, this.props.show ? styles.none : styles.hide]}>
      {
        Object.keys(this.props.furnitureProductsObj).map(key => (<CategoryItem key={key} category={this.props.furnitureProductsObj[key]} />))
      }
    </ScrollView>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  hide: {
    display: 'none'
  },
  none: {

  }
});

export default FurnitureProducts;