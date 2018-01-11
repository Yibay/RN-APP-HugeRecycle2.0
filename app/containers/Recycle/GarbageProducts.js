import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import PropTypes from 'prop-types';


import { categoryGarbageProduct } from '../../redux/actions/Recycle';

import SpecsItem from './SpecsItem';


class GarbageProducts extends Component{

  static propTypes = {
    show: PropTypes.bool.isRequired,
    garbageProductsObj: PropTypes.object.isRequired
  };

  render(){

    let list = [];

    for (let key of Object.keys(this.props.garbageProductsObj)){
      let item = this.props.garbageProductsObj[key];
      let categoryId = item.id;
      let specsObj = item.specsObj;
      for (let key of Object.keys(specsObj)){
        list.push(<SpecsItem key={key} categoryType={categoryGarbageProduct} categoryId={categoryId} specs={specsObj[key]} onlyOnePiece={true} />)
      }
    }

    return (<ScrollView style={[styles.container, this.props.show ? styles.none : styles.hide]}>
      {
        list
      }
    </ScrollView>)
  }

  componentWillUnmount(){
    console.log('小件干垃圾 componentWillUnmount')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10
  },
  hide: {
    display: 'none'
  },
  none: {

  }
});

export default GarbageProducts;