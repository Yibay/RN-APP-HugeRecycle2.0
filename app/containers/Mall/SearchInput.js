import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Feather'


import InputSection from '../../components/Form/Input/InputSection';


class SearchInput extends Component {

  static propTypes = {
    searchText: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
  };

  static defaultProps = {
    searchText: '',
    onChangeText: () => {},
    onSearch: () => {}
  };

  render(){
    return <InputSection style={[styles.searchInput].concat(this.props.style)} value={this.props.searchText} onChangeText={val => this.props.onChangeText(val)} rightButton={<TouchableWithoutFeedback onPress={() => this.props.onSearch()}><Icons name='search' size={40} /></TouchableWithoutFeedback>} leftButton={<View/>} />
  }
}

const styles = StyleSheet.create({
  // 搜索框
  searchInput: {
    width: 600,
    height: 60,
    paddingHorizontal: 25,
    borderRadius: 15,
    backgroundColor: '#fff'
  }
});

export default SearchInput;