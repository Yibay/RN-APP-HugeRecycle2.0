/*
* 首次登陆介绍页
* */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';


let guidePage = [
  require('../../assets/img/Guide1.png'),
  require('../../assets/img/Guide2.png'),
  require('../../assets/img/Guide3.png')
];

let {width, height} = Dimensions.get('window');
[width, height] = [Math.min(width, height), Math.max(width, height)];

class Guide extends Component{

  static propTypes = {
    hideGuidePage: PropTypes.func.isRequired
  };

  render(){
    return (<View style={styles.container}>
      <Swiper style={styles.wrapper} paginationStyle={styles.paginationStyle} loop={false}>
        {
          guidePage.map((item, index) => <View key={index} style={styles.slide}>
            <Image style={{width, height}} source={item} resizeMode='stretch' />
            {
              index === guidePage.length - 1 ?
                <TouchableOpacity style={styles.button} onPress={() => this.props.hideGuidePage()}><Text style={styles.buttonText}>立即体验</Text></TouchableOpacity>
                :
                undefined
            }
          </View>)
        }
      </Swiper>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {

  },
  paginationStyle: {
    // marginBottom: 50
    // bottom: 20
  },
  slide: {
    position: 'relative',
    flex: 1,
    alignItems: 'center'
  },
  button: {
    position: 'absolute',
    bottom: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: '#ffd100'
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#fff'
  }
});

// pagination dot style
const dotStyle = {
  width: 16,
  height: 16,
  marginTop: 6,
  marginRight: 6,
  marginBottom: 6,
  marginLeft: 6,
  borderRadius: 8
};

export default Guide;