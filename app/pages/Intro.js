/*
* 首次登陆介绍页
* */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import Swiper from 'react-native-swiper';


class Intro extends Component{
  render(){
    return (<Swiper style={styles.wrapper} paginationStyle={styles.paginationStyle} dotStyle={dotStyle} activeDotStyle={dotStyle}>
      <View style={styles.slide}>
        <Image style={styles.logo} source={require('../containers/Intro/img/swiper-logo.jpg')} resizeMode='contain' />
        <Text style={styles.h5}>废弃家具，家用电器</Text>
        <Text style={styles.h3}>一键回收</Text>
      </View>
      <View style={styles.slide}>
        <Image style={styles.logo} source={require('../containers/Intro/img/swiper-logo.jpg')} resizeMode='contain' />
        <Text style={styles.h5}>手机呼叫，方便快捷</Text>
        <Text style={styles.h4}>30分钟上门</Text>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>立即体验</Text></TouchableOpacity>
      </View>
    </Swiper>);
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  paginationStyle: {
    marginBottom: 50
  },
  slide: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    marginTop: 120,
    width: 375,
    height: 375
  },
  h5: {
    marginTop: 120,
    fontSize: 50,
    fontWeight: '700'
  },
  h4: {
    marginTop: 80,
    fontSize: 80,
    fontWeight: '700'
  },
  h3: {
    marginTop: 80,
    fontSize: 100,
    fontWeight: '700'
  },
  button: {
    marginTop: 120,
    paddingVertical: 20,
    paddingHorizontal: 60,
    backgroundColor: '#169bd5'
  },
  buttonText: {
    fontSize: 24,
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

export default Intro;