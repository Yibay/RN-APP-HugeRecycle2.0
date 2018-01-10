import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import PropTypes from 'prop-types';


import CategoryItem from '../../components/pages/Recycle/CategoryItem'


class ElectricProducts extends Component{

  static propTypes = {
    show: PropTypes.bool.isRequired,
    electricProductsObj: PropTypes.object.isRequired
  };

  render(){

    return (
      <ScrollView style={[styles.container, this.props.show ? styles.none : styles.hide]}>
        {
          Object.keys(this.props.electricProductsObj).map(key => (<CategoryItem key={key} category={this.props.electricProductsObj[key]} />))
        }
      </ScrollView>
    );
  }

  componentWillUnmount(){
    console.log('废旧家电 componentWillUnmount')
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

export default ElectricProducts;