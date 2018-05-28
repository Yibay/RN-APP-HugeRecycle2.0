import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Platform}from 'react-native';

import PropTypes from 'prop-types';


const Loading = (props) => {
  return Platform.select({
    ios:
      <View style={[styles.position,styles.container].concat(props.styles, props.show ? null : styles.hidden)}>
        <View style={styles.box}>
          <ActivityIndicator size='large' color='#fff' style={styles.activityIndicator} />
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>,
    android:
      <View style={styles.position}>
        <View style={[styles.container].concat(props.styles, props.show ? null : styles.hidden)}>
          <View style={styles.box}>
            <ActivityIndicator size='large' color='#fff' style={styles.activityIndicator} />
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
      </View>
  });
};

Loading.propsType = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string
};

Loading.defaultProps = {
  show: false
};

const styles = StyleSheet.create({
  position:{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  hidden: {
    display: 'none',
  },
  box:{
    position: 'relative',
    minWidth: 200,
    minHeight: 200,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activityIndicator: {
    transform: [{scale: 2}]
  },
  title: {
    position: 'absolute',
    bottom: 20,
    fontSize: 26,
    color: '#fff',
    textAlign: 'center'
  }
});

export default Loading;