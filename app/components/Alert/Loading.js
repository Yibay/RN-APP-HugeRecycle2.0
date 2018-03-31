import React, {Component} from 'react';
import {StyleSheet, View, Text, Modal, ActivityIndicator}from 'react-native';

import PropTypes from 'prop-types';


import AdaptLayoutWidth from "../AdaptLayoutWidth";


const Loading = (props) => {
  return <Modal visible={props.show} transparent={true} onRequestClose={() => {}}>
  <AdaptLayoutWidth>
    <View style={[styles.container].concat(props.styles)}>
      <View style={styles.box}>
        <ActivityIndicator size='large' color='#fff' style={styles.activityIndicator} />
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </View>
  </AdaptLayoutWidth>
</Modal>};

Loading.propsType = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string
};

Loading.defaultProps = {
  show: false
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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