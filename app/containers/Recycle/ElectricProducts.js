import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';

import PropTypes from 'prop-types';


import config from '../../util/request/config';
console.log(config);

class ElectricProducts extends Component{

  static propTypes = {
    show: PropTypes.bool.isRequired,
    electricProducts: PropTypes.array.isRequired
  };

  render(){

    console.log(this.props.electricProducts);

    return (
      <ScrollView style={[styles.container, this.props.show ? styles.none : styles.hide]}>
        {
          this.props.electricProducts.map(item => {
            console.log(config.static.base + item.image);
            return (
            <View key={item.id}>
              <View style={styles.categoryHeader}>
                <Image resizeMode='contain' style={styles.categoryImage} source={{uri: (config.static.base + item.image)}} />
                <Text style={styles.categoryTitle}>{item.name}</Text>
              </View>
            </View>)
          })
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
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryImage: {
    width: 50,
    height: 50
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: '700'
  },
  hide: {
    display: 'none'
  },
  none: {

  }
});

export default ElectricProducts;