import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import PropTyps from 'prop-types';


const AddBtn = props => <TouchableOpacity onPress={() => props.callBack()}>
  <View style={styles.container}>
    <Icon name='md-add' size={30} color='#fff' />
  </View>
</TouchableOpacity>;

AddBtn.propTypes = {
  callBack: PropTyps.func
};

AddBtn.defaultProps = {
  callBack: () => console.log('AddBtn未绑定回调')
};

const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#828282',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AddBtn;