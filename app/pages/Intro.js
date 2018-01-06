/*
* 首次登陆介绍页
* */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';

import Swiper from 'react-native-swiper';


class Intro extends Component{
  render(){
    return (<Swiper style={styles.wrapper}>
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    marginTop: 60,
    width: width * 0.5,
    height: width * 0.5
  },
  h5: {
    marginTop: 60,
    fontSize: 25,
    fontWeight: '700'
  },
  h4: {
    marginTop: 40,
    fontSize: 40,
    fontWeight: '700'
  },
  h3: {
    marginTop: 40,
    fontSize: 50,
    fontWeight: '700'
  },
  button: {
    marginTop: 60,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#169bd5'
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#fff'
  }
});

export default Intro;